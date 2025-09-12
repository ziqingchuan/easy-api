<template>
  <div class="ai-dialog-overlay" v-if="showAIDialog" @click.self="closeDialog">
    <div class="ai-dialog-container">
      <div class="ai-dialog-header">
        <h2>小E</h2>
        <button class="close-btn" @click="closeDialog">×</button>
      </div>
      <div class="ai-dialog-content">
        <div class="messages-container">
          <div
              v-for="(message, index) in messages.filter(message => message.content.trim()!== '')"
              :key="index"
              :class="['message', message.role]"
          >
            <!-- 使用 v-html 渲染 Markdown -->
            <div v-if="message.role === 'ai'" v-html="message.content"></div>
            <div v-if="message.role === 'user'">{{ message.content }}</div>
          </div>

          <div v-if="isLoading">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div class="input-container">
               <textarea
                   v-model="userInput"
                   placeholder="输入您的问题..."
                   @keydown="handleKeydown"
                   ref="textareaRef"
                   rows="1"
               ></textarea>
          <button
              @click="sendMessage"
              :disabled="isLoading || !userInput.trim()"
          >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {nextTick, ref, watch} from 'vue';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

// 添加 MathJax 支持
import { mathjax } from 'mathjax-full/js/mathjax';
import { TeX } from 'mathjax-full/js/input/tex';
import { SVG } from 'mathjax-full/js/output/svg';
import { liteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html';

interface Message {
  role: 'ai' | 'user';
  content: string;
}

// 创建适配器和处理器
const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);

// 创建 TeX 输入和 SVG 输出处理器
const tex = new TeX({
  packages: ['base', 'ams', 'newcommand', 'configmacros']
});
const svg = new SVG({ fontCache: 'local' });

// 创建文档处理器
const html = mathjax.document('', {
  InputJax: tex,
  OutputJax: svg
});

// 修改 Markdown 渲染器以支持数学公式
const md: any = new MarkdownIt({
  highlight: function (str: any, lang: any) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code class="language-${lang}">${hljs.highlight(str, { language: lang }).value}</code></pre>`;
      } catch (__) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
}).use(function(md) {

  md.renderer.rules.text = function(tokens, idx) {
    const content = tokens[idx].content;

    // 检测行内数学公式
    const inlineMathRegex = /(?<!\\)\$(.*?[^\\])\$/g;
    let result = content.replace(inlineMathRegex, (match, equation) => {
      const node = html.convert(equation, { display: false });
      return adaptor.innerHTML(node);
    });

    // 检测块级数学公式
    const blockMathRegex = /(?<!\\)\$\$(.*?[^\\])\$\$/g;
    result = result.replace(blockMathRegex, (match, equation) => {
      const node = html.convert(equation, { display: true });
      return adaptor.innerHTML(node);
    });

    return result;
  };
});

defineProps({
  showAIDialog: Boolean
});

const emit = defineEmits(['update:showAIDialog']);

const messages = ref<Message[]>([
  { role: 'ai', content: '你好！我是Easy API的AI助手，有什么可以帮您的吗？' }
]);
const userInput = ref('');
const isLoading = ref(false);
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const closeDialog = () => {
  emit('update:showAIDialog', false);
};

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;

  // 添加用户消息
  messages.value.push({
    role: 'user',
    content: userInput.value
  });

  const question = userInput.value;
  userInput.value = '';
  isLoading.value = true;

  // 添加一个空的 AI 消息占位
  const aiMessageIndex = messages.value.push({
    role: 'ai',
    content: ''
  }) - 1;

  try {
    const response = await fetch('/proxy/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer xmvyPnWEdDUsSsAJXPFV:ivlDhHshnlcPhKvTUZzY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'lite',
        messages: [{
          role: 'user',
          content: question
        }],
        stream: true
      })
    });

    if (!response.ok) alert(`HTTP error! status: ${response.status}`);
    if (!response.body) return '';

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim());

      for (const line of lines) {
        if (line.startsWith('data:')) {
          const jsonStr = line.substring(5).trim();
          if (jsonStr === '[DONE]') break;

          try {
            const data = JSON.parse(jsonStr);
            if (data.choices && data.choices[0].delta.content) {
              fullResponse += data.choices[0].delta.content;
              // 实时更新内容
              messages.value[aiMessageIndex].content = fullResponse;
              messages.value = [...messages.value];

              // 滚动到底部
              setTimeout(() => {
                const container = document.querySelector('.messages-container');
                if (container) container.scrollTop = container.scrollHeight;
              }, 50);
            }
          } catch (e) {
            console.error('解析 JSON 失败:', e);
          }
        }
      }
    }

    // 完整响应后，用 markdown-it 渲染
    messages.value[aiMessageIndex].content = md.render(fullResponse);
    messages.value = [...messages.value];

  }

  catch (error) {
    console.error('API 调用失败:', error);
    messages.value[aiMessageIndex].content = `抱歉，处理您的请求时出错: ${error}`;
  } finally {
    isLoading.value = false;
  }
};

// 处理键盘事件
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.shiftKey)) {
    e.preventDefault();
    sendMessage();
  }
  // Shift+Enter 会自然换行（不需要处理）
};

</script>

<style scoped>
@import "../styles/ChatModal.css";
</style>

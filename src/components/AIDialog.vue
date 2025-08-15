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
              v-for="(message, index) in messages"
              :key="index"
              :class="['message', message.role]"
          >
            <!-- 使用 v-html 渲染 Markdown -->
            <div v-if="message.role === 'ai'" v-html="message.content"></div>
            <div v-else>{{ message.content }}</div>
          </div>

          <div v-if="isLoading" class="message ai">
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
  // 添加数学公式解析器
  const originalRender = md.renderer.rules.text;

  md.renderer.rules.text = function(tokens, idx, options, env, self) {
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

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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

  } catch (error) {
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

// 动态调整 textarea 高度
const adjustTextareaHeight = () => {
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto';
      textareaRef.value.style.height = `${Math.min(
          textareaRef.value.scrollHeight,
          60 // 最大高度限制（可选）
      )}px`;
    }
  });
};

// 在 userInput 变化时调整高度
watch(userInput, adjustTextareaHeight);
</script>

<style scoped>
.ai-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.ai-dialog-container {
  width: 500px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.ai-dialog-header {
  background-color: #377ff0;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ai-dialog-header h2 {
  margin: 0;
  font-size: 1.2rem;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  margin: 0;
  line-height: 1;
}

.ai-dialog-content {
  display: flex;
  flex-direction: column;
  height: 500px;
}

.messages-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #f9fafb;
}

.message {
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 18px;
  line-height: 1.5;
  word-break: break-word;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.message.ai {
  align-self: flex-start;
  background-color: #edf2ff;
  border-bottom-left-radius: 5px;
  color: #2d3748;
}

.message.user {
  align-self: flex-end;
  background-color: #377ff0;
  color: white;
  border-bottom-right-radius: 5px;
}

.typing-indicator {
  display: flex;
  padding: 10px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background-color: #a0aec0;
  border-radius: 50%;
  display: inline-block;
  margin: 0 3px;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: 0s;
}
.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}
.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-5px); }
}

.input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-top: 1px solid #e2e8f0;
  background-color: white;
}

.input-container textarea {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 25px;
  outline: none;
  font-size: 0.9rem;
  transition: border-color 0.3s;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome/Safari/Opera */
  }
}

.input-container textarea:focus {
  border-color: #377ff0;
  box-shadow: 0 0 0 2px rgba(55, 127, 240, 0.2);
}

.input-container button {
  width: 40px;
  height:40px;
  margin-left: 10px;
  padding: 5px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
  background: #377ff0 url("../icons/send.svg") no-repeat center center;
}

.input-container button:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}

.input-container button:not(:disabled):hover {
  background-color: #2a6bd0;
}

/* MathJax 公式样式 */
.message.ai >>> .mjx-svg {
  display: inline-block;
  vertical-align: middle;
}

.message.ai >>> .mjx-chtml {
  font-size: 110%;
}

.message.ai >>> .MathJax_SVG_Display {
  text-align: center;
  margin: 1em 0;
}

/* Markdown 通用样式 */
.message.ai >>> p {
  margin: 0.5em 0;
  line-height: 1.6;
}

.message.ai >>> pre {
  background-color: #edf2ff;
  border-radius: 4px;
  padding: 12px;
  margin: 10px 0;
  overflow-x: auto;
}

.message.ai >>> code {
  font-family: 'Courier New', Courier, monospace;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 0.9em;
}

.message.ai >>> pre code {
  background-color: transparent;
  padding: 0;
}

.message.ai >>> blockquote {
  border-left: 3px solid #377ff0;
  margin: 0;
  padding-left: 1em;
  color: #555;
}

.message.ai >>> ul,
.message.ai >>> ol {
  padding-left: 1.5em;
  margin: 0.5em 0;
}

.message.ai >>> li {
  margin: 0.3em 0;
}

.message.ai >>> table {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
}

.message.ai >>> th,
.message.ai >>> td {
  border: 1px solid #ddd;
  padding: 8px;
}

.message.ai >>> th {
  background-color: #f2f2f2;
}

.message.ai >>> a {
  color: #377ff0;
  text-decoration: none;
}

.message.ai >>> a:hover {
  text-decoration: underline;
}
</style>

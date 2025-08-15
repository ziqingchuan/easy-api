<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="logo-container">
        <svg t="1754543162529" class="logo-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6299" width="30" height="30"><path d="M917.7 148.8l-42.4-42.4c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1 0.8-5.7 2.3l-76.1 76.1c-33.7-22.9-72.9-34.3-112.1-34.3-51.2 0-102.4 19.5-141.5 58.6L432.3 308.7c-3.1 3.1-3.1 8.2 0 11.3L704 591.7c1.6 1.6 3.6 2.3 5.7 2.3 2 0 4.1-0.8 5.7-2.3l101.9-101.9c68.9-69 77-175.7 24.3-253.5l76.1-76.1c3.1-3.2 3.1-8.3 0-11.4zM769.1 441.7l-59.4 59.4-186.8-186.8 59.4-59.4c24.9-24.9 58.1-38.7 93.4-38.7 35.3 0 68.4 13.7 93.4 38.7 24.9 24.9 38.7 58.1 38.7 93.4 0 35.3-13.8 68.4-38.7 93.4z m-190.2 105c-3.1-3.1-8.2-3.1-11.3 0L501 613.3 410.7 523l66.7-66.7c3.1-3.1 3.1-8.2 0-11.3L441 408.6c-3.1-3.1-8.2-3.1-11.3 0L363 475.3l-43-43c-1.6-1.6-3.6-2.3-5.7-2.3-2 0-4.1 0.8-5.7 2.3L206.8 534.2c-68.9 69-77 175.7-24.3 253.5l-76.1 76.1c-3.1 3.1-3.1 8.2 0 11.3l42.4 42.4c1.6 1.6 3.6 2.3 5.7 2.3s4.1-0.8 5.7-2.3l76.1-76.1c33.7 22.9 72.9 34.3 112.1 34.3 51.2 0 102.4-19.5 141.5-58.6l101.9-101.9c3.1-3.1 3.1-8.2 0-11.3l-43-43 66.7-66.7c3.1-3.1 3.1-8.2 0-11.3l-36.6-36.2zM441.7 769.1c-24.9 24.9-58.1 38.7-93.4 38.7-35.3 0-68.4-13.7-93.4-38.7-24.9-24.9-38.7-58.1-38.7-93.4 0-35.3 13.7-68.4 38.7-93.4l59.4-59.4 186.8 186.8-59.4 59.4z" fill="#ffffff" p-id="6300"></path></svg>
        <h1 class="app-title">Easy API</h1>
      </div>
      <button class="ai-assistant-btn" @click="showAIDialog = true">
        <svg t="1755069311303" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9722" width="30" height="30"><path d="M568.32 183.978667q4.266667 0 8.362667-0.796445t7.964444-2.446222q3.925333-1.592889 7.395556-3.925333 3.527111-2.332444 6.485333-5.290667 2.958222-3.015111 5.290667-6.485333 2.332444-3.470222 3.982222-7.395556 1.592889-3.868444 2.389333-7.964444 0.853333-4.152889 0.853334-8.362667 0-4.152889-0.853334-8.305778-0.796444-4.096-2.389333-7.964444-1.649778-3.925333-3.982222-7.395556-2.275556-3.527111-5.290667-6.485333-2.958222-2.958222-6.485333-5.290667-3.470222-2.332444-7.395556-3.982222-3.868444-1.592889-7.964444-2.389333-4.096-0.853333-8.305778-0.853334H301.169778q-111.786667 0-190.862222 79.075556T31.288889 368.64v291.157333q0 111.843556 79.075555 190.919111t190.862223 79.075556h598.414222q28.672 0 48.981333-20.309333t20.309334-49.038223V489.244444q0-4.209778-0.853334-8.305777-0.796444-4.152889-2.389333-8.021334-1.649778-3.868444-3.982222-7.395555-2.275556-3.470222-5.290667-6.428445-2.958222-3.015111-6.485333-5.347555-3.413333-2.275556-7.395556-3.982222-3.811556-1.536-7.964444-2.389334-4.096-0.796444-8.305778-0.796444t-8.362667 0.796444q-4.096 0.853333-7.964444 2.446222-3.868444 1.592889-7.395556 3.982223-3.470222 2.275556-6.485333 5.290666-2.958222 2.958222-5.290667 6.428445-2.275556 3.527111-3.982222 7.395555-1.536 3.868444-2.389333 7.964445-0.796444 4.152889-0.796445 8.362666v355.157334H301.226667q-76.458667 0-130.56-54.044445-54.044444-54.044444-54.044445-130.56V368.64q0-76.515556 54.044445-130.56 54.101333-54.044444 130.56-54.044444h267.150222z" p-id="9723" data-spm-anchor-id="a313x.search_index.0.i0.b8c43a81G6xUF8" class="selected" fill="#ffffff"></path><path d="M300.999111 398.222222m51.2 0l0 0q51.2 0 51.2 51.2l0 125.155556q0 51.2-51.2 51.2l0 0q-51.2 0-51.2-51.2l0-125.155556q0-51.2 51.2-51.2Z" p-id="9724" data-spm-anchor-id="a313x.search_index.0.i2.b8c43a81G6xUF8" class="selected" fill="#ffffff"></path><path d="M585.443556 398.222222m51.2 0l0 0q51.2 0 51.2 51.2l0 125.155556q0 51.2-51.2 51.2l0 0q-51.2 0-51.2-51.2l0-125.155556q0-51.2 51.2-51.2Z" p-id="9725" data-spm-anchor-id="a313x.search_index.0.i1.b8c43a81G6xUF8" class="selected" fill="#ffffff"></path><path d="M682.723556 200.704c-16.156444 3.982222-16.156444 26.965333 0 30.947556l66.503111 16.384a91.022222 91.022222 0 0 1 66.56 66.56l16.384 66.503111c3.982222 16.156444 26.965333 16.156444 30.947555 0l16.384-66.503111a91.022222 91.022222 0 0 1 66.56-66.56l66.503111-16.384c16.156444-3.982222 16.156444-26.965333 0-30.947556l-66.503111-16.440889a91.022222 91.022222 0 0 1-66.56-66.56L863.118222 51.313778c-3.982222-16.156444-26.965333-16.156444-30.947555 0L815.786667 117.76a91.022222 91.022222 0 0 1-66.56 66.56L682.666667 200.647111z" p-id="9726" data-spm-anchor-id="a313x.search_index.0.i3.b8c43a81G6xUF8" class="selected" fill="#ffffff"></path></svg>
      </button>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 左侧请求编辑区 -->
      <div class="request-panel">
        <!-- 请求设置 -->
          <div class="method-buttons">
            <span style="font-size: 0.9rem;">请求方法：</span>
            <!-- 请求方法选择 -->
            <button
                v-for="method in requestMethods"
                :key="method.value"
                @click="selectedMethod = method.value"
                :class="`method-btn ${
                  selectedMethod === method.value
                    ? `method-btn-${method.color} method-btn-active`
                    : 'method-btn-inactive'
                }`"
            >
              {{ method.label }}
            </button>
          </div>

          <!-- URL输入 -->
          <div class="url-input-container">
            <span style="font-size: 0.9rem;">URL:</span>
            <input
                v-model="requestUrl"
                type="text"
                class="url-input"
                placeholder="https://api.example.com/endpoint"
            >
          </div>

          <!-- 请求头设置 -->
          <div class="section-header" @click="showHeaders = true; showBody = false;">
            <div class="section-title">
              <span class="section-icon header-icon"></span>
              <h3>请求头</h3>
            </div>
            <span class="chevron-icon" :class="{ 'chevron-rotated': showHeaders }"></span>
          </div>

          <div
              class="section-content"
              v-show="showHeaders"
          >
            <div class="headers-container">
              <button
                  @click="addHeader"
                  class="add-header-btn"
              >
                <span class="btn-icon plus-icon"></span>
                <span>添加头信息</span>
              </button>

              <div class="headers-list">
                <div
                    v-for="(header, index) in requestHeaders"
                    :key="index"
                    class="header-item"
                >
                  <div class="header-item-input">
                    <input
                        v-model="header.key"
                        type="text"
                        style="color: #008bff;"
                        class="header-key"
                        placeholder="Key"
                    >
                    <input
                        v-model="header.value"
                        type="text"
                        style="color: #bc3600;"
                        class="header-value"
                        placeholder="Value"
                    >
                  </div>

                  <button
                      @click="removeHeader(index)"
                      class="remove-header-btn"
                  >
                    <span class="btn-icon trash-icon"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="section-header" @click="showBody = true; showHeaders = false;">
            <div class="section-title">
              <span class="section-icon code-icon"></span>
              <h3>请求体</h3>
            </div>
            <span class="chevron-icon" :class="{ 'chevron-rotated': showBody }"></span>
          </div>

          <div
              class="section-content"
              v-show="showBody"
          >
            <div class="json-editor-container" ref="jsonEditorContainer"></div>
          </div>
          <!-- 发送按钮 -->
          <div class="send-section">
            <div class="response-time">
            <span style="display: flex; flex-direction: row; gap: 5px; align-items: center" v-if="responseTime > 0">
              <span class="btn-icon clock-icon"></span>
              <span>请求耗时：{{ responseTime }}ms</span>
            </span>
            </div>
            <button
                @click="sendRequest"
                :disabled="isLoading || !requestUrl"
                class="send-btn"
            >
              <span>发送请求</span>
              <span
                  class="btn-icon spinner-icon"
                  v-if="isLoading"
              ></span>
            </button>
          </div>
      </div>

      <!-- 右侧响应展示区 -->
      <div class="response-panel">
        <!-- 响应标签页 -->
        <div class="tabs-container">
          <button
              @click="activeTab = 'response'"
              class="tab-btn"
              :class="{ 'tab-active': activeTab === 'response' }"
          >
            响应结果
          </button>
          <button
              @click="activeTab = 'headers'"
              class="tab-btn"
              :class="{ 'tab-active': activeTab === 'headers' }"
          >
            响应头
          </button>
        </div>

        <!-- 响应内容 -->
        <div class="response-content">
          <!-- 响应状态 -->
          <div
              v-if="responseStatus"
              class="response-status-bar"
          >
            <div class="status-info">
              <span class="status-text">响应状态：</span>
              <span
                  class="status-code"
                  :class="responseStatus < 200 ? 'status-unknown' :
                  responseStatus >= 200 && responseStatus < 300 ? 'status-success' :
                       responseStatus >= 300 && responseStatus < 400 ? 'status-redirect' :
                       responseStatus >= 400 && responseStatus < 500 ? 'status-client-error' : 'status-server-error'"
              >
                {{ responseStatus }}
              </span>
              <span class="status-text">
                {{ statusText }}
              </span>
            </div>
            <div class="content-type">
              {{ responseContentType }}
            </div>
          </div>

          <!-- 响应内容区域 -->
          <div class="response-body">

            <!-- 加载状态 -->
            <div v-if="isLoading" class="loading-state">
              <span class="state-icon spinner-icon"></span>
              <p>正在发送请求...</p>
            </div>

            <!-- 错误信息 -->
            <div v-if="errorMessage && !isLoading" class="error-state">
              <span class="state-icon error-icon"></span>
              <p>{{ errorMessage }}</p>
            </div>

            <!-- 响应数据 - JSON格式 -->
            <div
                v-show="activeTab === 'response' && !isLoading"
                class="json-response"
            >
              <!-- 响应结果的JSON编辑器容器 -->
              <div class="response-json-editor" ref="responseJsonEditorContainer"></div>
            </div>

            <!-- 响应头 -->
            <div
                v-if="responseHeaders && activeTab === 'headers' && !isLoading"
                class="response-headers"
            >
              <table class="headers-table">
                <thead>
                <tr>
                  <th>名称</th>
                  <th>值</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(value, key) in responseHeaders" :key="key" class="header-row">
                  <td class="header-key">{{ key }}</td>
                  <td class="header-val">{{ value }}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <p>© 2025 easyapi.top</p>
      </div>
    </footer>
  </div>
  <!-- AI对话组件 -->
  <AIDialog
      :showAIDialog="showAIDialog"
      @update:showAIDialog="showAIDialog = $event"
  />
  <button class="fixed-btn" @click="showAIDialog = true">
    <svg t="1755069311303" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9722" width="30" height="30"><path d="M568.32 183.978667q4.266667 0 8.362667-0.796445t7.964444-2.446222q3.925333-1.592889 7.395556-3.925333 3.527111-2.332444 6.485333-5.290667 2.958222-3.015111 5.290667-6.485333 2.332444-3.470222 3.982222-7.395556 1.592889-3.868444 2.389333-7.964444 0.853333-4.152889 0.853334-8.362667 0-4.152889-0.853334-8.305778-0.796444-4.096-2.389333-7.964444-1.649778-3.925333-3.982222-7.395556-2.275556-3.527111-5.290667-6.485333-2.958222-2.958222-6.485333-5.290667-3.470222-2.332444-7.395556-3.982222-3.868444-1.592889-7.964444-2.389333-4.096-0.853333-8.305778-0.853334H301.169778q-111.786667 0-190.862222 79.075556T31.288889 368.64v291.157333q0 111.843556 79.075555 190.919111t190.862223 79.075556h598.414222q28.672 0 48.981333-20.309333t20.309334-49.038223V489.244444q0-4.209778-0.853334-8.305777-0.796444-4.152889-2.389333-8.021334-1.649778-3.868444-3.982222-7.395555-2.275556-3.470222-5.290667-6.428445-2.958222-3.015111-6.485333-5.347555-3.413333-2.275556-7.395556-3.982222-3.811556-1.536-7.964444-2.389334-4.096-0.796444-8.305778-0.796444t-8.362667 0.796444q-4.096 0.853333-7.964444 2.446222-3.868444 1.592889-7.395556 3.982223-3.470222 2.275556-6.485333 5.290666-2.958222 2.958222-5.290667 6.428445-2.275556 3.527111-3.982222 7.395555-1.536 3.868444-2.389333 7.964445-0.796444 4.152889-0.796445 8.362666v355.157334H301.226667q-76.458667 0-130.56-54.044445-54.044444-54.044444-54.044445-130.56V368.64q0-76.515556 54.044445-130.56 54.101333-54.044444 130.56-54.044444h267.150222z" p-id="9723" data-spm-anchor-id="a313x.search_index.0.i0.b8c43a81G6xUF8" class="selected" fill="#ffffff"></path><path d="M300.999111 398.222222m51.2 0l0 0q51.2 0 51.2 51.2l0 125.155556q0 51.2-51.2 51.2l0 0q-51.2 0-51.2-51.2l0-125.155556q0-51.2 51.2-51.2Z" p-id="9724" data-spm-anchor-id="a313x.search_index.0.i2.b8c43a81G6xUF8" class="selected" fill="#ffffff"></path><path d="M585.443556 398.222222m51.2 0l0 0q51.2 0 51.2 51.2l0 125.155556q0 51.2-51.2 51.2l0 0q-51.2 0-51.2-51.2l0-125.155556q0-51.2 51.2-51.2Z" p-id="9725" data-spm-anchor-id="a313x.search_index.0.i1.b8c43a81G6xUF8" class="selected" fill="#ffffff"></path><path d="M682.723556 200.704c-16.156444 3.982222-16.156444 26.965333 0 30.947556l66.503111 16.384a91.022222 91.022222 0 0 1 66.56 66.56l16.384 66.503111c3.982222 16.156444 26.965333 16.156444 30.947555 0l16.384-66.503111a91.022222 91.022222 0 0 1 66.56-66.56l66.503111-16.384c16.156444-3.982222 16.156444-26.965333 0-30.947556l-66.503111-16.440889a91.022222 91.022222 0 0 1-66.56-66.56L863.118222 51.313778c-3.982222-16.156444-26.965333-16.156444-30.947555 0L815.786667 117.76a91.022222 91.022222 0 0 1-66.56 66.56L682.666667 200.647111z" p-id="9726" data-spm-anchor-id="a313x.search_index.0.i3.b8c43a81G6xUF8" class="selected" fill="#ffffff"></path></svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
// @ts-ignore
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';
import AIDialog from "../components/AIDialog.vue";

// 定义请求方法类型
interface RequestMethod {
  label: string;
  value: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'gray' | 'indigo';
}

// 请求头类型
interface Header {
  key: string;
  value: string;
}

// 请求方法选项
      const requestMethods: RequestMethod[] = [
        { label: 'GET', value: 'GET', color: 'blue' },
        { label: 'POST', value: 'POST', color: 'green' },
        { label: 'PUT', value: 'PUT', color: 'orange' },
        { label: 'DELETE', value: 'DELETE', color: 'red' },
        { label: 'PATCH', value: 'PATCH', color: 'purple' },
      ];

// 状态变量
      const selectedMethod = ref<'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'>('GET');
      const requestUrl = ref('');
      const requestHeaders = ref<Header[]>([
        { key: 'Content-Type', value: 'application/json' },
        { key: 'Accept', value: 'application/json' }
      ]);
      const showHeaders = ref(false);
      const showBody = ref(false);
      const isLoading = ref(false);
      const responseData = ref<any>(null);
      const responseStatus = ref<number | null>(null);
      const statusText = ref('');
      const responseHeaders = ref<Record<string, string>>({});
      const responseContentType = ref('');
      const errorMessage = ref('');
      const responseTime = ref(0);
      const activeTab = ref<'response' | 'headers'>('response');
      const jsonEditorContainer = ref<HTMLElement | null>(null);
      const jsonEditor = ref<JSONEditor | null>(null);
      // 响应结果JSON编辑器
      const responseJsonEditorContainer = ref<HTMLElement | null>(null);
      const responseJsonEditor = ref<JSONEditor | null>(null);
      const showAIDialog = ref(false);
// 格式化响应数据
      const formattedResponseData = ref('');

// 添加请求头
      const addHeader = () => {
        requestHeaders.value.push({ key: '', value: '' });
      };

// 移除请求头
      const removeHeader = (index: number) => {
        requestHeaders.value.splice(index, 1);
      };

// 发送请求
      const sendRequest = async () => {
        if (!requestUrl.value) return;

        isLoading.value = true;
        errorMessage.value = '';
        responseData.value = null;
        responseStatus.value = null;
        statusText.value = '';
        responseHeaders.value = {};
        responseContentType.value = '';

        const startTime = performance.now();

        try {
          // 准备请求配置
          const requestOptions: RequestInit = {
            method: selectedMethod.value,
            headers: {} as Record<string, string>,
          };

          // 设置请求头
          requestHeaders.value.forEach(header => {
            if (header.key && header.value) {
              // @ts-ignore
              requestOptions.headers![header.key] = header.value;
            }
          });

          // 设置请求体（GET等方法通常没有请求体）
          if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(selectedMethod.value) && jsonEditor.value) {
            try {
              const jsonData = jsonEditor.value.get();
              if (jsonData && Object.keys(jsonData).length > 0) {
                requestOptions.body = JSON.stringify(jsonData);
              }
            } catch (err) {
              errorMessage.value = '请求体JSON格式错误';
              isLoading.value = false;
              return;
            }
          }
          // 发送请求
          const response = await fetch(requestUrl.value, requestOptions);
          // 记录响应时间
          responseTime.value = Math.round(performance.now() - startTime);

          // 处理响应状态
          responseStatus.value = response.status;
          statusText.value = response.statusText;

          // 处理响应头
          response.headers.forEach((value, key) => {
            responseHeaders.value[key] = value;
          });

          // 获取内容类型
          responseContentType.value = response.headers.get('content-type') || '';

          // 解析响应内容
          if (responseContentType.value.includes('application/json')) {
            responseData.value = await response.json();
            console.log(responseData.value);
            if (responseJsonEditor.value) {
              responseJsonEditor.value.set(responseData.value); // 设置响应数据到编辑器
            }
          } else {
            const text = await response.text();
            responseData.value = text || 'No content';
            if (responseJsonEditor.value) {
              responseJsonEditor.value.set({ responseText: responseData.value });
            }
          }

        } catch (err) {
          responseTime.value = Math.round(performance.now() - startTime);
          if (err instanceof Error) {
            errorMessage.value = err.message;
          } else {
            errorMessage.value = '请求发生错误，请检查网络连接或URL';
          }
          if (responseJsonEditor.value) {
            responseJsonEditor.value.set({ error: errorMessage.value });
          }
        } finally {
          isLoading.value = false;
        }
      };

// 初始化JSON编辑器
      onMounted(() => {
        if (jsonEditorContainer.value) {
          jsonEditor.value = new JSONEditor(jsonEditorContainer.value, {
            mode: 'view',
            modes: ['tree', 'code', 'form', 'text', 'view'],
            placeholder: '请输入JSON格式的请求体',
          });

          // 设置默认JSON示例
          jsonEditor.value.set({
            exampleKey: "exampleValue",
            numberValue: 123,
            booleanValue: true,
            objectValue: {
              nestedKey: "nestedValue"
            },
            arrayValue: ["item1", "item2"]
          });
        }
        if (responseJsonEditorContainer.value) {
          responseJsonEditor.value = new JSONEditor(responseJsonEditorContainer.value, {
            mode: 'view',
            modes: ['tree', 'code', 'form', 'text', 'view'],
            placeholder: '响应结果将显示在这里',
          });
        }
      });

// 监听响应数据变化，格式化显示
      watch(responseData, (newData) => {
        if (newData && typeof newData === 'object') {
          formattedResponseData.value = JSON.stringify(newData, null, 2);
        } else if (newData !== null && newData !== undefined) {
          formattedResponseData.value = newData.toString();
        } else {
          formattedResponseData.value = '';
        }
      });

// 当请求方法变化时，自动调整是否显示请求体
      watch(selectedMethod, (newMethod) => {
        // GET、HEAD等方法通常没有请求体
        showBody.value = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(newMethod);
      });
</script>

<style scoped>
@import "../styles/Index.css";
@import "../styles/Animation.css";
@import "../styles/Colors.css";
@import "../styles/Scrollbar.css";
@import "../styles/Icons.css";
@import "../styles/JsonEditor.css";
</style>

<template>
  <div class="app-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="logo-container">
        <svg t="1754543162529" class="logo-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6299" width="30" height="30"><path d="M917.7 148.8l-42.4-42.4c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1 0.8-5.7 2.3l-76.1 76.1c-33.7-22.9-72.9-34.3-112.1-34.3-51.2 0-102.4 19.5-141.5 58.6L432.3 308.7c-3.1 3.1-3.1 8.2 0 11.3L704 591.7c1.6 1.6 3.6 2.3 5.7 2.3 2 0 4.1-0.8 5.7-2.3l101.9-101.9c68.9-69 77-175.7 24.3-253.5l76.1-76.1c3.1-3.2 3.1-8.3 0-11.4zM769.1 441.7l-59.4 59.4-186.8-186.8 59.4-59.4c24.9-24.9 58.1-38.7 93.4-38.7 35.3 0 68.4 13.7 93.4 38.7 24.9 24.9 38.7 58.1 38.7 93.4 0 35.3-13.8 68.4-38.7 93.4z m-190.2 105c-3.1-3.1-8.2-3.1-11.3 0L501 613.3 410.7 523l66.7-66.7c3.1-3.1 3.1-8.2 0-11.3L441 408.6c-3.1-3.1-8.2-3.1-11.3 0L363 475.3l-43-43c-1.6-1.6-3.6-2.3-5.7-2.3-2 0-4.1 0.8-5.7 2.3L206.8 534.2c-68.9 69-77 175.7-24.3 253.5l-76.1 76.1c-3.1 3.1-3.1 8.2 0 11.3l42.4 42.4c1.6 1.6 3.6 2.3 5.7 2.3s4.1-0.8 5.7-2.3l76.1-76.1c33.7 22.9 72.9 34.3 112.1 34.3 51.2 0 102.4-19.5 141.5-58.6l101.9-101.9c3.1-3.1 3.1-8.2 0-11.3l-43-43 66.7-66.7c3.1-3.1 3.1-8.2 0-11.3l-36.6-36.2zM441.7 769.1c-24.9 24.9-58.1 38.7-93.4 38.7-35.3 0-68.4-13.7-93.4-38.7-24.9-24.9-38.7-58.1-38.7-93.4 0-35.3 13.7-68.4 38.7-93.4l59.4-59.4 186.8 186.8-59.4 59.4z" fill="#ffffff" p-id="6300"></path></svg>
        <h1 class="app-title">Easy API</h1>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- 左侧请求编辑区 -->
      <div class="request-panel">
        <!-- 请求设置 -->
        <div class="panel-section">
          <div class="method-buttons">
            请求方法：
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
              URL:
            <input
                v-model="requestUrl"
                type="text"
                class="url-input"
                placeholder="https://api.example.com/endpoint"
            >
          </div>
        </div>

        <!-- 请求头设置 -->
        <div class="panel-section">
          <div class="section-header" @click="showBody = false; showHeaders = true">
            <div class="section-title">
              <span class="section-icon header-icon"></span>
              <h3>请求头</h3>
            </div>
            <span class="chevron-icon" :class="{ 'chevron-rotated': showHeaders }"></span>
          </div>

          <div
              class="section-content"
              :class="{ 'content-hidden': !showHeaders }"
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
                  <input
                      v-model="header.key"
                      type="text"
                      class="header-key"
                      placeholder="Key"
                  >
                  <input
                      v-model="header.value"
                      type="text"
                      class="header-value"
                      placeholder="Value"
                  >
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
        </div>

        <!-- 请求体设置 -->
        <div class="panel-section panel-section-expandable">
          <div class="section-header" @click="showBody = true; showHeaders = false">
            <div class="section-title">
              <span class="section-icon code-icon"></span>
              <h3>请求体</h3>
            </div>
            <span class="chevron-icon" :class="{ 'chevron-rotated': showBody }"></span>
          </div>

          <div
              class="section-content section-content-expandable"
              :class="{ 'content-hidden': !showBody }"
          >
            <div class="json-editor-container" ref="jsonEditorContainer"></div>
          </div>
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
            <!-- 初始状态 -->
            <div v-if="!responseData && !errorMessage && !isLoading && activeTab === 'response'" class="empty-state">
              <span class="state-icon exchange-icon"></span>
              <p>发送请求后将在这里显示响应结果</p>
            </div>

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
                v-if="responseData && activeTab === 'response' && !isLoading"
                class="json-response"
            >
              <pre>{{ formattedResponseData }}</pre>
            </div>

            <!-- 响应头 -->
            <div
                v-if="responseHeaders && activeTab === 'headers' && !isLoading"
                class="response-headers"
            >
              <table class="headers-table">
                <thead>
                <tr>
                  <th class="header-name">名称</th>
                  <th class="header-value">值</th>
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

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
// @ts-ignore
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.min.css';

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
          console.log(response);
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
          } else {
            const text = await response.text();
            responseData.value = text || 'No content';
          }

        } catch (err) {
          responseTime.value = Math.round(performance.now() - startTime);
          if (err instanceof Error) {
            errorMessage.value = err.message;
          } else {
            errorMessage.value = '请求发生错误，请检查网络连接或URL';
          }
        } finally {
          isLoading.value = false;
        }
      };

// 初始化JSON编辑器
      onMounted(() => {
        if (jsonEditorContainer.value) {
          jsonEditor.value = new JSONEditor(jsonEditorContainer.value, {
            mode: 'tree',
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
/* 基础样式设置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

/* 布局样式 */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 60px;
  background-color: #377ff0;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.logo-icon {
  width: 30px;
  height: 30px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.request-panel, .response-panel {
  width: 50%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 30px;
  padding-bottom: 0;
  background-color: white;
}

.request-panel {
  border-right: 1px solid #e2e8f0;
}

.panel-section {
  overflow: hidden;
}

.panel-section-expandable {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.section-header {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  background-color: #f6f6f6;
  transition: all 0.2s ease;
}

.section-header:hover {
  background-color: #f1f5f9;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title h3 {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #334155;
}

.section-content {
  padding: 16px;
  transition: max-height 0.3s ease, padding 0.3s ease;
  max-height: 500px;
  overflow: auto;
}

.section-content-expandable {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-height: none;
  height: 100%;
}

.content-hidden {
  max-height: 0;
  padding: 0 16px;
  overflow: hidden;
}

/* 请求方法按钮样式 */
.method-buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.method-btn {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border-width: 1px;
  border-style: solid;
  min-width: 60px;
  text-align: center;
}

.method-btn-inactive {
  background-color: white;
  color: #64748b;
  border-color: #cbd5e1;
}

.method-btn-inactive:hover {
  background-color: #f1f5f9;
  border-color: #94a3b8;
}

.method-btn-active {
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.method-btn-blue {
  background-color: #eff6ff;
  color: #1d4ed8;
  border-color: #93c5fd;
}

.method-btn-green {
  background-color: #f0fdf4;
  color: #059669;
  border-color: #86efac;
}

.method-btn-orange {
  background-color: #fff7ed;
  color: #c2410c;
  border-color: #fb923c;
}

.method-btn-red {
  background-color: #fee2e2;
  color: #b91c1c;
  border-color: #fecaca;
}

.method-btn-purple {
  background-color: #faf5ff;
  color: #7c3aed;
  border-color: #c4b5fd;
}

.method-btn-gray {
  background-color: #f8fafc;
  color: #64748b;
  border-color: #cbd5e1;
}

.method-btn-indigo {
  background-color: #eef2ff;
  color: #4f46e5;
  border-color: #a5b4fc;
}

/* URL输入框样式 */
.url-input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.url-input {
  width:  100%;
  padding: 10px;
  height: 30px;
  margin-left: 20px;
  border-radius: 9px;
  font-size: 0.9375rem;
  border: 1px solid #cbd5e1;
}
.url-input:focus {
  outline: none;
  border-color: #93c5fd;
}

/* 请求头样式 */
.add-header-btn {
  display: flex;
  align-items: center;
  padding: 6px;
  background-color: white;
  color: #64748b;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 15px;
}

.add-header-btn:hover {
  background-color: #f1f5f9;
  border-color: #94a3b8;
}

.headers-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.header-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-key, .header-value {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.header-key:focus, .header-value:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.header-key {
  flex: 1;
}

.header-value {
  flex: 2;
}

.remove-header-btn {
  padding: 8px;
  background: white;
  border: 1px solid #cbd5e1;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-header-btn:hover {
  color: #dc2626;
  border-color: #dc2626;
  background-color: #fee2e2;
}

/* JSON编辑器容器 */
.json-editor-container {
  flex: 1;
  min-height: 0;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  overflow: hidden;
}

/* 发送按钮区域 */
.send-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f6f6f6;
  border-top: 1px solid #e2e8f0;
}

.response-time {
  font-size: 0.875rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;
}

.send-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background-color: #2563eb;
  color: white;
  border: 1px solid #2563eb;
  border-radius: 4px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.send-btn:hover {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.send-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  box-shadow: none;
  background-color: #2563eb;
  border-color: #2563eb;
}

/* 标签页样式 */
.tabs-container {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  background-color: #fbfbfb;
}

.tab-btn {
  padding: 12px 16px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  max-width: 120px;
}

.tab-btn:hover {
  color: #0f172a;
  background-color: #e2e8f0;
}

.tab-active {
  color: #2563eb;
  border-bottom-color: #2563eb;
  background-color: white;
}

/* 响应内容区域 */
.response-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.response-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: #fbfbfb;
  border-bottom: 1px solid #e2e8f0;
}

.status-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-code {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 30px;
  border-radius: 10px;
  padding: 10px;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.status-unknown {
  background-color: #787878;
}

.status-success {
  background-color: rgba(16, 185, 70, 0.71);
}

.status-redirect {
  background-color: rgba(59, 130, 246, 0.63);
}

.status-client-error {
  background-color: rgba(245, 158, 11, 0.58);
}

.status-server-error {
  background-color: rgba(239, 68, 68, 0.65);
}

.status-text {
  font-size: 0.875rem;
  color: #475569;
}

.content-type {
  font-size: 0.75rem;
  color: #64748b;
}

.response-body {
  flex: 1;
  padding: 16px;
  overflow: auto;
}

/* 状态显示样式 */
.empty-state, .loading-state, .error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #64748b;
  padding: 24px;
  text-align: center;
}

.error-state {
  color: #ef4444;
}

/* 响应数据样式 */
.json-response {
  background-color: #fbfbfb;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.875rem;
  overflow: auto;
  max-height: 100%;
}

.json-response pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}


/* 响应头表格样式 */
.response-headers {
  background-color: #fbfbfb;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  overflow: auto;
  max-height: 100%;
}

.headers-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.headers-table th, .headers-table td {
  padding: 8px 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.headers-table th {
  background-color: #e2e8f0;
  font-weight: 500;
  color: #475569;
}

.header-key {
  font-weight: 500;
  color: #334155;
}

.header-val {
  color: #64748b;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  word-break: break-all;
}

/* 动画效果 */
.chevron {
  transition: transform 0.3s ease;
}

.chevron-rotated {
  transform: rotate(180deg);
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
  border: 1px solid transparent;
  background-clip: padding-box;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 元素获得焦点时的样式 */
:focus {
  outline: none;
}

:focus-visible {
  outline: 2px solid rgba(59, 130, 246, 0.3);
  outline-offset: 1px;
}

/* 图标样式 - 使用SVG代替表情图标 */
.btn-icon, .section-icon, .url-icon, .chevron-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.header-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cline x1='1' y1='4' x2='23' y2='4'/%3E%3Cline x1='1' y1='10' x2='23' y2='10'/%3E%3Cline x1='1' y1='16' x2='23' y2='16'/%3E%3C/svg%3E");
}

.code-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='16 18 22 12 16 6'/%3E%3Cpolyline points='8 6 2 12 8 18'/%3E%3C/svg%3E");
}

.plus-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cline x1='12' y1='5' x2='12' y2='19'/%3E%3Cline x1='5' y1='12' x2='19' y2='12'/%3E%3C/svg%3E");
}

.trash-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpolyline points='3 6 5 6 21 6'/%3E%3Cpath d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'/%3E%3C/svg%3E");
}

.clock-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpolyline points='12 6 12 12 16 14'/%3E%3C/svg%3E");
}

.exchange-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='M12 20V10'/%3E%3Cpath d='M18 20l-6-6-6 6'/%3E%3Cpath d='M12 4v10'/%3E%3Cpath d='M6 4l6 6 6-6'/%3E%3C/svg%3E");
  width: 48px;
  height: 48px;
}

.error-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23dc2626' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cline x1='15' y1='9' x2='9' y2='15'/%3E%3Cline x1='9' y1='9' x2='15' y2='15'/%3E%3C/svg%3E");
  width: 48px;
  height: 48px;
}

.chevron-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  transition: transform 0.3s ease;
}

.spinner-icon {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cline x1='12' y1='2' x2='12' y2='6'/%3E%3Cline x1='12' y1='18' x2='12' y2='22'/%3E%3Cline x1='4.93' y1='4.93' x2='7.76' y2='7.76'/%3E%3Cline x1='16.24' y1='16.24' x2='19.07' y2='19.07'/%3E%3Cline x1='2' y1='12' x2='6' y2='12'/%3E%3Cline x1='18' y1='12' x2='22' y2='12'/%3E%3Cline x1='4.93' y1='19.07' x2='7.76' y2='16.24'/%3E%3Cline x1='16.24' y1='7.76' x2='19.07' y2='4.93'/%3E%3C/svg%3E");
  animation: spin 1s linear infinite;
}

</style>

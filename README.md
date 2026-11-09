# Qianxi-Translate

Qianxi-Translate 是一款面向 Chromium 浏览器的轻量网页翻译扩展，基于 Manifest V3 构建。项目聚焦于三项核心能力：

- **整个网页翻译**
- **划词翻译**
- **图片翻译**

扩展支持 Chrome、Microsoft Edge、Brave、Opera、Vivaldi 等使用 Chromium 内核的浏览器，无账号体系、无遥测，也不依赖远程统计服务。

## 功能特性

### 整个网页翻译

- 一次翻译当前网页中的主要正文内容。
- 支持动态加载内容、滚动加载区域和常见 iframe。
- 支持“译文替换”和“双色对照”两种显示方式。
- 可在弹窗中随时恢复原文。
- 支持配置分块大小和并发数，适配不同翻译服务。

### 划词翻译

- 选中网页中的可见文字后显示悬浮翻译卡片。
- 入口判断不再要求选区包含字母；颜文字、表情、数字、标点和其他符号也能触发。
- 支持任意源语言的划词翻译，可在卡片中把译文切换到任意目标语言；默认跟随扩展设置。
- 当源语言与目标语言相同时，会自动改用另一种译文语言（中文原文默认英语，其他语言默认简体中文），避免只得到原文；该调整只作用于当前卡片，不会改写全局设置。
- 支持网页正文、可编辑正文、开放式 Shadow DOM 和常见 iframe 中的有效选区。
- 页面覆盖鼠标事件、或链接拖拽导致浏览器不保留选区时，仍会在松开后恢复选区并显示入口。
- 支持词典信息、译文和发音。
- 仅在用户开启功能后响应选词操作。
- 可通过扩展弹窗快速启用或关闭。

### 图片翻译

- 使用 **PaddleOCR PP-OCRv5 Mobile** 在浏览器本地识别图片文字。
- 首次使用时下载检测和识别模型，总计约 `20.5 MB`。
- 识别完成后由当前翻译服务翻译文字，并覆盖显示在图片对应区域。
- OCR 模型下载完成后，首页下载图标自动变为开关。
- 支持重新安装或删除本地 OCR 模型。

## 翻译服务

扩展默认提供以下翻译服务：

| 服务 | 类型 | 配置要求 |
| --- | --- | --- |
| Microsoft 翻译 | 公共翻译接口 | 无需额外配置 |
| Google 翻译 | 公共翻译接口 | 无需额外配置 |
| DeepSeek | AI API | 填写 API Key |
| Ollama 本地模型 | 本地 OpenAI 兼容接口 | 启动 Ollama，无需 API Key |

还支持通过服务配置页右侧的 `+` 按钮添加自定义 OpenAI 兼容服务。

### Ollama 本地模型

默认地址：

```text
http://127.0.0.1:11434/v1
```

使用前请先启动 Ollama，并至少安装一个模型。例如：

```bash
ollama serve
ollama pull qwen3:4b
```

然后在 Qianxi-Translate 的“设置 → 服务配置”中选择“Ollama 本地模型”。扩展调用 `/v1/models` 自动读取本机已安装模型，无需手动填写模型名称。

Ollama 翻译请求默认关闭隐藏推理（`reasoning_effort: "none"`）并限制最大输出长度，避免 Qwen 等推理模型长时间生成内部思考而不返回译文。连接测试使用轻量原生 `/api/chat` 请求并关闭 thinking；超过 30 秒会明确提示超时，不会一直停留在“测试中”。

本地服务请求使用扩展的后台 Service Worker 发起。为兼容 Ollama 对浏览器扩展来源的限制，扩展仅为本地 Ollama 请求申请 `declarativeNetRequestWithHostAccess` 权限。

### DeepSeek

在服务配置中填写 DeepSeek API Key 后即可使用。API Key 只保存在浏览器本地扩展存储中，不会打包进项目。

### 自定义 AI 服务

支持填写：

- 显示名称
- Base URL
- API Key
- 模型名称
- 系统提示词

Base URL 配置完成后，扩展会调用 `/models` 自动检测可用模型。AI 服务的默认系统提示词要求采用标准、正式、严肃、认真且忠实的译法。

## 安装

### 从源码加载

1. 下载或克隆本仓库。
2. 打开浏览器的扩展管理页面：
   - Chrome：`chrome://extensions/`
   - Edge：`edge://extensions/`
   - Opera：`opera://extensions/`
   - Vivaldi：`vivaldi://extensions/`
   - Brave：`brave://extensions/`
3. 开启“开发者模式”。
4. 点击“加载已解压的扩展程序”。
5. 选择本项目根目录，即包含 `manifest.json` 的目录。

### 建议版本

建议使用 2023 年以后发布的 Chromium 浏览器，以获得完整的 Manifest V3、Service Worker 和 WebAssembly 支持。

## 使用方法

1. 点击浏览器工具栏中的 Qianxi-Translate 图标。
2. 选择原文语言、目标语言和翻译服务。
3. 点击“整页翻译”翻译当前网页。
4. 在“划词翻译”开启的状态下，选中网页中的可见文字查看翻译；颜文字和表情也可以触发入口。
5. 首次使用图片翻译时，点击“图片翻译”卡片右下角的下载图标安装 OCR 模型。
6. 下载完成后打开图片翻译，再点击网页图片旁的翻译按钮。

设置页修改后会自动保存，不需要额外的“保存设置”按钮。

## 设置说明

### 翻译设置

- 原文语言
- 目标语言
- 译文显示方式
- 当前翻译服务

### 核心功能

- 整页翻译
- 划词翻译
- 图片翻译
- OCR 模型安装与删除

### 服务配置

- 服务显示开关
- 服务选择与删除
- Base URL
- API Key
- 模型自动检测
- 系统提示词
- 连接测试

### 高级设置

- 本地翻译缓存
- 代码注释翻译
- iframe 翻译
- 通用分块大小和并发数
- 单服务分块大小和并发数
- 恢复默认设置

## 权限说明

| 权限 | 用途 |
| --- | --- |
| `storage` | 保存语言、服务、功能开关和本地模型状态 |
| `activeTab` | 获取当前网页并执行翻译 |
| `webNavigation` | 管理 iframe 和页面导航后的翻译会话 |
| `declarativeNetRequestWithHostAccess` | 兼容 Ollama 本地接口的 Origin 限制 |
| `http://*/*`、`https://*/*` | 访问网页并请求用户选择的翻译服务 |

扩展不申请摄像头、麦克风、剪贴板、下载历史或浏览器历史权限。

## 本地数据与隐私

- 项目源码、安装包和默认配置不包含 API Key、账号、邮箱、设备标识或用户翻译记录。
- API Key 由用户主动填写，仅保存在 `chrome.storage.local`。
- 翻译缓存只保存在浏览器本地，用于减少重复请求。
- 扩展不包含遥测、埋点、广告或用户行为上报代码。
- 升级到 1.9.0 及以上版本时会清理旧版豆包设备标识、段落模式状态、悬浮球位置、已移除服务配置和旧翻译缓存。
- 如需删除全部扩展配置，可在“设置 → 高级”中使用“恢复默认设置”。
- 每次生成 Release 压缩包前都会运行隐私扫描，发现常见 API Key、Bearer Token 或本机路径时会终止打包。

## 项目结构

```text
Qianxi-Translate/
├─ assets/                   # 核心配置、词典、模型检测和请求模板
├─ icons/                    # 扩展图标
├─ licenses/                 # 图标等第三方许可说明
├─ ocr-runtime/              # ONNX Runtime、OpenCV 和 OCR 引擎
├─ background.js             # Manifest V3 后台 Service Worker
├─ compat.js                 # chrome/browser 命名空间兼容层
├─ content.js                # 页面翻译、划词和图片翻译入口
├─ frame-bootstrap.js        # iframe 翻译引导
├─ frame-content.js          # iframe 翻译执行器
├─ manifest.json             # 扩展清单
├─ ocrOffscreen.js           # 本地 OCR 运行环境
├─ ocr-sandbox.html          # OCR 沙箱页面
├─ options.html/css/js       # 设置页
├─ popup.html/css/js         # 扩展弹窗
└─ shared.js                 # 前台公共设置与消息函数
```

## 工作方式

1. 弹窗和设置页通过 `shared.js` 与后台 Service Worker 通信。
2. 整页翻译由内容脚本提取正文，再交给后台按分块和并发策略发送到所选翻译服务。
3. 划词翻译由内容脚本监听选区，并通过后台查询词典和译文。
4. 图片翻译先由本地 OCR 识别文字，再将文字交给当前翻译服务。
5. OCR 在现代 Chromium 中优先通过 `chrome.offscreen` 和独立沙箱隐藏运行；旧版 Chromium 自动回退到最小化窗口。

## 兼容性

项目面向现代 Chromium 内核浏览器，使用通用 Manifest V3 API：

- Google Chrome
- Microsoft Edge
- Brave
- Opera
- Vivaldi
- 其他支持 Manifest V3、扩展 Service Worker 和 WebAssembly 的 Chromium 浏览器

Firefox 和 Safari 使用不同的扩展运行模型，不在当前兼容范围内。更多说明见 [COMPATIBILITY.md](COMPATIBILITY.md)。

## 性能与资源使用

- 扩展正常情况下不会常驻独立 OCR 窗口。
- OCR 引擎在闲置 60 秒后释放 iframe、推理任务和 offscreen 文档，模型文件继续保存在浏览器 Cache Storage 中，下次使用时直接加载。
- 图片推理期间会临时占用较高内存；具体峰值取决于图片尺寸、模型和浏览器 WebAssembly 运行环境。
- 后台调试任务记录最多保留 100 条，不会随翻译次数无限增长。
- 本地翻译缓存最多保留 500 条；达到上限后会淘汰旧条目并回落到约 400 条。
- 关闭翻译或离开页面时，内容脚本会断开对应的 DOM 观察器和页面监听。

## 常见问题

### Ollama 未检测到模型

确认本地服务已经运行，并尝试：

```bash
ollama list
ollama serve
```

扩展默认读取 `http://127.0.0.1:11434/v1/models`。

### 图片翻译一直提示未安装

首次安装需要联网下载约 `20.5 MB` 的 PaddleOCR 模型。请确认网络可以访问模型服务器，安装完成后再开启图片翻译。

### 网页无法翻译

请确认当前页面使用 `http://` 或 `https://` 协议。浏览器内部页面、扩展商店和部分专用查看器不允许内容脚本运行。

### 公共翻译接口受限

Microsoft 和 Google 公共接口可能受到网络环境或频率限制。可以在设置中切换 DeepSeek、Ollama 或自定义 AI 服务。

## 开发与验证

本项目当前直接以浏览器可加载的 Manifest V3 文件分发，没有额外打包步骤。修改文件后，在扩展管理页点击“重新加载”即可测试。

已完成的验证包括：

- JavaScript 语法检查
- Manifest 资源完整性检查
- 模块导入和导入导出打包检查
- 扩展加载与设置页打开
- 整页翻译、划词翻译和图片翻译基础流程
- Ollama 模型检测与本地翻译请求
- PaddleOCR 模型安装状态

## 第三方组件

项目包含或使用以下第三方组件，其许可证原文保留在对应目录：

- PaddleOCR PP-OCRv5 Mobile
- ONNX Runtime
- OpenCV
- 图标及相关第三方资源

本仓库当前未单独声明项目级开源许可证。如需再分发或商用，请同时检查所有第三方组件的许可证要求。

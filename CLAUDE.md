# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目定位

「广行政电控优化」宿舍电费查询站的后端：一个 Express 反向代理，转发学校官方电控接口 `https://zwdk.gdxzzy.edu.cn` 的数据给前端，并托管前端构建产物。代码注释为中文。

## 命令

- `npm start` — 启动服务器（`node ./bin/www`，默认端口 3000，可用 `PORT` 环境变量覆盖）
- 没有测试、lint、构建脚本；`public/build` 里的前端产物来自同级的 `../frontend`（create-react-app 项目），需在那边 `npm run build` 后复制进来

## 架构

### 请求链路

```
前端 → /list/* (routes/menuData.js) → getAccessToken()（缓存登录）
     → routes/api/*.js（axios 调学校接口）→ routes/cache.js（内存缓存）→ 原样返回上游 JSON
```

- [app.js](app.js)：挂载 morgan/body-parser/cookie-parser，静态托管 `public/build`，挂 `/list` 和 `/imgs` 两个路由；最后的 `app.all("*")` SPA 回退返回 `index.html`
- [routes/api/server.js](routes/api/server.js)：唯一的 axios 实例（baseURL 指向学校接口，10s 超时），所有 api 模块共用
- [routes/api/](routes/api/)：每个学校接口一个文件（`getBilList`、`getBalance`、`getConsumer`、`getSubsidy`、`getParticular`、`getAccent` 登录拿 token）。文件中保留了抓包得到的请求/响应报文作为注释，是理解字段含义的最佳来源

### 关键约定

- **账号信息硬编码且分散**：`username`、`roomCode`（BY_4D_1_135）、`name` 重复写在多个 api 模块和 [getAccent.js](routes/api/getAccent.js) 里，改账号要全部同步改。登录密码是 AES-128-ECB（Pkcs7，密钥 `11193qX16h3G933g`）加密后的 Base64，加解密工具在 [routes/encode.js](routes/encode.js)（目前未被任何模块引用，仅用于生成密码）
- **缓存**（[routes/cache.js](routes/cache.js)）：进程内 `Map`，`DEFAULT_TTL = 100 * 60 * 1000`（100 分钟）。TTL 的 70% 处触发后台刷新（`refreshing` 标志防并发，刷新失败保留旧数据），每分钟清理过期项；`startCleanup()` 在模块加载时立即执行。导出 `getCachedData`（同 key 并发单飞；fetch 失败/falsy 结果**不写缓存**）和 `deleteCache`（主动清除缓存）
- **错误约定**：上游 `code` 的判断统一在 api 模块：异常或 `code !== 200` 时返回 `false`（只 `console.log`），只有成功数据（truthy）才会进入缓存。路由层据此返回 500 + `{code:500, msg}`，成功时把上游 `{code,msg,data}` 结构**原样透传**给前端。例外：`getAccent` 成功时直接返回 `accessToken` 字符串
- **token 失效自动重登**：账号密码多人共用，别人在其他网站登录后服务器会签发新 token 作废旧 token。`fetchWithAuth()`（[menuData.js](routes/menuData.js)）在请求失败时清除 `access_token` 和业务缓存、强制重新登录并重试一次。`access_token` 单独一个 key，账单按 `bill:list:${page}:${size}`、详情按 `particular:id:${id}` 分 key

### 图片上传

- [routes/upload.js](routes/upload.js)：formidable 处理，上传字段名必须是 `DormPicture`，文件存到 `public/build/images`；`GET /imgs/imgNames` 列出全部图片


### 目前未被引用的文件

- `routes/encode.js` — AES 加解密工具（生成登录密码用）
- `routes/api/Logout.js` — 登出接口封装

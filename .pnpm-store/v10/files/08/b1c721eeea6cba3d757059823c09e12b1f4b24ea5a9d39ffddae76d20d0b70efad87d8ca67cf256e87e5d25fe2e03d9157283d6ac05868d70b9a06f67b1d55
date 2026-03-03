<div align="center">

<h1>思源开发工具包</h1>

<!-- 仓库相关 -->

[![GitHub 许可证](https://img.shields.io/github/license/siyuan-community/siyuan-sdk?style=flat-square)](https://github.com/siyuan-community/siyuan-sdk/blob/main/LICENSE)
[![GitHub 仓库大小](https://img.shields.io/github/repo-size/siyuan-community/siyuan-sdk?style=flat-square)](https://github.com/siyuan-community/siyuan-sdk)
[![GitHub 代码大小](https://img.shields.io/github/languages/code-size/siyuan-community/siyuan-sdk)](https://github.com/siyuan-community/siyuan-sdk)
[![GitHub 提交活动](https://img.shields.io/github/commit-activity/t/siyuan-community/siyuan-sdk?style=flat-square)](https://github.com/siyuan-community/siyuan-sdk/commits/main)
[![GitHub 最后一次提交时间](https://img.shields.io/github/last-commit/siyuan-community/siyuan-sdk?style=flat-square)](https://github.com/siyuan-community/siyuan-sdk/commits/main)
![查看次数](https://hits.b3log.org/siyuan-community/siyuan-sdk.svg)
<br/>

<!-- GitHub 相关 -->
<!-- [![GitHub 仓库星星](https://img.shields.io/github/stars/siyuan-community/siyuan-sdk?style=flat-square)](https://github.com/siyuan-community/siyuan-sdk/stargazers)
[![GitHub 分叉](https://img.shields.io/github/forks/siyuan-community/siyuan-sdk?style=flat-square)](https://github.com/siyuan-community/siyuan-sdk/forks)
[![GitHub 关注者](https://img.shields.io/github/watchers/siyuan-community/siyuan-sdk?style=flat-square)](https://github.com/siyuan-community/siyuan-sdk/watchers)
[![GitHub 议题](https://img.shields.io/github/issues-raw/siyuan-community/siyuan-sdk?style=flat-square)](https://github.com/siyuan-community/siyuan-sdk/issues)
[![GitHub 关闭的议题](https://img.shields.io/github/issues-closed-raw/siyuan-community/siyuan-sdk?style=flat-square)](https://github.com/siyuan-community/siyuan-sdk/issues?q=is%3Aissue+is%3Aclosed)
[![GitHub 拉取请求](https://img.shields.io/github/issues-pr-raw/siyuan-community/siyuan-sdk?style=flat-square)](https://github.com/siyuan-community/siyuan-sdk/pulls)
[![GitHub 关闭的拉取请求](https://img.shields.io/github/issues-pr-closed-raw/siyuan-community/siyuan-sdk?style=flat-square)](https://github.com/siyuan-community/siyuan-sdk/pulls?q=is%3Apr+is%3Aclosed)
[![GitHub 最新发行版本](https://img.shields.io/github/v/release/siyuan-community/siyuan-sdk?include_prereleases&style=flat-square)](https://github.com/siyuan-community/siyuan-sdk/releases/latest)
[![GitHub 最新发行时间](https://img.shields.io/github/release-date/siyuan-community/siyuan-sdk?style=flat-square)](https://github.com/siyuan-community/siyuan-sdk/releases/latest)
[![GitHub 发行版本下载次数](https://img.shields.io/github/downloads/siyuan-community/siyuan-sdk/total?style=flat-square)](https://github.com/siyuan-community/siyuan-sdk/releases)
<br/> -->

<!-- NPM 相关 -->

[![NPM 版本](https://img.shields.io/npm/v/%40siyuan-community/siyuan-sdk?style=flat-square)](https://www.npmjs.com/package/@siyuan-community/siyuan-sdk?activeTab=versions)
[![NPM 依赖 (via libraries.io)](https://img.shields.io/librariesio/dependents/npm/%40siyuan-community/siyuan-sdk?style=flat-square)](https://www.npmjs.com/package/@siyuan-community/siyuan-sdk?activeTab=dependents)
[![NPM 类型定义](https://img.shields.io/npm/types/%40siyuan-community/siyuan-sdk?style=flat-square)](https://www.npmjs.com/package/@siyuan-community/siyuan-sdk)
[![NPM 总下载次数](https://img.shields.io/npm/dt/%40siyuan-community/siyuan-sdk?style=flat-square)](https://www.npmjs.com/package/@siyuan-community/siyuan-sdk)
[![NPM 每年下载次数](https://img.shields.io/npm/dy/%40siyuan-community/siyuan-sdk?style=flat-square)](https://www.npmjs.com/package/@siyuan-community/siyuan-sdk)
[![NPM 每月下载次数](https://img.shields.io/npm/dm/%40siyuan-community/siyuan-sdk?style=flat-square)](https://www.npmjs.com/package/@siyuan-community/siyuan-sdk)
[![NPM 每周下载次数](https://img.shields.io/npm/dw/%40siyuan-community/siyuan-sdk?style=flat-square)](https://www.npmjs.com/package/@siyuan-community/siyuan-sdk)

---

**简体中文** \| [English](./README.md)

---

</div>

> 一个简单易用的 [思源笔记](https://github.com/siyuan-note/siyuan) 开发工具包 (SDK)。
> 完整文档请参考 [siyuan-SDK | 思源开发者文档](https://docs.siyuan-note.club/zh-Hans/reference/community/siyuan-sdk/)

- [开始](#开始)
  - [安装](#安装)
- [示例](#示例)
  - [初始化客户端](#初始化客户端)
    - [默认配置](#默认配置)
    - [配置为 XHR 客户端](#配置为-xhr-客户端)
    - [配置为 Fetch 客户端](#配置为-fetch-客户端)
  - [更改 HTTP 客户端模式](#更改-http-客户端模式)
  - [更新客户端全局配置](#更新客户端全局配置)
  - [调用内核 API (async)](#调用内核-api-async)
  - [调用内核 API (Promise)](#调用内核-api-promise)
  - [使用类型定义](#使用类型定义)
- [参考](#参考)
  - [API 参考](#api-参考)
- [更改日志](#更改日志)

## 开始

### 安装

使用 npm:

```bash
$ npm install @siyuan-community/siyuan-sdk
```

使用 pnpm:

```bash
$ pnpm i @siyuan-community/siyuan-sdk
```

使用 yarn:

```bash
$ yarn add @siyuan-community/siyuan-sdk
```

## 示例

### 初始化客户端

#### 默认配置

```javascript
import { Client } from "@siyuan-community/siyuan-sdk";

/* 初始化客户端 (默认使用 Axios 发起 XHR 请求) */
const client = new Client({
    /**
     * (可选) 思源内核服务地址
     * @default: document.baseURI
     */
    baseURL: "http://localhost:6806/",

    /**
     * (可选) 思源内核服务 token
     * @default: <空>
     */
    token: "0123456789abcdef", // , 默认为空

    /**
     * (可选) Axios 其他请求配置
     * REF: https://axios-http.com/zh/docs/req_config
     * REF: https://www.axios-http.cn/docs/req_config
     */
});
```

#### 配置为 XHR 客户端

```javascript
import { Client } from "@siyuan-community/siyuan-sdk";

/* 初始化为 XHR 客户端 (使用 Axios 发起 XHR 请求) */
const client = new Client(
    {
        /**
         * (可选) 思源内核服务地址
         * @default: document.baseURI
         */
        baseURL: "http://localhost:6806/",

        /**
         * (可选) 思源内核服务 token
         * @default: <空>
         */
        token: "0123456789abcdef", // , 默认为空

        /**
         * (可选) Axios 其他请求配置
         * REF: https://axios-http.com/zh/docs/req_config
         * REF: https://www.axios-http.cn/docs/req_config
         */
    },
    "xhr",
);
```

#### 配置为 Fetch 客户端

```javascript
import { Client } from "@siyuan-community/siyuan-sdk";

/* 初始化为 Fetch 客户端 (使用 ofetch 发起 Fetch 请求) */
const client = new Client(
    {
        /**
         * (可选) 思源内核服务地址
         * @default: document.baseURI
         */
        baseURL: "http://localhost:6806/",

        /**
         * (可选) 思源内核服务 token
         * @default: <空>
         */
        token: "0123456789abcdef", // , 默认为空

        /**
         * (可选) ofetch 其他请求配置
         * REF: https://www.npmjs.com/package/ofetch
         * REF: https://www.jsdocs.io/package/ofetch
         */
    },
    "fetch",
);
```

### 更改 HTTP 客户端模式

```javascript
client._setClientType("fetch"); // 将客户端模式更改为 Fetch
client._setClientType("xhr"); // 将客户端模式更改为 XHR
```

### 更新客户端全局配置

```javascript
/* 默认更新当前模式的全局配置 */
client._updateOptions({
    token: "abcdef0123456789", // 将思源 API token 更改为 abcdef0123456789
});

/* 更新 XHR 客户端 Axios 的全局配置 */
client._updateOptions(
    {
        timeout: 10_000, // 请求超时时间为 10s
        /* 其他 Axios 请求配置 */
    },
    "xhr",
);

/* 更新 Fetch 客户端 ofetch 的全局配置 */
client._updateOptions(
    {
        retry: 3, // 请求重试次数为 3 次
        /* 其他 ofetch 请求配置 */
    },
    "fetch",
);
```

### 调用内核 API (async)

```javascript
import { HTTPError, KernelError } from "@siyuan-community/siyuan-sdk";

async function func() {
    try {
        /**
         * 异步调用内核 API `/api/notification/pushMsg`
         * 推送通知消息
         */
        const response = await client.pushMsg({
            msg: "这是一条通知消息", // 通知内容
            timeout: 7_000, // 通知显示时间
        });
        console.log(response); // { "code": 0, "msg": "", "data": { "id": "0a1b2c3" } }
    }
    catch (error) {
        if (error instanceof KernelError) { // 内核错误
            console.error(error.body); // 响应体 { "code": -1, "msg": "错误信息", "data": null }
        }
        else if (error instanceof HTTPError) { // HTTP 请求错误
            console.error(error.status); // HTTP 状态码
        }
        else { // 其他未捕获的错误
            throw error;
        }
    }
    finally {
        /* ... */
    }
}
```

### 调用内核 API (Promise)

```javascript
import { HTTPError, KernelError } from "@siyuan-community/siyuan-sdk";

function func() {
    /**
     * 异步调用内核 API `/api/notification/pushErrMsg`
     * 推送错误消息
     */
    client
        .pushErrMsg({
            msg: "这是一条错误消息", // 通知内容
            timeout: 7_000, // 通知显示时间
        })
        .then((response) => {
            console.log(response); // { "code": 0, "msg": "", "data": { "id": "0a1b2c3" } }
        })
        .catch((error) => {
            if (error instanceof KernelError) { // 内核错误
                console.error(error.body); // 响应体 { "code": -1, "msg": "错误信息", "data": null }
            }
            else if (error instanceof HTTPError) { // HTTP 请求错误
                console.error(error.status); // HTTP 状态码
            }
            else { // 其他未捕获的错误
                throw error;
            }
        })
        .finally(() => {
            /* ... */
        });
}
```

### 使用类型定义

```typescript
import { types } from "@siyuan-community/siyuan-sdk";

const payload: types.kernel.api.notification.pushMsg.IPayload = {
    msg: "这是一条通知消息", // 通知内容
    timeout: 7_000, // 通知显示时间
};
```

```typescript
import pushMsg from "@siyuan-community/siyuan-sdk/dist/types/kernel/api/notification/pushMsg";

const payload: pushMsg.IPayload = {
    msg: "这是一条通知消息", // 通知内容
    timeout: 7_000, // 通知显示时间
};
```

## 参考

### API 参考

- [思源 API 参考文档](https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md)
- [思源 API JSON Schema 定义](https://github.com/siyuan-community/siyuan-sdk/tree/main/schemas)
- [思源内核 API | 思源开发者文档](https://docs.siyuan-note.club/zh-Hans/reference/community/siyuan-sdk/kernel/)

## 更改日志

[CHANGELOG.md](https://github.com/siyuan-community/siyuan-sdk/blob/main/CHANGELOG.md)

/**
 * Copyright (C) 2024 SiYuan Community
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see {@link http://www.gnu.org/licenses/}.
 */

import * as axios from "axios";
import Websocket from "isomorphic-ws";
import * as base64 from "js-base64";
import * as ofetch from "ofetch";

import constants from "@/constants";
import { HTTPError } from "@/errors/http";
import { KernelError } from "@/errors/kernel";

import type { kernel } from "@/types";

/* 基础设置选项 */
export interface IBaseOptions {
    /**
     * 思源服务 base URL
     * REF: https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/base
     */
    baseURL?: string;
    /**
     * 思源 API Token
     * REF: https://github.com/siyuan-note/siyuan/blob/master/API.md#Authentication
     */
    token?: null | string;
}

export interface IBlob extends Blob {
    contentType: null | string;
}

/* 扩展设置选项 */
export type ExtendOptions = axios.CreateAxiosDefaults | ofetch.FetchOptions;

/* 完整设置选项 */
// export type IOptions = (IBaseOptions & axios.CreateAxiosDefaults) | (IBaseOptions & ofetch.FetchOptions);
export type FetchOptions = IBaseOptions & ofetch.FetchOptions;
export type AxiosOptions = IBaseOptions & axios.CreateAxiosDefaults;
export type Options = AxiosOptions | FetchOptions;

/* HTTP 请求客户端类型 */
export type ClientType = "fetch" | "xhr";

/* 响应类型 */
export type FetchResponseType =
    | "arrayBuffer" //
    | "blob"
    | "json"
    | "stream"
    | "text";
export type ResponseType = axios.ResponseType | FetchResponseType;

/* 全局设置选项 */
export type GlobalOptions =
    | {
        type: "fetch";
        options: FetchOptions;
    }
    | {
        type: "xhr";
        options: AxiosOptions;
    };

/* 临时设置选项 */
export interface TempFetchOptions {
    type: "fetch";
    options?: ofetch.FetchOptions;
}
export interface TempAxiosOptions {
    type: "xhr";
    options?: axios.AxiosRequestConfig;
}
export type TempOptions = TempAxiosOptions | TempFetchOptions;

export interface IFetch {
    $fetch: typeof fetch;
}

export enum HeaderKey {
    Authorization = "Authorization",
}

export class Client implements IFetch {
    public static readonly ws = {
        broadcast: { pathname: "/ws/broadcast" },
    } as const;

    public static readonly api = {
        asset: {
            upload: { pathname: "/api/asset/upload", method: "POST" } as const,
        } as const,
        attr: {
            getBlockAttrs: { pathname: "/api/attr/getBlockAttrs", method: "POST" } as const,
            getBookmarkLabels: { pathname: "/api/attr/getBookmarkLabels", method: "POST" } as const,
            setBlockAttrs: { pathname: "/api/attr/setBlockAttrs", method: "POST" } as const,
        } as const,
        block: {
            appendBlock: { pathname: "/api/block/appendBlock", method: "POST" } as const,
            deleteBlock: { pathname: "/api/block/deleteBlock", method: "POST" } as const,
            foldBlock: { pathname: "/api/block/foldBlock", method: "POST" } as const,
            getBlockBreadcrumb: { pathname: "/api/block/getBlockBreadcrumb", method: "POST" } as const,
            getBlockDOM: { pathname: "/api/block/getBlockDOM", method: "POST" } as const,
            getBlockInfo: { pathname: "/api/block/getBlockInfo", method: "POST" } as const,
            getBlockKramdown: { pathname: "/api/block/getBlockKramdown", method: "POST" } as const,
            getChildBlocks: { pathname: "/api/block/getChildBlocks", method: "POST" } as const,
            getDocInfo: { pathname: "/api/block/getDocInfo", method: "POST" } as const,
            insertBlock: { pathname: "/api/block/insertBlock", method: "POST" } as const,
            moveBlock: { pathname: "/api/block/moveBlock", method: "POST" } as const,
            prependBlock: { pathname: "/api/block/prependBlock", method: "POST" } as const,
            transferBlockRef: { pathname: "/api/block/transferBlockRef", method: "POST" } as const,
            unfoldBlock: { pathname: "/api/block/unfoldBlock", method: "POST" } as const,
            updateBlock: { pathname: "/api/block/updateBlock", method: "POST" } as const,
        } as const,
        broadcast: {
            getChannelInfo: { pathname: "/api/broadcast/getChannelInfo", method: "POST" } as const,
            getChannels: { pathname: "/api/broadcast/getChannels", method: "POST" } as const,
            postMessage: { pathname: "/api/broadcast/postMessage", method: "POST" } as const,
        } as const,
        convert: {
            pandoc: { pathname: "/api/convert/pandoc", method: "POST" } as const,
        } as const,
        export: {
            exportHTML: { pathname: "/api/export/exportHTML", method: "POST" } as const,
            exportMdContent: { pathname: "/api/export/exportMdContent", method: "POST" } as const,
            exportResources: { pathname: "/api/export/exportResources", method: "POST" } as const,
        } as const,
        file: {
            getFile: { pathname: "/api/file/getFile", method: "POST" } as const,
            putFile: { pathname: "/api/file/putFile", method: "POST" } as const,
            readDir: { pathname: "/api/file/readDir", method: "POST" } as const,
            removeFile: { pathname: "/api/file/removeFile", method: "POST" } as const,
            renameFile: { pathname: "/api/file/renameFile", method: "POST" } as const,
        } as const,
        filetree: {
            createDailyNote: { pathname: "/api/filetree/createDailyNote", method: "POST" } as const,
            createDocWithMd: { pathname: "/api/filetree/createDocWithMd", method: "POST" } as const,
            getDoc: { pathname: "/api/filetree/getDoc", method: "POST" } as const,
            getHPathByID: { pathname: "/api/filetree/getHPathByID", method: "POST" } as const,
            getHPathByPath: { pathname: "/api/filetree/getHPathByPath", method: "POST" } as const,
            getIDsByHPath: { pathname: "/api/filetree/getIDsByHPath", method: "POST" } as const,
            listDocsByPath: { pathname: "/api/filetree/listDocsByPath", method: "POST" } as const,
            moveDocs: { pathname: "/api/filetree/moveDocs", method: "POST" } as const,
            removeDoc: { pathname: "/api/filetree/removeDoc", method: "POST" } as const,
            renameDoc: { pathname: "/api/filetree/renameDoc", method: "POST" } as const,
            searchDocs: { pathname: "/api/filetree/searchDocs", method: "POST" } as const,
        } as const,
        history: {
            getDocHistoryContent: { pathname: "/api/history/getDocHistoryContent", method: "POST" } as const,
            getHistoryItems: { pathname: "/api/history/getHistoryItems", method: "POST" } as const,
        } as const,
        inbox: {
            getShorthand: { pathname: "/api/inbox/getShorthand", method: "POST" } as const,
        } as const,
        network: {
            echo: { pathname: "/api/network/echo", method: "POST" } as const,
            forwardProxy: { pathname: "/api/network/forwardProxy", method: "POST" } as const,
        } as const,
        notebook: {
            closeNotebook: { pathname: "/api/notebook/closeNotebook", method: "POST" } as const,
            createNotebook: { pathname: "/api/notebook/createNotebook", method: "POST" } as const,
            getNotebookConf: { pathname: "/api/notebook/getNotebookConf", method: "POST" } as const,
            lsNotebooks: { pathname: "/api/notebook/lsNotebooks", method: "POST" } as const,
            openNotebook: { pathname: "/api/notebook/openNotebook", method: "POST" } as const,
            removeNotebook: { pathname: "/api/notebook/removeNotebook", method: "POST" } as const,
            renameNotebook: { pathname: "/api/notebook/renameNotebook", method: "POST" } as const,
            setNotebookConf: { pathname: "/api/notebook/setNotebookConf", method: "POST" } as const,
        } as const,
        notification: {
            pushErrMsg: { pathname: "/api/notification/pushErrMsg", method: "POST" } as const,
            pushMsg: { pathname: "/api/notification/pushMsg", method: "POST" } as const,
        } as const,
        outline: {
            getDocOutline: { pathname: "/api/outline/getDocOutline", method: "POST" } as const,
        } as const,
        query: {
            sql: { pathname: "/api/query/sql", method: "POST" } as const,
        } as const,
        repo: {
            openRepoSnapshotDoc: { pathname: "/api/repo/openRepoSnapshotDoc", method: "POST" } as const,
        } as const,
        search: {
            fullTextSearchBlock: { pathname: "/api/search/fullTextSearchBlock", method: "POST" } as const,
        } as const,
        snippet: {
            getSnippet: { pathname: "/api/snippet/getSnippet", method: "POST" } as const,
            setSnippet: { pathname: "/api/snippet/setSnippet", method: "POST" } as const,
        } as const,
        sqlite: {
            flushTransaction: { pathname: "/api/sqlite/flushTransaction", method: "POST" } as const,
        } as const,
        storage: {
            getLocalStorage: { pathname: "/api/storage/getLocalStorage", method: "POST" } as const,
            getRecentDocs: { pathname: "/api/storage/getRecentDocs", method: "POST" } as const,
            setLocalStorage: { pathname: "/api/storage/setLocalStorage", method: "POST" } as const,
            setLocalStorageVal: { pathname: "/api/storage/setLocalStorageVal", method: "POST" } as const,
        } as const,
        system: {
            bootProgress: { pathname: "/api/system/bootProgress", method: "POST" } as const,
            currentTime: { pathname: "/api/system/currentTime", method: "POST" } as const,
            exit: { pathname: "/api/system/exit", method: "POST" } as const,
            getConf: { pathname: "/api/system/getConf", method: "POST" } as const,
            logoutAuth: { pathname: "/api/system/logoutAuth", method: "POST" } as const,
            version: { pathname: "/api/system/version", method: "POST" } as const,
        } as const,
        template: {
            render: { pathname: "/api/template/render", method: "POST" } as const,
            renderSprig: { pathname: "/api/template/renderSprig", method: "POST" } as const,
        } as const,
    } as const;

    public static headers2record(headers: Headers): Record<string, string> {
        const record: Record<string, string> = {};
        headers.forEach((value, key) => {
            record[key] = value;
        });
        return record;
    }

    public static headers2records(headers: Headers): Record<string, string>[] {
        const records: Record<string, string>[] = [];
        headers.forEach((value, key) => {
            records.push({ [key]: value });
        });
        return records;
    }

    public static headers2entries(headers: Record<string, string[]>): Array<[string, string]> {
        const entries: Array<[string, string]> = [];
        Object.entries(headers).forEach(
            ([
                key,
                values,
            ]) => {
                values.forEach((value) =>
                    entries.push([
                        key,
                        value,
                    ]),
                );
            },
        );
        return entries;
    }

    public static entries2record(entries: Array<[string, string]> | IterableIterator<[string, string]>): Record<string, string> {
        const record: Record<string, string> = {};
        for (const [
            key,
            value,
        ] of entries) {
            record[key] = value;
        }
        return record;
    }

    protected _type: ClientType = "xhr";

    protected _baseURL: string
        = globalThis.top?.document?.baseURI //
        ?? globalThis.parent?.document?.baseURI
        ?? globalThis.location?.origin
        ?? constants.SIYUAN_DEFAULT_BASE_URL;

    protected _token: null | string = null;

    protected _ofetch_options: ofetch.FetchOptions = {
        baseURL: this._baseURL,
        headers: this._headers,
    };

    protected _axios_options: axios.CreateAxiosDefaults = {
        baseURL: this._baseURL,
        timeout: constants.REQUEST_TIMEOUT,
        headers: this._headers,
    };

    public _fetch = ofetch.ofetch.create(this._ofetch_options);
    public _axios = axios.default.create(this._axios_options);

    protected get _authorization(): string {
        return `Token ${this._token}`;
    }

    protected get _headers(): Record<string, string> {
        return this._token !== null //
            ? { [HeaderKey.Authorization]: this._authorization }
            : {};
    }

    constructor(
        options?: FetchOptions, //
        type?: Extract<ClientType, "fetch">,
    );
    constructor(
        options?: AxiosOptions, //
        type?: Extract<ClientType, "xhr">,
    );
    constructor(
        options: Options = {}, // 全局设置选项
        type: ClientType = "xhr", // HTTP 请求客户端类型
    ) {
        this._setClientType(type);
        // @ts-expect-error Options 类型不能赋值给 FetchOptions 类型或者 AxiosOptions 类型
        this._updateOptions(options, type);
    }

    /* 设置默认使用的客户端类型 */
    public _setClientType(type: ClientType): void {
        this._type = type;
    }

    /* 更新配置 */
    public _updateOptions(
        options: FetchOptions, //
        type: Extract<ClientType, "fetch">,
    ): void;
    public _updateOptions<T extends Extract<ClientType, "fetch">>(
        options: FetchOptions, //
        type?: T,
    ): void;
    public _updateOptions(
        options: AxiosOptions, //
        type: Extract<ClientType, "xhr">,
    ): void;
    public _updateOptions<T extends Extract<ClientType, "xhr">>(
        options: AxiosOptions, //
        type?: T,
    ): void;
    public _updateOptions(
        options: Options, //
        type: ClientType = this._type,
    ): void {
        this._baseURL = options.baseURL ?? this._baseURL;
        switch (options.token) {
            case undefined: // 不更新 token
                break;
            case null: // 删除 token
            default: // 设置 token
                this._token = options.token;
                delete options.token;
                break;
        }

        /* options.headers 的优先级高于 token */
        switch (type) {
            case "fetch": {
                const ofetch_options = options as FetchOptions;
                switch (true) {
                    case Array.isArray(ofetch_options.headers): {
                        const header = ofetch_options.headers.find(
                            ([
                                key,
                            ]) => key.toLowerCase() === HeaderKey.Authorization.toLowerCase(),
                        );
                        if (!header) {
                            ofetch_options.headers.push([
                                HeaderKey.Authorization,
                                this._authorization,
                            ]);
                        }
                        break;
                    }
                    case ofetch_options.headers instanceof Headers: {
                        if (!ofetch_options.headers.has(HeaderKey.Authorization)) {
                            ofetch_options.headers.set(HeaderKey.Authorization, this._authorization);
                        }
                        break;
                    }
                    case typeof ofetch_options.headers === "object": {
                        if (!(HeaderKey.Authorization in ofetch_options.headers)) {
                            ofetch_options.headers[HeaderKey.Authorization] = this._authorization;
                        }
                        break;
                    }
                    default: {
                        ofetch_options.headers = this._headers;
                        break;
                    }
                }
                this._ofetch_options = ofetch_options as ofetch.FetchOptions;
                this._fetch = ofetch.ofetch.create(this._ofetch_options);
                break;
            }
            case "xhr":
            default: {
                const axios_options = options as AxiosOptions;
                if (axios_options.headers) {
                    switch (true) {
                        case axios_options.headers instanceof axios.AxiosHeaders: {
                            if (!axios_options.headers.has(HeaderKey.Authorization)) {
                                axios_options.headers.set(HeaderKey.Authorization, this._authorization);
                            }
                            break;
                        }
                        case typeof axios_options.headers === "object": {
                            switch (true) {
                                case "common" in axios_options.headers //
                                    || "get" in axios_options.headers
                                    || "post" in axios_options.headers: {
                                    if ("common" in axios_options.headers) {
                                        if (!(HeaderKey.Authorization in (axios_options.headers as axios.HeadersDefaults).get)) {
                                            (axios_options.headers as axios.HeadersDefaults).get[HeaderKey.Authorization] = this._authorization;
                                        }
                                    }
                                    if ("get" in axios_options.headers) {
                                        if (!(HeaderKey.Authorization in (axios_options.headers as axios.HeadersDefaults).get)) {
                                            (axios_options.headers as axios.HeadersDefaults).get[HeaderKey.Authorization] = this._authorization;
                                        }
                                    }
                                    if ("post" in axios_options.headers) {
                                        if (!(HeaderKey.Authorization in (axios_options.headers as axios.HeadersDefaults).post)) {
                                            (axios_options.headers as axios.HeadersDefaults).post[HeaderKey.Authorization] = this._authorization;
                                        }
                                    }
                                    break;
                                }
                                default: {
                                    if (!(HeaderKey.Authorization in axios_options.headers)) {
                                        (axios_options.headers as axios.RawAxiosRequestHeaders)[HeaderKey.Authorization] = this._authorization;
                                    }
                                    break;
                                }
                            }
                            break;
                        }
                        default: {
                            axios_options.headers = this._headers;
                            break;
                        }
                    }
                }
                else {
                    axios_options.headers = this._headers;
                }
                this._axios_options = axios_options as axios.CreateAxiosDefaults;
                this._axios = axios.default.create(this._axios_options);
                break;
            }
        }
    }

    /**
     * 兼容 fetch 接口的 forwardProxy 调用方案
     * @param input - {@link fetch} 的第一个参数
     * @param init - {@link fetch} 的第二个参数
     * @returns Response {@link fetch} 的返回值
     */
    public async $fetch(
        input: RequestInfo | URL, //
        init?: RequestInit,
    ): Promise<Response> {
        // REF: https://developer.mozilla.org/zh-CN/docs/Web/API/Request/Request
        const request = new Request(input, init);
        const response = await this.forwardProxy({
            url: request.url,
            method: request.method as kernel.api.network.forwardProxy.TRequestMethod,
            headers: Client.headers2records(request.headers),
            payload: base64.fromUint8Array(new Uint8Array(await request.arrayBuffer())),
            timeout: constants.REQUEST_TIMEOUT,
            contentType: "application/json",
            payloadEncoding: "base64",
            responseEncoding: "base64",
        });
        // REF: https://developer.mozilla.org/zh-CN/docs/Web/API/Response/Response
        return new Response(base64.toUint8Array(response.data.body), {
            status: response.data.status,
            statusText: response.msg,
            headers: new Headers(Client.headers2entries(response.data.headers)),
        });
    }

    /* 👇 WebSocket 👇 */
    /* 消息广播 */
    public broadcast(
        params: kernel.ws.broadcast.IParams | URLSearchParams, //
        protocols?: string | string[],
        config?: IBaseOptions,
    ): InstanceType<typeof Websocket> {
        const baseURL = config?.baseURL ?? this._baseURL;
        const token = config?.token ?? this._token;

        const searchParams = new URLSearchParams(params);
        if (token) {
            searchParams.set("token", token);
        }

        const url = new URL(baseURL, globalThis.location?.href);
        url.protocol = url.protocol.replace(/^http/, "ws");
        url.pathname = url.pathname.endsWith("/") //
            ? `${url.pathname}${Client.ws.broadcast.pathname.substring(1)}`
            : `${url.pathname}${Client.ws.broadcast.pathname}`;
        url.search = searchParams.toString();

        return new Websocket(url, protocols);
    }

    /* 👇 由 JSON Schema 生成的类型定义👇 */
    /* 上传资源文件 */
    public async upload(
        payload: kernel.api.asset.upload.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.asset.upload.IResponse> {
        const formdata = new FormData();

        if (payload.id != null) {
            formdata.append("id", payload.id);
        }
        if (payload.assetsDirPath != null) {
            formdata.append("assetsDirPath", payload.assetsDirPath);
        }
        if (payload.skipIfDuplicated != null) {
            formdata.append("skipIfDuplicated", String(payload.skipIfDuplicated));
        }

        payload.files.forEach((file) => formdata.append("file[]", file));

        const response: kernel.api.asset.upload.IResponse = await this._request(
            Client.api.asset.upload.pathname, //
            Client.api.asset.upload.method,
            formdata,
            config,
        );
        return response;
    }

    /* 获取块属性 */
    public async getBlockAttrs(
        payload: kernel.api.attr.getBlockAttrs.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.attr.getBlockAttrs.IResponse> {
        const response: kernel.api.attr.getBlockAttrs.IResponse = await this._request(
            Client.api.attr.getBlockAttrs.pathname, //
            Client.api.attr.getBlockAttrs.method,
            payload,
            config,
        );
        return response;
    }

    /* 获取所有书签 */
    public async getBookmarkLabels(config?: TempOptions): Promise<kernel.api.attr.getBookmarkLabels.IResponse> {
        const response: kernel.api.attr.getBookmarkLabels.IResponse = await this._request(
            Client.api.attr.getBookmarkLabels.pathname, //
            Client.api.attr.getBookmarkLabels.method,
            undefined,
            config,
        );
        return response;
    }

    /* 设置块属性 */
    public async setBlockAttrs(
        payload: kernel.api.attr.setBlockAttrs.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.attr.setBlockAttrs.IResponse> {
        const response: kernel.api.attr.setBlockAttrs.IResponse = await this._request(
            Client.api.attr.setBlockAttrs.pathname, //
            Client.api.attr.setBlockAttrs.method,
            payload,
            config,
        );
        return response;
    }

    /* 在下级块尾部插入块 */
    public async appendBlock(
        payload: kernel.api.block.appendBlock.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.block.appendBlock.IResponse> {
        const response: kernel.api.block.appendBlock.IResponse = await this._request(
            Client.api.block.appendBlock.pathname, //
            Client.api.block.appendBlock.method,
            payload,
            config,
        );
        return response;
    }

    /* 删除块 */
    public async deleteBlock(
        payload: kernel.api.block.deleteBlock.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.block.deleteBlock.IResponse> {
        const response: kernel.api.block.deleteBlock.IResponse = await this._request(
            Client.api.block.deleteBlock.pathname, //
            Client.api.block.deleteBlock.method,
            payload,
            config,
        );
        return response;
    }

    /* 折叠块 */
    public async foldBlock(
        payload: kernel.api.block.foldBlock.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.block.foldBlock.IResponse> {
        const response: kernel.api.block.foldBlock.IResponse = await this._request(
            Client.api.block.foldBlock.pathname, //
            Client.api.block.foldBlock.method,
            payload,
            config,
        );
        return response;
    }

    /* 获得块面包屑 */
    public async getBlockBreadcrumb(
        payload: kernel.api.block.getBlockBreadcrumb.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.block.getBlockBreadcrumb.IResponse> {
        const response: kernel.api.block.getBlockBreadcrumb.IResponse = await this._request(
            Client.api.block.getBlockBreadcrumb.pathname, //
            Client.api.block.getBlockBreadcrumb.method,
            payload,
            config,
        );
        return response;
    }

    /* 获得块的 DOM */
    public async getBlockDOM(
        payload: kernel.api.block.getBlockDOM.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.block.getBlockDOM.IResponse> {
        const response: kernel.api.block.getBlockDOM.IResponse = await this._request(
            Client.api.block.getBlockDOM.pathname, //
            Client.api.block.getBlockDOM.method,
            payload,
            config,
        );
        return response;
    }

    /* 获得块所在文档的信息 */
    public async getBlockInfo(
        payload: kernel.api.block.getBlockInfo.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.block.getBlockInfo.IResponse> {
        const response: kernel.api.block.getBlockInfo.IResponse = await this._request(
            Client.api.block.getBlockInfo.pathname, //
            Client.api.block.getBlockInfo.method,
            payload,
            config,
        );
        return response;
    }

    /* 获得块的 kramdown 源码 */
    public async getBlockKramdown(
        payload: kernel.api.block.getBlockKramdown.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.block.getBlockKramdown.IResponse> {
        const response: kernel.api.block.getBlockKramdown.IResponse = await this._request(
            Client.api.block.getBlockKramdown.pathname, //
            Client.api.block.getBlockKramdown.method,
            payload,
            config,
        );
        return response;
    }

    /* 获得指定块的所有下级块 */
    public async getChildBlocks(
        payload: kernel.api.block.getChildBlocks.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.block.getChildBlocks.IResponse> {
        const response: kernel.api.block.getChildBlocks.IResponse = await this._request(
            Client.api.block.getChildBlocks.pathname, //
            Client.api.block.getChildBlocks.method,
            payload,
            config,
        );
        return response;
    }

    /* 获得指定块所在文档信息 */
    public async getDocInfo(
        payload: kernel.api.block.getDocInfo.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.block.getDocInfo.IResponse> {
        const response: kernel.api.block.getDocInfo.IResponse = await this._request(
            Client.api.block.getDocInfo.pathname, //
            Client.api.block.getDocInfo.method,
            payload,
            config,
        );
        return response;
    }

    /* 插入块 */
    public async insertBlock(
        payload: kernel.api.block.insertBlock.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.block.insertBlock.IResponse> {
        const response: kernel.api.block.insertBlock.IResponse = await this._request(
            Client.api.block.insertBlock.pathname, //
            Client.api.block.insertBlock.method,
            payload,
            config,
        );
        return response;
    }

    /* 移动块 */
    public async moveBlock(
        payload: kernel.api.block.moveBlock.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.block.moveBlock.IResponse> {
        const response: kernel.api.block.moveBlock.IResponse = await this._request(
            Client.api.block.moveBlock.pathname, //
            Client.api.block.moveBlock.method,
            payload,
            config,
        );
        return response;
    }

    /* 在下级块首部插入块 */
    public async prependBlock(
        payload: kernel.api.block.prependBlock.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.block.prependBlock.IResponse> {
        const response: kernel.api.block.prependBlock.IResponse = await this._request(
            Client.api.block.prependBlock.pathname, //
            Client.api.block.prependBlock.method,
            payload,
            config,
        );
        return response;
    }

    /* 转移块引用 */
    public async transferBlockRef(
        payload: kernel.api.block.transferBlockRef.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.block.transferBlockRef.IResponse> {
        const response: kernel.api.block.transferBlockRef.IResponse = await this._request(
            Client.api.block.transferBlockRef.pathname, //
            Client.api.block.transferBlockRef.method,
            payload,
            config,
        );
        return response;
    }

    /* 展开块 */
    public async unfoldBlock(
        payload: kernel.api.block.unfoldBlock.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.block.unfoldBlock.IResponse> {
        const response: kernel.api.block.unfoldBlock.IResponse = await this._request(
            Client.api.block.unfoldBlock.pathname, //
            Client.api.block.unfoldBlock.method,
            payload,
            config,
        );
        return response;
    }

    /* 更新块 */
    public async updateBlock(
        payload: kernel.api.block.updateBlock.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.block.updateBlock.IResponse> {
        const response: kernel.api.block.updateBlock.IResponse = await this._request(
            Client.api.block.updateBlock.pathname, //
            Client.api.block.updateBlock.method,
            payload,
            config,
        );
        return response;
    }

    /* 获取指定广播频道的信息 */
    public async getChannelInfo(
        payload: kernel.api.broadcast.getChannelInfo.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.broadcast.getChannelInfo.IResponse> {
        const response: kernel.api.broadcast.getChannelInfo.IResponse = await this._request(
            Client.api.broadcast.getChannelInfo.pathname, //
            Client.api.broadcast.getChannelInfo.method,
            payload,
            config,
        );
        return response;
    }

    /* 获取所有广播频道信息 */
    public async getChannels(config?: TempOptions): Promise<kernel.api.broadcast.getChannels.IResponse> {
        const response: kernel.api.broadcast.getChannels.IResponse = await this._request(
            Client.api.broadcast.getChannels.pathname, //
            Client.api.broadcast.getChannels.method,
            undefined,
            config,
        );
        return response;
    }

    /* 推送广播消息 */
    public async postMessage(
        payload: kernel.api.broadcast.postMessage.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.broadcast.postMessage.IResponse> {
        const response: kernel.api.broadcast.postMessage.IResponse = await this._request(
            Client.api.broadcast.postMessage.pathname, //
            Client.api.broadcast.postMessage.method,
            payload,
            config,
        );
        return response;
    }

    /* 调用 pandoc 转换转换文件 */
    public async pandoc(
        payload: kernel.api.convert.pandoc.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.convert.pandoc.IResponse> {
        const response: kernel.api.convert.pandoc.IResponse = await this._request(
            Client.api.convert.pandoc.pathname, //
            Client.api.convert.pandoc.method,
            payload,
            config,
        );
        return response;
    }

    /* 导出指定文档块为 HTML */
    public async exportHTML(
        payload: kernel.api.export.exportHTML.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.export.exportHTML.IResponse> {
        const response: kernel.api.export.exportHTML.IResponse = await this._request(
            Client.api.export.exportHTML.pathname, //
            Client.api.export.exportHTML.method,
            payload,
            config,
        );
        return response;
    }

    /* 导出指定文档块为 Markdown */
    public async exportMdContent(
        payload: kernel.api.export.exportMdContent.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.export.exportMdContent.IResponse> {
        const response: kernel.api.export.exportMdContent.IResponse = await this._request(
            Client.api.export.exportMdContent.pathname, //
            Client.api.export.exportMdContent.method,
            payload,
            config,
        );
        return response;
    }

    /* 打包文件与文件夹以导出 */
    public async exportResources(
        payload: kernel.api.export.exportResources.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.export.exportResources.IResponse> {
        const response: kernel.api.export.exportResources.IResponse = await this._request(
            Client.api.export.exportResources.pathname, //
            Client.api.export.exportResources.method,
            payload,
            config,
        );
        return response;
    }

    /* 获取文件 */
    public async getFile(
        payload: kernel.api.file.getFile.IPayload, //
        responseType: Extract<ResponseType, "arraybuffer" | "arrayBuffer">,
        config?: TempOptions,
    ): Promise<ArrayBuffer>;
    public async getFile(
        payload: kernel.api.file.getFile.IPayload, //
        responseType: Extract<ResponseType, "blob">,
        config?: TempOptions,
    ): Promise<IBlob>;
    public async getFile(
        payload: kernel.api.file.getFile.IPayload, //
        responseType: Extract<ResponseType, "document">,
        config?: TempOptions,
    ): Promise<Document>;
    public async getFile(
        payload: kernel.api.file.getFile.IPayload, //
        responseType: Extract<ResponseType, "json">,
        config?: TempOptions,
    ): Promise<object>;
    public async getFile<R = unknown>(
        payload: kernel.api.file.getFile.IPayload, //
        responseType: Extract<ResponseType, "stream">,
        config?: TempOptions,
    ): Promise<ReadableStream<R>>;
    public async getFile(
        payload: kernel.api.file.getFile.IPayload, //
        responseType: Extract<ResponseType, "text">,
        config?: TempOptions,
    ): Promise<string>;
    public async getFile(
        payload: kernel.api.file.getFile.IPayload, //
        responseType: ResponseType,
        config?: TempOptions,
    ): Promise<
        | ArrayBuffer //
        | Document
        | IBlob
        | object
        | ReadableStream
        | string
    >;

    public async getFile<R>(
        payload: kernel.api.file.getFile.IPayload, //
        responseType: ResponseType = "text",
        config?: TempOptions,
    ): Promise<R> {
        const response: R = await this._request(
            Client.api.file.getFile.pathname, //
            Client.api.file.getFile.method,
            payload,
            config,
            false,
            responseType,
        );
        return response;
    }

    /* 设置文件 */
    public async putFile(
        payload: kernel.api.file.putFile.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.file.putFile.IResponse> {
        /**
         * 若文件不是 File 类型，则转换为 File 类型
         * REF: https://developer.mozilla.org/zh-CN/docs/Web/API/File/File
         */
        if (payload.file !== undefined && !(payload.file instanceof File)) {
            payload.file = new File(
                [
                    payload.file,
                ], //
                payload.path.split("/").pop()!,
            );
        }

        // REF: https://axios-http.com/zh/docs/post_example
        const formdata = new FormData();
        for (const [
            key,
            value,
        ] of Object.entries(payload)) {
            if (value instanceof Blob) {
                formdata.append(key, value);
            }
            else {
                formdata.append(key, String(value));
            }
        }

        const response: kernel.api.file.putFile.IResponse = await this._request(
            Client.api.file.putFile.pathname, //
            Client.api.file.putFile.method,
            formdata,
            config,
        );
        return response;
    }

    /* 获取文件目录下级内容 */
    public async readDir(
        payload: kernel.api.file.readDir.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.file.readDir.IResponse> {
        const response: kernel.api.file.readDir.IResponse = await this._request(
            Client.api.file.readDir.pathname, //
            Client.api.file.readDir.method,
            payload,
            config,
        );
        return response;
    }

    /* 删除文件/目录 */
    public async removeFile(
        payload: kernel.api.file.removeFile.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.file.removeFile.IResponse> {
        const response: kernel.api.file.removeFile.IResponse = await this._request(
            Client.api.file.removeFile.pathname, //
            Client.api.file.removeFile.method,
            payload,
            config,
        );
        return response;
    }

    /* 重命名/移动文件/目录 */
    public async renameFile(
        payload: kernel.api.file.renameFile.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.file.renameFile.IResponse> {
        const response: kernel.api.file.renameFile.IResponse = await this._request(
            Client.api.file.renameFile.pathname, //
            Client.api.file.renameFile.method,
            payload,
            config,
        );
        return response;
    }

    /* 创建今天的每日笔记 (Daily Note) */
    public async createDailyNote(
        payload: kernel.api.filetree.createDailyNote.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.filetree.createDailyNote.IResponse> {
        const response: kernel.api.filetree.createDailyNote.IResponse = await this._request(
            Client.api.filetree.createDailyNote.pathname, //
            Client.api.filetree.createDailyNote.method,
            payload,
            config,
        );
        return response;
    }

    /* 通过 Markdown 创建文档 */
    public async createDocWithMd(
        payload: kernel.api.filetree.createDocWithMd.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.filetree.createDocWithMd.IResponse> {
        const response: kernel.api.filetree.createDocWithMd.IResponse = await this._request(
            Client.api.filetree.createDocWithMd.pathname, //
            Client.api.filetree.createDocWithMd.method,
            payload,
            config,
        );
        return response;
    }

    /* 获取文档内容 */
    public async getDoc(
        payload: kernel.api.filetree.getDoc.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.filetree.getDoc.IResponse> {
        const response: kernel.api.filetree.getDoc.IResponse = await this._request(
            Client.api.filetree.getDoc.pathname, //
            Client.api.filetree.getDoc.method,
            payload,
            config,
        );
        return response;
    }

    /* 根据 ID 获取人类可读路径 */
    public async getHPathByID(
        payload: kernel.api.filetree.getHPathByID.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.filetree.getHPathByID.IResponse> {
        const response: kernel.api.filetree.getHPathByID.IResponse = await this._request(
            Client.api.filetree.getHPathByID.pathname, //
            Client.api.filetree.getHPathByID.method,
            payload,
            config,
        );
        return response;
    }

    /* 根据路径获取人类可读路径 */
    public async getHPathByPath(
        payload: kernel.api.filetree.getHPathByPath.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.filetree.getHPathByPath.IResponse> {
        const response: kernel.api.filetree.getHPathByPath.IResponse = await this._request(
            Client.api.filetree.getHPathByPath.pathname, //
            Client.api.filetree.getHPathByPath.method,
            payload,
            config,
        );
        return response;
    }

    /* 根据人类可读路径获取文档 ID 列表 */
    public async getIDsByHPath(
        payload: kernel.api.filetree.getIDsByHPath.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.filetree.getIDsByHPath.IResponse> {
        const response: kernel.api.filetree.getIDsByHPath.IResponse = await this._request(
            Client.api.filetree.getIDsByHPath.pathname, //
            Client.api.filetree.getIDsByHPath.method,
            payload,
            config,
        );
        return response;
    }

    /* 查询子文档 */
    public async listDocsByPath(
        payload: kernel.api.filetree.listDocsByPath.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.filetree.listDocsByPath.IResponse> {
        const response: kernel.api.filetree.listDocsByPath.IResponse = await this._request(
            Client.api.filetree.listDocsByPath.pathname, //
            Client.api.filetree.listDocsByPath.method,
            payload,
            config,
        );
        return response;
    }

    /* 批量移动文档 */
    public async moveDocs(
        payload: kernel.api.filetree.moveDocs.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.filetree.moveDocs.IResponse> {
        const response: kernel.api.filetree.moveDocs.IResponse = await this._request(
            Client.api.filetree.moveDocs.pathname, //
            Client.api.filetree.moveDocs.method,
            payload,
            config,
        );
        return response;
    }

    /* 删除文档 */
    public async removeDoc(
        payload: kernel.api.filetree.removeDoc.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.filetree.removeDoc.IResponse> {
        const response: kernel.api.filetree.removeDoc.IResponse = await this._request(
            Client.api.filetree.removeDoc.pathname, //
            Client.api.filetree.removeDoc.method,
            payload,
            config,
        );
        return response;
    }

    /* 文档重命名 */
    public async renameDoc(
        payload: kernel.api.filetree.renameDoc.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.filetree.renameDoc.IResponse> {
        const response: kernel.api.filetree.renameDoc.IResponse = await this._request(
            Client.api.filetree.renameDoc.pathname, //
            Client.api.filetree.renameDoc.method,
            payload,
            config,
        );
        return response;
    }

    /* 搜索文档 */
    public async searchDocs(
        payload: kernel.api.filetree.searchDocs.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.filetree.searchDocs.IResponse> {
        const response: kernel.api.filetree.searchDocs.IResponse = await this._request(
            Client.api.filetree.searchDocs.pathname, //
            Client.api.filetree.searchDocs.method,
            payload,
            config,
        );
        return response;
    }

    /* 获取历史文档内容 */
    public async getDocHistoryContent(
        payload: kernel.api.history.getDocHistoryContent.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.history.getDocHistoryContent.IResponse> {
        const response: kernel.api.history.getDocHistoryContent.IResponse = await this._request(
            Client.api.history.getDocHistoryContent.pathname, //
            Client.api.history.getDocHistoryContent.method,
            payload,
            config,
        );
        return response;
    }

    /* 查询历史项 */
    public async getHistoryItems(
        payload: kernel.api.history.getHistoryItems.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.history.getHistoryItems.IResponse> {
        const response: kernel.api.history.getHistoryItems.IResponse = await this._request(
            Client.api.history.getHistoryItems.pathname, //
            Client.api.history.getHistoryItems.method,
            payload,
            config,
        );
        return response;
    }

    /* 收集箱速记内容 */
    public async getShorthand(
        payload: kernel.api.inbox.getShorthand.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.inbox.getShorthand.IResponse> {
        const response: kernel.api.inbox.getShorthand.IResponse = await this._request(
            Client.api.inbox.getShorthand.pathname, //
            Client.api.inbox.getShorthand.method,
            payload,
            config,
        );
        return response;
    }

    /* 回显请求内容 */
    public async echo(
        payload?: kernel.api.network.echo.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.network.echo.IResponse> {
        if (payload) {
            config ??= {
                type: this._type,
            };
            switch (config?.type) {
                case "fetch": {
                    const options: ofetch.FetchOptions = {};
                    if (payload.headers) {
                        options.headers = payload.headers;
                    }
                    if (payload.query) {
                        options.query = Client.entries2record(payload.query.entries());
                    }
                    if (config.options) {
                        Object.assign(options, config.options);
                    }
                    else {
                        config.options = options;
                    }
                    break;
                }
                case "xhr": {
                    const options: axios.AxiosRequestConfig = {};
                    if (payload.headers) {
                        options.headers = Array.isArray(payload.headers) ? Client.entries2record(payload.headers) : payload.headers instanceof Headers ? Client.headers2record(payload.headers) : payload.headers;
                    }
                    if (payload.query) {
                        options.params = payload.query;
                    }
                    if (config.options) {
                        Object.assign(options, config.options);
                    }
                    else {
                        config.options = options;
                    }
                    break;
                }
            }
        }

        const response: kernel.api.network.echo.IResponse = await this._request(
            Client.api.network.echo.pathname, //
            payload?.method ?? Client.api.network.echo.method,
            payload?.body,
            config,
        );
        return response;
    }

    /* 正向代理 */
    public async forwardProxy(
        payload: kernel.api.network.forwardProxy.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.network.forwardProxy.IResponse> {
        const response: kernel.api.network.forwardProxy.IResponse = await this._request(
            Client.api.network.forwardProxy.pathname, //
            Client.api.network.forwardProxy.method,
            payload,
            config,
        );
        return response;
    }

    /* 关闭笔记本 */
    public async closeNotebook(
        payload: kernel.api.notebook.closeNotebook.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.notebook.closeNotebook.IResponse> {
        const response: kernel.api.notebook.closeNotebook.IResponse = await this._request(
            Client.api.notebook.closeNotebook.pathname, //
            Client.api.notebook.closeNotebook.method,
            payload,
            config,
        );
        return response;
    }

    /* 创建笔记本 */
    public async createNotebook(
        payload: kernel.api.notebook.createNotebook.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.notebook.createNotebook.IResponse> {
        const response: kernel.api.notebook.createNotebook.IResponse = await this._request(
            Client.api.notebook.createNotebook.pathname, //
            Client.api.notebook.createNotebook.method,
            payload,
            config,
        );
        return response;
    }

    /* 获取笔记本配置信息 */
    public async getNotebookConf(
        payload: kernel.api.notebook.getNotebookConf.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.notebook.getNotebookConf.IResponse> {
        const response: kernel.api.notebook.getNotebookConf.IResponse = await this._request(
            Client.api.notebook.getNotebookConf.pathname, //
            Client.api.notebook.getNotebookConf.method,
            payload,
            config,
        );
        return response;
    }

    /* 列出笔记本信息 */
    public async lsNotebooks(config?: TempOptions): Promise<kernel.api.notebook.lsNotebooks.IResponse> {
        const response: kernel.api.notebook.lsNotebooks.IResponse = await this._request(
            Client.api.notebook.lsNotebooks.pathname, //
            Client.api.notebook.lsNotebooks.method,
            undefined,
            config,
        );
        return response;
    }

    /* 打开笔记本 */
    public async openNotebook(
        payload: kernel.api.notebook.openNotebook.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.notebook.openNotebook.IResponse> {
        const response: kernel.api.notebook.openNotebook.IResponse = await this._request(
            Client.api.notebook.openNotebook.pathname, //
            Client.api.notebook.openNotebook.method,
            payload,
            config,
        );
        return response;
    }

    /* 删除笔记本 */
    public async removeNotebook(
        payload: kernel.api.notebook.removeNotebook.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.notebook.removeNotebook.IResponse> {
        const response: kernel.api.notebook.removeNotebook.IResponse = await this._request(
            Client.api.notebook.removeNotebook.pathname, //
            Client.api.notebook.removeNotebook.method,
            payload,
            config,
        );
        return response;
    }

    /* 重命名笔记本 */
    public async renameNotebook(
        payload: kernel.api.notebook.renameNotebook.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.notebook.renameNotebook.IResponse> {
        const response: kernel.api.notebook.renameNotebook.IResponse = await this._request(
            Client.api.notebook.renameNotebook.pathname, //
            Client.api.notebook.renameNotebook.method,
            payload,
            config,
        );
        return response;
    }

    /* 设置笔记本配置 */
    public async setNotebookConf(
        payload: kernel.api.notebook.setNotebookConf.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.notebook.setNotebookConf.IResponse> {
        const response: kernel.api.notebook.setNotebookConf.IResponse = await this._request(
            Client.api.notebook.setNotebookConf.pathname, //
            Client.api.notebook.setNotebookConf.method,
            payload,
            config,
        );
        return response;
    }

    /* 推送错误消息 */
    public async pushErrMsg(
        payload: kernel.api.notification.pushErrMsg.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.notification.pushErrMsg.IResponse> {
        const response: kernel.api.notification.pushErrMsg.IResponse = await this._request(
            Client.api.notification.pushErrMsg.pathname, //
            Client.api.notification.pushErrMsg.method,
            payload,
            config,
        );
        return response;
    }

    /* 推送提示消息 */
    public async pushMsg(
        payload: kernel.api.notification.pushMsg.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.notification.pushMsg.IResponse> {
        const response: kernel.api.notification.pushMsg.IResponse = await this._request(
            Client.api.notification.pushMsg.pathname, //
            Client.api.notification.pushMsg.method,
            payload,
            config,
        );
        return response;
    }

    /* 获取文档大纲 */
    public async getDocOutline(
        payload: kernel.api.outline.getDocOutline.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.outline.getDocOutline.IResponse> {
        const response: kernel.api.outline.getDocOutline.IResponse = await this._request(
            Client.api.outline.getDocOutline.pathname, //
            Client.api.outline.getDocOutline.method,
            payload,
            config,
        );
        return response;
    }

    /* SQL 查询 */
    public async sql(
        payload: kernel.api.query.sql.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.query.sql.IResponse> {
        const response: kernel.api.query.sql.IResponse = await this._request(
            Client.api.query.sql.pathname, //
            Client.api.query.sql.method,
            payload,
            config,
        );
        return response;
    }

    /* 读取快照文件内容 */
    public async openRepoSnapshotDoc(
        payload: kernel.api.repo.openRepoSnapshotDoc.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.repo.openRepoSnapshotDoc.IResponse> {
        const response: kernel.api.repo.openRepoSnapshotDoc.IResponse = await this._request(
            Client.api.repo.openRepoSnapshotDoc.pathname, //
            Client.api.repo.openRepoSnapshotDoc.method,
            payload,
            config,
        );
        return response;
    }

    /* 全局搜索 */
    public async fullTextSearchBlock(
        payload: kernel.api.search.fullTextSearchBlock.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.search.fullTextSearchBlock.IResponse> {
        const response: kernel.api.search.fullTextSearchBlock.IResponse = await this._request(
            Client.api.search.fullTextSearchBlock.pathname, //
            Client.api.search.fullTextSearchBlock.method,
            payload,
            config,
        );
        return response;
    }

    /* 获取代码片段 */
    public async getSnippet(
        payload: kernel.api.snippet.getSnippet.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.snippet.getSnippet.IResponse> {
        const response: kernel.api.snippet.getSnippet.IResponse = await this._request(
            Client.api.snippet.getSnippet.pathname, //
            Client.api.snippet.getSnippet.method,
            payload,
            config,
        );
        return response;
    }

    /* 设置代码片段 */
    public async setSnippet(
        payload: kernel.api.snippet.setSnippet.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.snippet.setSnippet.IResponse> {
        const response: kernel.api.snippet.setSnippet.IResponse = await this._request(
            Client.api.snippet.setSnippet.pathname, //
            Client.api.snippet.setSnippet.method,
            payload,
            config,
        );
        return response;
    }

    /* 等待业务数据持久化完成 */
    public async flushTransaction(config?: TempOptions): Promise<kernel.api.sqlite.flushTransaction.IResponse> {
        const response: kernel.api.sqlite.flushTransaction.IResponse = await this._request(
            Client.api.sqlite.flushTransaction.pathname, //
            Client.api.sqlite.flushTransaction.method,
            config,
        );
        return response;
    }

    /* 获取所有本地存储的数据 */
    public async getLocalStorage(config?: TempOptions): Promise<kernel.api.storage.getLocalStorage.IResponse> {
        const response: kernel.api.storage.getLocalStorage.IResponse = await this._request(
            Client.api.storage.getLocalStorage.pathname, //
            Client.api.storage.getLocalStorage.method,
            undefined,
            config,
        );
        return response;
    }

    /* 查询最近打开的文档 */
    public async getRecentDocs(config?: TempOptions): Promise<kernel.api.storage.getRecentDocs.IResponse> {
        const response: kernel.api.storage.getRecentDocs.IResponse = await this._request(
            Client.api.storage.getRecentDocs.pathname, //
            Client.api.storage.getRecentDocs.method,
            undefined,
            config,
        );
        return response;
    }

    /* 持久化本地存储 */
    public async setLocalStorage(
        payload: kernel.api.storage.setLocalStorage.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.storage.setLocalStorage.IResponse> {
        const response: kernel.api.storage.setLocalStorage.IResponse = await this._request(
            Client.api.storage.setLocalStorage.pathname, //
            Client.api.storage.setLocalStorage.method,
            payload,
            config,
        );
        return response;
    }

    /* 持久化一项本地存储 */
    public async setLocalStorageVal(
        payload: kernel.api.storage.setLocalStorageVal.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.storage.setLocalStorageVal.IResponse> {
        const response: kernel.api.storage.setLocalStorageVal.IResponse = await this._request(
            Client.api.storage.setLocalStorageVal.pathname, //
            Client.api.storage.setLocalStorageVal.method,
            payload,
            config,
        );
        return response;
    }

    /* 获取内核启动进度 */
    public async bootProgress(config?: TempOptions): Promise<kernel.api.system.bootProgress.IResponse> {
        const response: kernel.api.system.bootProgress.IResponse = await this._request(
            Client.api.system.bootProgress.pathname, //
            Client.api.system.bootProgress.method,
            undefined,
            config,
        );
        return response;
    }

    /* 获得内核 Unix 时间戳 (单位: ms) */
    public async currentTime(config?: TempOptions): Promise<kernel.api.system.currentTime.IResponse> {
        const response: kernel.api.system.currentTime.IResponse = await this._request(
            Client.api.system.currentTime.pathname, //
            Client.api.system.currentTime.method,
            undefined,
            config,
        );
        return response;
    }

    /* 退出内核 */
    public async exit(
        payload: kernel.api.system.exit.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.system.exit.IResponse> {
        const response: kernel.api.system.exit.IResponse = await this._request(
            Client.api.system.exit.pathname, //
            Client.api.system.exit.method,
            payload,
            config,
        );
        return response;
    }

    /* 获得配置 */
    public async getConf(config?: TempOptions): Promise<kernel.api.system.getConf.IResponse> {
        const response: kernel.api.system.getConf.IResponse = await this._request(
            Client.api.system.getConf.pathname, //
            Client.api.system.getConf.method,
            undefined,
            config,
        );
        return response;
    }

    /* 注销登录状态 */
    public async logoutAuth(config?: TempOptions): Promise<kernel.api.system.logoutAuth.IResponse> {
        const response: kernel.api.system.logoutAuth.IResponse = await this._request(
            Client.api.system.logoutAuth.pathname, //
            Client.api.system.logoutAuth.method,
            undefined,
            config,
        );
        return response;
    }

    /* 获得内核版本 */
    public async version(config?: TempOptions): Promise<kernel.api.system.version.IResponse> {
        const response: kernel.api.system.version.IResponse = await this._request(
            Client.api.system.version.pathname, //
            Client.api.system.version.method,
            undefined,
            config,
        );
        return response;
    }

    /* 渲染 kramdown 模板文件 */
    public async render(
        payload: kernel.api.template.render.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.template.render.IResponse> {
        const response: kernel.api.template.render.IResponse = await this._request(
            Client.api.template.render.pathname, //
            Client.api.template.render.method,
            payload,
            config,
        );
        return response;
    }

    /* 渲染 Sprig 模板 */
    public async renderSprig(
        payload: kernel.api.template.renderSprig.IPayload, //
        config?: TempOptions,
    ): Promise<kernel.api.template.renderSprig.IResponse> {
        const response: kernel.api.template.renderSprig.IResponse = await this._request(
            Client.api.template.renderSprig.pathname, //
            Client.api.template.renderSprig.method,
            payload,
            config,
        );
        return response;
    }

    public async _request<
        R,
        P extends kernel.kernel.IPayload,
    >(
        pathname: string, //
        method: string,
        payload?: P,
        config?: TempOptions,
        normal?: true,
        responseType?: "json",
    ): Promise<R>;
    public async _request<
        R,
        P extends kernel.kernel.IPayload,
    >(
        pathname: string, //
        method: string,
        payload?: P,
        config?: TempOptions,
        normal?: boolean,
        responseType?: ResponseType,
    ): Promise<R>;
    public async _request<
        R,
        P extends kernel.kernel.IPayload,
    >(
        pathname: string, //
        method: string,
        payload?: P,
        config?: TempOptions,
        normal: boolean = true,
        responseType: ResponseType = "json",
    ): Promise<R> {
        switch (config?.type ?? this._type) {
            case "fetch": {
                const options = config?.options as FetchOptions | undefined;
                responseType = (() => {
                    switch (responseType) {
                        case "arraybuffer":
                            return "arrayBuffer";
                        case "document":
                            return "text";
                        default:
                            return responseType;
                    }
                })() as FetchResponseType;
                const response = await this._fetch<
                    R, //
                    FetchResponseType
                >(
                    pathname, //
                    {
                        method,
                        body: payload,
                        responseType,
                        onResponse: (context) => {
                            switch (context.response.status as axios.HttpStatusCode) {
                                case axios.HttpStatusCode.Ok:
                                    switch (responseType) {
                                        case "blob":
                                            (context.response._data as IBlob).contentType = context.response.headers.get("content-type");
                                            break;
                                        default:
                                            break;
                                    }
                                    break;

                                case axios.HttpStatusCode.Accepted:
                                    /* api/file/getFile */
                                    if (pathname === Client.api.file.getFile.pathname) {
                                        this._parseFetchResponse(context.response._data);
                                    }
                                    break;

                                default:
                                    break;
                            }
                        },
                        ...options,
                    },
                );
                if (
                    normal //
                    && responseType === "json"
                    && typeof response === "object"
                ) {
                    return this._parseFetchResponse(response as kernel.kernel.IResponse) as R;
                }
                else {
                    return response as R;
                }
            }
            case "xhr":
            default: {
                const options = config?.options as TempAxiosOptions | undefined;
                responseType = (() => {
                    switch (responseType) {
                        case "arrayBuffer":
                            return "arraybuffer";
                        default:
                            return responseType;
                    }
                })();
                const response = await this._axios.request<R>({
                    url: pathname,
                    method,
                    data: payload,
                    responseType,
                    ...options,
                });
                switch (response.status as axios.HttpStatusCode) {
                    case axios.HttpStatusCode.Ok:
                        if (normal && responseType === "json" && typeof response.data === "object") {
                            return this._parseAxiosResponse(response as axios.AxiosResponse<kernel.kernel.IResponse>) as R;
                        }
                        else {
                            switch (responseType) {
                                case "blob":
                                    if ("content-type" in response.headers) {
                                        (response.data as IBlob).contentType = response.headers["content-type"] as string;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            return response.data;
                        }

                    case axios.HttpStatusCode.Accepted:
                        /* api/file/getFile */
                        if (pathname === Client.api.file.getFile.pathname) {
                            return this._parseAxiosResponse(response as axios.AxiosResponse<kernel.kernel.IResponse>) as R;
                        }
                        else {
                            return response.data;
                        }

                    default: {
                        const error = new HTTPError(response);
                        throw error;
                    }
                }
            }
        }
    }

    /**
     * 解析内核响应
     */
    protected _parseFetchResponse<T extends kernel.kernel.IResponse>(response: T): T {
        if (response.code === 0) {
            // 内核正常响应
            return response;
        }
        else {
            // 内核异常响应
            const error = new KernelError(response);
            throw error;
        }
    }

    /**
     * 解析内核响应
     */
    protected _parseAxiosResponse<T extends kernel.kernel.IResponse>(response: axios.AxiosResponse<T>): T {
        if (response.data.code === 0) {
            // 内核正常响应
            return response.data;
        }
        else {
            // 内核异常响应
            const error = new KernelError(response.data, response);
            throw error;
        }
    }
}

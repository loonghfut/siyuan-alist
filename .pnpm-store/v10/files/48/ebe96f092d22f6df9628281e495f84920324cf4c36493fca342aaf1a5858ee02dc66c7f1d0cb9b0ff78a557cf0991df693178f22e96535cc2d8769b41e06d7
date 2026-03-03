/**
 * Copyright (C) 2023 SiYuan Community
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

import path from "path-browserify";

import { errors } from "@/fs/error";
import { //
    KernelError,
} from "@/index";

import { SiyuanFileSystemFileHandle } from "./SiyuanFileSystemFileHandle";
import { SiyuanFileSystemHandle } from "./SiyuanFileSystemHandle";

import type {
    Client,
    types,
} from "@/index";

export type TEntry = types.kernel.api.file.readDir.IDatum;
export type THandle = SiyuanFileSystemDirectoryHandle | SiyuanFileSystemFileHandle;
export interface IEntries {
    Initialized: boolean;
    readonly list: TEntry[];
    readonly files: Map<string, TEntry>;
    readonly directories: Map<string, TEntry>;
}

export class SiyuanFileSystemDirectoryHandle extends SiyuanFileSystemHandle implements FileSystemDirectoryHandle {
    public override readonly kind = "directory";

    protected readonly _entries: IEntries = {
        Initialized: false,
        list: [],
        files: new Map(),
        directories: new Map(),
    };

    constructor(
        name: string, // 节点名

        root: string, // 工作空间根目录
        path: string, // 节点完整路径
        directory: string, // 节点目录完整路径
        relativePath: string, // 节点相对路径
        relativeDirectory: string, // 节点目录相对路径
        isSymlink: boolean, // 是否为软连接
        lastModified: number, // 最后修改时间

        _client: InstanceType<typeof Client>,
    ) {
        super(
            "directory",
            name,

            root,
            path,
            directory,
            relativePath,
            relativeDirectory,

            isSymlink,
            lastModified,

            _client,
        );
    }

    public async init(): Promise<void> {
        const response = await this._client.readDir({
            path: this.relativePath,
        });
        this._entries.list.length = 0;
        this._entries.files.clear();
        this._entries.directories.clear();

        this._entries.Initialized = true;
        this._entries.list.push(...response.data);
        response.data.forEach((entry) => {
            if (entry.isDir) {
                this._entries.directories.set(entry.name, entry);
            }
            else {
                this._entries.files.set(entry.name, entry);
            }
        });
    }

    public async ls(refresh: boolean = false): Promise<IEntries> {
        if (refresh || !this._entries.Initialized) {
            try {
                await this.init();
            }
            catch (error) {
                switch (true) {
                    case error instanceof KernelError:
                        throw new DOMException(...errors.NOT_FOUND(this.relativePath));

                    default:
                        throw error;
                }
            }
        }
        return this._entries;
    }

    public get length(): number {
        if (this._entries.Initialized) {
            return this._entries.list.length;
        }
        else {
            throw new DOMException(...errors.INVALID_STATE);
        }
    }

    *[Symbol.iterator](): IterableIterator<[string, THandle]> {
        if (this._entries.Initialized) {
            for (const entry of this._entries.list) {
                yield [
                    entry.name,
                    this._entry2handle(entry),
                ];
            }
        }
        else {
            throw new DOMException(...errors.INVALID_STATE);
        }
    }

    async *entries(): AsyncGenerator<[string, THandle]> {
        await this.ls();
        for (const entry of this._entries.list) {
            yield [
                entry.name,
                this._entry2handle(entry),
            ];
        }
    }

    async *keys(): AsyncGenerator<string> {
        await this.ls();
        for (const entry of this._entries.list) {
            yield entry.name;
        }
    }

    async *values(): AsyncGenerator<THandle> {
        await this.ls();
        for (const entry of this._entries.list) {
            yield this._entry2handle(entry);
        }
    }

    /**
     * 获取指定下级目录节点
     * @see
     * {@link https://fs.spec.whatwg.org/#api-filesystemdirectoryhandle-getdirectoryhandle}
     */
    async getDirectoryHandle(name: string, options?: FileSystemGetDirectoryOptions): Promise<SiyuanFileSystemDirectoryHandle> {
        await this.ls();
        const entry: TEntry | undefined = this._entries.directories.get(name);
        if (entry) {
            const handle = this._entry2handle(entry) as SiyuanFileSystemDirectoryHandle;
            return handle;
        }
        else {
            const relative_path = path.join(this.relativePath, name);
            if (options?.create) {
                await this._client.putFile({
                    isDir: true,
                    path: relative_path,
                });
                await this.init();
                return this.getDirectoryHandle(name);
            }
            else {
                throw new DOMException(...errors.NOT_FOUND(relative_path));
            }
        }
    }

    /**
     * 获取指定下级文件节点
     * @see
     * {@link https://fs.spec.whatwg.org/#api-filesystemdirectoryhandle-getfilehandle}
     */
    async getFileHandle(name: string, options?: FileSystemGetFileOptions): Promise<SiyuanFileSystemFileHandle> {
        await this.ls();
        const entry: TEntry | undefined = this._entries.files.get(name);
        if (entry) {
            const handle = this._entry2handle(entry) as SiyuanFileSystemFileHandle;
            return handle;
        }
        else {
            const relative_path = path.join(this.relativePath, name);
            if (options?.create) {
                await this._client.putFile({
                    path: relative_path,
                    file: new File([], name, { lastModified: new Date().getTime() }),
                });
                await this.init();
                return this.getFileHandle(name);
            }
            else {
                throw new DOMException(...errors.NOT_FOUND(relative_path));
            }
        }
    }

    /**
     * 移除指定下级节点
     * @see
     * {@link https://fs.spec.whatwg.org/#api-filesystemdirectoryhandle-removeentry}
     */
    async removeEntry(name: string, options?: FileSystemRemoveOptions): Promise<void> {
        await this.ls();
        const relative_path = path.join(this.relativePath, name);
        const entry: TEntry | undefined = this._entries.files.get(name) ?? this._entries.directories.get(name);

        if (entry) {
            if (entry.isDir && !options?.recursive) {
                // 非递归删除一个目录
                const handle = this._entry2handle(entry) as SiyuanFileSystemDirectoryHandle;
                await handle.ls();
                if (handle.length > 0) {
                    // 目录非空
                    throw new DOMException(...errors.INVALID_MODIFICATION(relative_path));
                }
            }

            await this._client.removeFile({
                path: relative_path,
            });
            await this.init();
        }
        else {
            throw new DOMException(...errors.NOT_FOUND(relative_path));
        }
    }

    /**
     * 解析以获取相对路径
     * @see
     * {@link https://fs.spec.whatwg.org/#api-filesystemdirectoryhandle-resolve}
     */
    async resolve(possibleDescendant: SiyuanFileSystemHandle): Promise<null | string[]> {
        switch (true) {
            case this.path === possibleDescendant.path:
                return Promise.resolve([]);
            case possibleDescendant.path.startsWith(this.path):
                return Promise.resolve(path.relative(this.relativePath, possibleDescendant.relativePath).split(path.sep));
            default:
                return Promise.resolve(null);
        }
    }

    protected _entry2handle(entry: TEntry): THandle {
        const options = [
            entry.name,
            this.root,
            path.join(this.path, entry.name),
            this.path,
            path.join(this.relativePath, entry.name),
            this.relativePath,
            entry.isSymlink,
            entry.updated * 1_000,
            this._client,
        ] as const;
        return entry.isDir ? new SiyuanFileSystemDirectoryHandle(...options) : new SiyuanFileSystemFileHandle(...options);
    }
}

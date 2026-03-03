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

import { KernelError } from "~/src/errors";

import { errors } from "@/fs/error";

import { SiyuanFileSystemHandle } from "./SiyuanFileSystemHandle";
import { SiyuanFileSystemWritableFileStream } from "./SiyuanFileSystemWritableFileStream";

import type { Client } from "@/index";

/**
 * @see {@link https://fs.spec.whatwg.org/#api-filesystemfilehandle}
 */
export class SiyuanFileSystemFileHandle //
    extends SiyuanFileSystemHandle
    implements FileSystemFileHandle {
    public override readonly kind = "file";

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
            "file",
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

    /**
     * 返回对应的文件
     * @see
     * {@link https://fs.spec.whatwg.org/#api-filesystemfilehandle-getfile}
     */
    async getFile(): Promise<File> {
        try {
            const blob = await this._client.getFile(
                { path: this.relativePath }, //
                "blob",
            );
            const file = new File(
                [
                    blob,
                ], //
                this.name,
                {
                    lastModified: this.lastModified * 1_000,
                },
            );
            return file;
        }
        catch (error) {
            if (error instanceof KernelError) {
                switch (error.code) {
                    case 404:
                        throw new DOMException(`file [${this.relativePath}] not found`, "NotFoundError");
                    case 405:
                        throw new TypeError(error.message);
                    default:
                        break;
                }
            }
            throw error;
        }
    }

    /**
     * 创建一个可写文件流
     * @see
     * {@link https://fs.spec.whatwg.org/#api-filesystemfilehandle-createwritable}
     */
    async createWritable(options?: FileSystemCreateWritableOptions): Promise<SiyuanFileSystemWritableFileStream> {
        const file = options?.keepExistingData //
            ? await this.getFile()
            : new File([], this.name, { lastModified: this.lastModified * 1_000 });
        return new SiyuanFileSystemWritableFileStream(
            // eslint-disable-next-line ts/no-use-before-define
            new Sink(
                file, //
                this.relativePath,
                this._client,
            ),
        );
    }
}

/**
 * REF: https://github.com/jimmywarting/native-file-system-adapter/blob/master/src/adapters/memory.js
 */
export class Sink implements UnderlyingSink<FileSystemWriteChunkType> {
    protected size: number;
    protected position: number;
    constructor(
        protected file: File,
        protected readonly relativePath: string,
        protected readonly _client: InstanceType<typeof Client>,
    ) {
        this.size = file.size;
        this.position = 0;
    }

    async close(): Promise<void> {
        await this._client.putFile({
            path: this.relativePath,
            file: this.file,
        });
    }

    write(
        chunk: FileSystemWriteChunkType, //
        _controller: WritableStreamDefaultController,
    ): PromiseLike<void> | void {
        if (typeof chunk === "object" && "type" in chunk) {
            switch (chunk.type) {
                case "write": {
                    if ("position" in chunk && Number.isInteger(chunk.position) && chunk.position && chunk.position >= 0) {
                        this.position = chunk.position;
                        if (this.size < chunk.position) {
                            this.file = new File(
                                [
                                    this.file,
                                    new ArrayBuffer(chunk.position - this.size),
                                ],
                                this.file.name,
                                this.file,
                            );
                        }
                    }
                    if ("data" in chunk) {
                        chunk = chunk.data as BlobPart;
                    }
                    else {
                        throw new DOMException(...errors.SYNTAX("write requires a data argument"));
                    }
                    break;
                }
                case "seek": {
                    if ("position" in chunk && Number.isInteger(chunk.position) && chunk.position && chunk.position >= 0) {
                        if (this.size < chunk.position) {
                            throw new DOMException(...errors.INVALID);
                        }
                        this.position = chunk.position;
                        return;
                    }
                    else {
                        throw new DOMException(...errors.SYNTAX("seek requires a position argument"));
                    }
                }
                case "truncate": {
                    if (Number.isInteger(chunk.size) && chunk.size && chunk.size >= 0) {
                        this.file
                            = chunk.size < this.size
                                ? new File(
                                    [
                                        this.file.slice(0, chunk.size),
                                    ],
                                    this.file.name,
                                    this.file,
                                )
                                : new File(
                                    [
                                        this.file,
                                        new Uint8Array(chunk.size - this.size),
                                    ],
                                    this.file.name,
                                );

                        this.size = this.file.size;
                        if (this.position > this.file.size) {
                            this.position = this.file.size;
                        }
                        return;
                    }
                    else {
                        throw new DOMException(...errors.SYNTAX("truncate requires a size argument"));
                    }
                }
            }
        }

        chunk = new Blob([
            chunk as BlobPart,
        ]);

        // Calc the head and tail fragments
        const head = this.file.slice(0, this.position);
        const tail = this.file.slice(this.position + chunk.size);

        // Calc the padding
        let padding = this.position - head.size;
        if (padding < 0) {
            padding = 0;
        }
        this.file = new File(
            [
                head,
                new Uint8Array(padding),
                chunk,
                tail,
            ],
            this.file.name,
            this.file,
        );

        this.size = this.file.size;
        this.position += chunk.size;
    }
}

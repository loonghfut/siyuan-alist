import path from "path-browserify";

import { SiyuanFileSystemDirectoryHandle } from "./handle/SiyuanFileSystemDirectoryHandle";

import type { Client } from "@/index";

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

export * from "./handle";

/**
 * 思源文件系统
 * @see
 * {@link https://fs.spec.whatwg.org/#sandboxed-filesystem | Accessing the Bucket File System}
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/StorageManager | StorageManager - Web APIs - MDN}
 */
export class SiyuanFileSystem implements Pick<StorageManager, "getDirectory"> {
    constructor(
        public readonly root: string,

        protected readonly _client: InstanceType<typeof Client>,
    ) {}

    async getDirectory(): Promise<SiyuanFileSystemDirectoryHandle> {
        const info = path.parse(this.root);
        return Promise.resolve(
            new SiyuanFileSystemDirectoryHandle(
                info.base,

                this.root,
                this.root,
                info.dir,
                ".",
                "..",
                false,
                new Date().getTime(),

                this._client,
            ),
        );
    }
}

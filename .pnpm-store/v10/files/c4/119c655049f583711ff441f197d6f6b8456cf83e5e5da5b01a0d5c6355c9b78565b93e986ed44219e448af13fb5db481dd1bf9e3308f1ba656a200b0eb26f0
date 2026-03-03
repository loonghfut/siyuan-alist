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

import type { Client } from "@/index";

/**
 * @see {@link https://fs.spec.whatwg.org/#api-filesystemhandle}
 */
export class SiyuanFileSystemHandle implements FileSystemHandle {
    /**
     * @param kind - 资源类型 {@link https://fs.spec.whatwg.org/#dom-filesystemhandle-kind}
     * @param name - 资源名称 {@link https://fs.spec.whatwg.org/#dom-filesystemhandle-name}
     * @param root - 工作空间根目录
     * @param path - 资源完整路径
     * @param directory - 资源所在目录完整路径
     * @param relativePath - 资源相对路径
     * @param relativeDirectory - 目录相对路径
     * @param isSymlink - 是否为软连接
     * @param lastModified - 最后修改时间
     * @param _client - 客户端实例
     */
    constructor(
        readonly kind: FileSystemHandleKind,
        readonly name: string,

        public readonly root: string,
        public readonly path: string,
        public readonly directory: string,
        public readonly relativePath: string,
        public readonly relativeDirectory: string,
        public readonly isSymlink: boolean,
        public readonly lastModified: number,

        protected readonly _client: InstanceType<typeof Client>,
    ) {}

    /**
     * 判断节点是否为同一节点
     * @see {@link https://fs.spec.whatwg.org/#api-filesystemhandle-issameentry}
     * @param other - 另一个节点
     * @returns 是否为同一节点
     */
    public isSameEntry(other: SiyuanFileSystemHandle): Promise<boolean> {
        return Promise.resolve(this.path === other.path);
    }
}

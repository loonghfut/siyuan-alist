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

/**
 * put file under the workspace directory
 */
export type IPayload = IDirectory | IFile;

export interface IDirectory {
    /**
     * the file path under the workspace path
     */
    path: string;
    /**
     * whether to create a folder, when true only create a folder, ignore file
     */
    isDir: true;
    /**
     * the uploaded file
     */
    file?: BlobPart | File;
    /**
     * last access and modification time, Unix time (ms)
     */
    modTime?: number;
}

export interface IFile {
    /**
     * the file path under the workspace path
     */
    path: string;
    /**
     * the uploaded file
     */
    file: BlobPart | File;
    /**
     * whether to create a folder, when true only create a folder, ignore file
     */
    isDir?: false;
    /**
     * last access and modification time, Unix time (ms)
     */
    modTime?: number;
}

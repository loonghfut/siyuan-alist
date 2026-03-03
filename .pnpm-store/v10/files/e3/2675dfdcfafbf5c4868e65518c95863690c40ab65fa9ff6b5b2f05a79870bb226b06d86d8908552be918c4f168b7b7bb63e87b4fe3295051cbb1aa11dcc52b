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

// #region content
/**
 * Upload assets
 */
export interface IPayload {
    /**
     * Block ID
     *
     * If set, the assets folder in the document directory where the block is located will be used
     */
    id?: string;

    /**
     * The folder path where assets are stored with the data folder as the root path
     * @defaultValue "assets"
     *
     * @example "assets": workspace/data/assets/
     * @example "assets/": workspace/data/assets/
     * @example "/assets": workspace/data/assets/
     * @example "/assets/": workspace/data/assets/
     *
     * @example "assets/sub": workspace/data/assets/sub/
     * @example "assets/sub/": workspace/data/assets/sub/
     * @example "/assets/sub": workspace/data/assets/sub/
     * @example "/assets/sub/": workspace/data/assets/sub/
     */
    assetsDirPath?: string;

    /**
     * If skip the file if it already exists
     * @defaultValue false
     */
    skipIfDuplicated?: boolean;

    /**
     * Uploaded file list
     */
    files: File[];
}

// #endregion content

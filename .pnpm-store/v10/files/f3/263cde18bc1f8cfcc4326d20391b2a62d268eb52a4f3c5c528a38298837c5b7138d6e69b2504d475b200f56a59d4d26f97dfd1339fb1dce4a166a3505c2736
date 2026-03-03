// Copyright (C) 2023 SiYuan Community
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// #region content

/**
 * list the contents of the specified file directory
 */
export interface IResponse {
    /**
     * status code
     */
    readonly code: number;
    readonly data: IDatum[];
    /**
     * status message
     */
    readonly msg: string;
}

/**
 * response data
 *
 * file or directory
 */
export interface IDatum {
    /**
     * whether the item is a directory
     */
    readonly isDir: boolean;
    /**
     * whether the item is a symbolic link
     */
    readonly isSymlink: boolean;
    /**
     * file/directory name
     */
    readonly name: string;
    /**
     * file/directory last modified time (Unix timestamp, seconds)
     */
    readonly updated: number;
}

// #endregion content

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
 * Get child blocks
 */
export interface IResponse {
    /**
     * status code
     */
    readonly code: number;
    readonly data: IBlock[];
    /**
     * status message
     */
    readonly msg: string;
}

/**
 * sub block list
 *
 * sub block
 */
export interface IBlock {
    /**
     * block ID
     */
    readonly id: string;
    /**
     * block subtype
     */
    readonly subType?: TBlockSubType;
    /**
     * block type
     */
    readonly type: TBlockType;
}

/**
 * block subtype
 */
export type TBlockSubType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "o" | "t" | "u";

/**
 * block type
 */
export type TBlockType = "audio" | "b" | "c" | "d" | "h" | "html" | "i" | "iframe" | "l" | "m" | "p" | "query_embed" | "s" | "t" | "tb" | "video" | "widget";

// #endregion content

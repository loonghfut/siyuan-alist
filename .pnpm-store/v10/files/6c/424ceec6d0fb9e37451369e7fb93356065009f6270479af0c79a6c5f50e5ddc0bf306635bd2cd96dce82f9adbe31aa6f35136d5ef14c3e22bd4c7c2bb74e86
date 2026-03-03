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
 * Get block HTML DOM and other information
 */
export interface IPayload {
    /**
     * The end block ID
     */
    readonly endID?: string;
    /**
     * Block ID
     */
    readonly id: string;
    /**
     * Block index
     */
    readonly index?: number;
    /**
     * Whether it is a reverse link
     */
    readonly isBacklink?: boolean;
    /**
     * Load mode
     */
    readonly mode?: number;
    /**
     * Query statements
     */
    readonly query?: string;
    /**
     * Query method
     */
    readonly queryMethod?: number;
    readonly queryTypes?: IQueryTypes;
    /**
     * Maximum number of loaded blocks
     */
    readonly size?: number;
    /**
     * The starting block ID
     */
    readonly startID?: string;
}

/**
 * Query the specified block type (block type filter)
 */
export interface IQueryTypes {
    /**
     * Quote block
     */
    readonly blockquote?: boolean;
    /**
     * Code block
     */
    readonly codeBlock?: boolean;
    /**
     * Document block
     */
    readonly document?: boolean;
    /**
     * Embed block
     */
    readonly embedBlock?: boolean;
    /**
     * Heading block
     */
    readonly heading?: boolean;
    /**
     * HTML block
     */
    readonly htmlBlock?: boolean;
    /**
     * List block
     */
    readonly list?: boolean;
    /**
     * List item block
     */
    readonly listItem?: boolean;
    /**
     * Math formula block
     */
    readonly mathBlock?: boolean;
    /**
     * Paragraph block
     */
    readonly paragraph?: boolean;
    /**
     * Super blok
     */
    readonly superBlock?: boolean;
    /**
     * Table block
     */
    readonly table?: boolean;
}

// #endregion content

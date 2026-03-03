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
 * Gets the document outline
 */
export interface IResponse {
    /**
     * status code
     */
    readonly code: number;
    /**
     * Outline item list
     */
    readonly data: IOutlineTopNode[];
    /**
     * status message
     */
    readonly msg: string;
}

/**
 * Outline top node
 */
export interface IOutlineTopNode {
    /**
     * Outline Lover node list
     */
    readonly blocks?: IOutlineLowerNode[];
    /**
     * Notebook ID
     */
    readonly box: string;
    /**
     * Number of child nodes
     */
    readonly count: number;
    /**
     * Outline depth
     */
    readonly depth: number;
    /**
     * Block ID
     */
    readonly id: string;
    /**
     * The HTML content of Heading block
     */
    readonly name: string;
    /**
     * Block type
     */
    readonly nodeType: "NodeHeading";
    /**
     * Block sub-type
     */
    readonly subType: SubType;
    /**
     * Outline item type
     */
    readonly type: "outline";
    [property: string]: any;
}

/**
 * Outline Lower node
 */
export interface IOutlineLowerNode {
    /**
     * Notebook ID
     */
    readonly box: string;
    /**
     * Outline Lover node list
     */
    readonly children: IOutlineLowerNode[] | null;
    /**
     * The HTML content of Heading block
     */
    readonly content: string;
    /**
     * Number of child nodes
     */
    readonly count: number;
    /**
     * Outline depth
     */
    readonly depth: number;
    /**
     * Block ID
     */
    readonly id: string;
    /**
     * Document path, which needs to start with / and separate levels with /
     * path here corresponds to the database path field
     */
    readonly path: string;
    /**
     * Document block ID
     */
    readonly rootID: string;
    /**
     * Block sub-type
     */
    readonly subType: SubType;
    /**
     * Block type
     */
    readonly type: "NodeHeading";
    [property: string]: any;
}

/**
 * Block sub-type
 */
export type SubType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Block type
 */

/**
 * Outline item type
 */

// #endregion content

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
 * Full text search
 */
export interface IResponse {
    /**
     * status code
     */
    readonly code: number;
    readonly data: IData;
    /**
     * status message
     */
    readonly msg: string;
}

/**
 * Response information
 */
export interface IData {
    /**
     * Search results
     */
    readonly blocks: IBlock[];
    /**
     * Whether it is the current document content search mode
     */
    readonly docMode: boolean;
    /**
     * The number of blocks in the full search results
     */
    readonly matchedBlockCount: number;
    /**
     * The number of documents in the full search results
     */
    readonly matchedRootCount: number;
    /**
     * Current page number
     */
    readonly pageCount: number;
}

/**
 * Search result item
 */
export interface IBlock {
    /**
     * Block alias
     */
    readonly alias: string;
    /**
     * notebook ID
     */
    readonly box: string;
    /**
     * Grouped search results
     */
    readonly children: IBlock[] | null;
    /**
     * Block content
     */
    readonly content: string;
    readonly count: number;
    /**
     * Creation time
     */
    readonly created: string;
    readonly defID: string;
    readonly defPath: string;
    readonly depth: number;
    /**
     * The first block content in the container block
     */
    readonly fcontent: string;
    /**
     * Whether to fold
     */
    readonly folded: boolean;
    /**
     * The readable path of the document where it is located
     */
    readonly hPath: string;
    /**
     * Inline Attribute List (IAL) of block
     */
    readonly ial: Ial;
    /**
     * Block ID
     */
    readonly id: string;
    /**
     * Block Markdown content
     */
    readonly markdown: string;
    /**
     * Block memo
     */
    readonly memo: string;
    /**
     * Block name
     */
    readonly name: string;
    /**
     * Parent block ID
     */
    readonly parentID: string;
    /**
     * The path of the document where it is located
     */
    readonly path: string;
    /**
     * The block ID list of the block reference (the current block is referenced by these blocks)
     */
    readonly refs: null | string[];
    /**
     * Block reference text
     */
    readonly refText: string;
    /**
     * Flash card ID
     */
    readonly riffCardID: string;
    /**
     * Flash card review count
     */
    readonly riffCardReps: number;
    /**
     * Document block ID
     */
    readonly rootID: string;
    /**
     * Block sort priority
     */
    readonly sort: number;
    /**
     * Block subtype
     */
    readonly subType: SubTypeEnum;
    /**
     * Block tags
     */
    readonly tag: string;
    /**
     * Block type
     */
    readonly type: TypeEnum;
    /**
     * Update time
     */
    readonly updated: string;
}

/**
 * Inline Attribute List (IAL) of block
 */
export interface Ial {
    /**
     * document block ID
     */
    readonly id: string;
    /**
     * document title
     */
    readonly title?: string;
    /**
     * The last time the block was updated
     */
    readonly updated: string;
    [property: string]: string;
}

export type SubTypeEnum = "" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "o" | "t" | "u";

export type TypeEnum = "NodeAttributeView" | "NodeAudio" | "NodeBlockQueryEmbed" | "NodeBlockquote" | "NodeCodeBlock" | "NodeDocument" | "NodeHeading" | "NodeHTMLBlock" | "NodeIFrame" | "NodeList" | "NodeListItem" | "NodeParagraph" | "NodeSuperBlock" | "NodeTable" | "NodeThematicBreak" | "NodeVideo" | "NodeWidget";

// #endregion content

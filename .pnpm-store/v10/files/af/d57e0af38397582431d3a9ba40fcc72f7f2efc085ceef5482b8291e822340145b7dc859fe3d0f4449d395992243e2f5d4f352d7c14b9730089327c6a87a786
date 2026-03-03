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
 * Get document information
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
 * document information
 */
export interface IData {
    /**
     * Attribute view reference list
     */
    readonly attrViews: IAttrView[];
    readonly ial: Ial;
    /**
     * document icon
     */
    readonly icon: string;
    /**
     * block ID
     */
    readonly id: string;
    /**
     * document name
     */
    readonly name: string;
    /**
     * The number of references to the document
     */
    readonly refCount: number;
    /**
     * ID of the block referencing the document
     */
    readonly refIDs: string[];
    /**
     * document block ID
     */
    readonly rootID: string;
    /**
     * The number of sub-documents
     */
    readonly subFileCount: number;
}

/**
 * Attribute view
 */
export interface IAttrView {
    /**
     * Attribute view ID
     */
    readonly id: string;
    /**
     * Attribute view name
     */
    readonly name: ID;
}

export type ID = "未命名" | "Sans titre" | "Sin título" | "Untitled";

/**
 * Inline Attribute List (IAL) of document block
 */
export interface Ial {
    /**
     * document block ID
     */
    readonly id: string;
    /**
     * document title
     */
    readonly title: string;
    /**
     * The last time the block was updated
     */
    readonly updated: string;
    [property: string]: string;
}

// #endregion content

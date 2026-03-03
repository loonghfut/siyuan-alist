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
 * Search Document by Keyword
 */
export interface IResponse {
    /**
     * status code
     */
    readonly code: number;
    /**
     * document info list
     */
    readonly data: IDocInfo[];
    /**
     * status message
     */
    readonly msg: string;
}

export interface IDocInfo {
    /**
     * Document Block ID
     */
    readonly box: string;
    /**
     * Notebook icon
     */
    readonly boxIcon: string;
    /**
     * Number of expired cards
     */
    readonly dueFlashcardCount?: number;
    /**
     * Total number of cards
     */
    readonly flashcardCount?: number;
    /**
     * The readable path that contains the name of the notebook
     */
    readonly hPath: string;
    /**
     * Number of new cards
     */
    readonly newFlashcardCount?: number;
    /**
     * Directory path
     */
    readonly path: string;
    [property: string]: any;
}

// #endregion content

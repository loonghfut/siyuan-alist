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
 * Create a notebook
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
 * response data
 */
export interface IData {
    readonly notebook: INotebook;
}

/**
 * notebook object
 */
export interface INotebook {
    /**
     * notebook open state
     */
    readonly closed: boolean;
    /**
     * the count of due flash card
     */
    readonly dueFlashcardCount: number;
    /**
     * the count of flash card
     */
    readonly flashcardCount: number;
    /**
     * notebook icon
     */
    readonly icon: string;
    /**
     * notebook ID
     */
    readonly id: string;
    /**
     * notebook name
     */
    readonly name: string;
    /**
     * the count of new flash card
     */
    readonly newFlashcardCount: number;
    /**
     * sequence number
     */
    readonly sort: number;
    /**
     * document sorting mode
     */
    readonly sortMode: number;
}

// #endregion content

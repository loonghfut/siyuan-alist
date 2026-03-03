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
 * Get notebook configuration
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
 * notebook info
 */
export interface IData {
    /**
     * notebook ID
     */
    readonly box: string;
    readonly conf: IConf;
    /**
     * notebook name
     */
    readonly name: string;
}

/**
 * notebook configuration
 */
export interface IConf {
    /**
     * notebook open state
     */
    readonly closed: boolean;
    /**
     * the path of new daily note
     */
    readonly dailyNoteSavePath: string;
    /**
     * the template file path of new daily note
     */
    readonly dailyNoteTemplatePath: string;
    /**
     * New document save notebook
     */
    readonly docCreateSaveBox: string;
    /**
     * New document save location
     */
    readonly docCreateSavePath: string;
    /**
     * notebook icon
     */
    readonly icon: string;
    /**
     * notebook name
     */
    readonly name: string;
    /**
     * The notebook that was stored when a new document was created using block references
     */
    readonly refCreateSaveBox: string;
    /**
     * The document path that was stored when a new document was created using block references
     */
    readonly refCreateSavePath: string;
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

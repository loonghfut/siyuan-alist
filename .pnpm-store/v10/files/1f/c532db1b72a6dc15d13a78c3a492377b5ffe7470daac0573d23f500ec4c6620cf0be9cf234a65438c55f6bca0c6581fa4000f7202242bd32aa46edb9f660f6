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
 * Prepend blocks
 */
export interface IResponse {
    /**
     * status code
     */
    readonly code: number;
    readonly data: ITransaction[];
    /**
     * status message
     */
    readonly msg: string;
}

/**
 * Insert transactions
 *
 * Insert transaction
 */
export interface ITransaction {
    readonly doOperations: IOperation[];
    /**
     * timestamp
     */
    readonly timestamp: number;
    /**
     * undo operation list
     */
    readonly undoOperations: null;
}

/**
 * insert operation list
 *
 * insert operation
 */
export interface IOperation {
    /**
     * operation action type
     */
    readonly action: "insert";
    /**
     * HTML DOM of inserting blocks
     */
    readonly data: string;
    /**
     * block ID: the first inserting block
     */
    readonly id: string;
    /**
     * block ID: insert into this block
     */
    readonly parentID: string;
    [property: string]: any;
}

// #endregion content

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
 * Delete a block
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
 * Delete transactions
 *
 * Delete transaction
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
 * Delete operation list
 *
 * Delete operation
 */
export interface IOperation {
    /**
     * operation action type
     */
    readonly action: "delete";
    /**
     * HTML DOM of updating blocks
     */
    readonly data: null;
    /**
     * ID of the block to be deleted
     */
    readonly id: string;
    readonly parentID: any;
    [property: string]: any;
}

// #endregion content

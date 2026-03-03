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
 * Get the content of a shorthand
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
     * Human-friendly creation time
     */
    readonly hCreated: string;
    /**
     * shorthand object ID
     */
    readonly oId: string;
    /**
     * shorthand article content (HTML)
     */
    readonly shorthandContent: string;
    /**
     * shorthand article description
     */
    readonly shorthandDesc: string;
    /**
     * shorthand source type
     */
    readonly shorthandFrom: number;
    /**
     * shorthand article content (Markdown)
     */
    readonly shorthandMd: string;
    /**
     * shorthand article title
     */
    readonly shorthandTitle: string;
    /**
     * shorthand original URL address
     */
    readonly shorthandURL: string;
}

// #endregion content

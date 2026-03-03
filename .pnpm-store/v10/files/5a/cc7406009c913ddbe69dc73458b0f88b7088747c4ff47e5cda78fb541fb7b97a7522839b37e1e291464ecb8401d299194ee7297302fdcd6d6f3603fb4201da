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
 * Set code snippet list
 */
export interface IPayload {
    /**
     * snippet list
     */
    readonly snippets: ISnippet[];
}

/**
 * code snippet
 */
export interface ISnippet {
    /**
     * snippet content
     */
    readonly content: string;
    /**
     * snippet enable status
     */
    readonly enabled: boolean;
    /**
     * snippet ID
     */
    readonly id: string;
    /**
     * snippet name
     */
    readonly name: string;
    /**
     * snippet type
     */
    readonly type: TSnippetType;
}

/**
 * snippet type
 */
export type TSnippetType = "css" | "js";

// #endregion content

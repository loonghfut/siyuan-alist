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
 * Get block breadcrumb
 */
export interface IResponse {
    /**
     * status code
     */
    readonly code: number;
    /**
     * breadcrumb item list
     */
    readonly data: IBreadcrumbItem[];
    /**
     * status message
     */
    readonly msg: string;
}

export interface IBreadcrumbItem {
    /**
     * Block children
     */
    readonly children: null;
    /**
     * Block ID
     */
    readonly id: string;
    /**
     * Block text content
     */
    readonly name: string;
    /**
     * Block subtype
     */
    readonly subType: SubTypeEnum;
    /**
     * Block type
     */
    readonly type: TypeEnum;
}

export type SubTypeEnum = "" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "o" | "t" | "u";

export type TypeEnum = "NodeAttributeView" | "NodeAudio" | "NodeBlockQueryEmbed" | "NodeBlockquote" | "NodeCodeBlock" | "NodeDocument" | "NodeHeading" | "NodeHTMLBlock" | "NodeIFrame" | "NodeList" | "NodeListItem" | "NodeParagraph" | "NodeSuperBlock" | "NodeTable" | "NodeThematicBreak" | "NodeVideo" | "NodeWidget";

// #endregion content

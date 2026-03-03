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
 * Forward proxy
 */
export interface IPayload {
    /**
     * Content-Type for request body
     * @defaultValue "application/json"
     */
    readonly contentType?: string;
    /**
     * request headers list
     */
    readonly headers: { [key: string]: string }[];
    /**
     * HTTP method to request
     * @defaultValue "GET"
     */
    readonly method?: TRequestMethod;
    /**
     * request body
     */
    readonly payload?: Payload;
    /**
     * Encoding schema for request payload
     * @defaultValue "text"
     */
    readonly payloadEncoding?: TEncodeSchema;
    /**
     * Encoding schema for response body
     * @defaultValue "text"
     */
    readonly responseEncoding?: TEncodeSchema;
    /**
     * timeout to request (ms)
     * @defaultValue 7000
     */
    readonly timeout?: number;
    /**
     * URL to request
     */
    readonly url: string;
}

/**
 * HTTP method to request
 * @defaultValue "GET"
 */
export type TRequestMethod = "CONNECT" | "DELETE" | "GET" | "HEAD" | "OPTIONS" | "PATCH" | "POST" | "PUT" | "TRACE";

/**
 * request body
 */
export type Payload = { [key: string]: any } | string;

/**
 * Encoding schema for request payload
 * @defaultValue "text"
 *
 * Encoding schema for response body
 * @defaultValue "text"
 */
export type TEncodeSchema = "base32-hex" | "base32-std" | "base32" | "base64-std" | "base64-url" | "base64" | "hex" | "text";

// #endregion content

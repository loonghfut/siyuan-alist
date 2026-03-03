/**
 * Copyright (C) 2023 SiYuan Community
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see {@link http://www.gnu.org/licenses/}.
 */

// REF: https://github.com/jimmywarting/native-file-system-adapter/blob/master/src/util.js
export const errors = {
    DISALLOWED: [
        "The request is not allowed by the user agent or the platform in the current context.",
        "NotAllowedError",
    ],
    INVALID: [
        "seeking position failed.",
        "InvalidStateError",
    ],
    INVALID_STATE: [
        "Directory handle is not initialized.",
        "InvalidStateError",
    ],
    MISMATCH: [
        "The path supplied exists, but was not an entry of requested type.",
        "TypeMismatchError",
    ],
    MOD_ERR: [
        "The object can not be modified in this way.",
        "InvalidModificationError",
    ],
    NOT_FOUND: (path: string) => [
        `File or directory [${path}] is not found`,
        "NotFoundError",
    ],
    INVALID_MODIFICATION: (path: string) => [
        `Directory [${path}] is not empty`,
        "InvalidModificationError",
    ],
    SECURITY: [
        "It was determined that certain files are unsafe for access within a Web application, or that too many calls are being made on file resources.",
        "SecurityError",
    ],
    SYNTAX: (message: string) => [
        `Failed to execute "write" on "UnderlyingSinkBase": Invalid params passed. ${message}`,
        "SyntaxError",
    ],
};

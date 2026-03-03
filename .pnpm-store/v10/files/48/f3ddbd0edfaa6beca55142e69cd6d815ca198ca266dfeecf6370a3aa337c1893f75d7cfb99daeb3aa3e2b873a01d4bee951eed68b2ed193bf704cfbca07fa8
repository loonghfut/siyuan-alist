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

/**
 * @see
 * {@link https://fs.spec.whatwg.org/#api-filesystemwritablefilestream}
 * REF:
 * {@link https://github.com/jimmywarting/native-file-system-adapter/blob/master/src/FileSystemWritableFileStream.js | native-file-system-adapter/src/FileSystemWritableFileStream.js}
 * {@link https://developer.mozilla.org/zh-CN/docs/Web/API/WritableStream | WritableStream - Web APIs - MDN}
 */
export class SiyuanFileSystemWritableFileStream<W extends FileSystemWriteChunkType = FileSystemWriteChunkType> extends WritableStream<W> implements FileSystemWritableFileStream {
    protected _closed: boolean; // 文件流是否已关闭

    constructor(
        underlyingSink?: UnderlyingSink<W>, //
        strategy?: QueuingStrategy<W>,
    ) {
        super(underlyingSink, strategy);
        this._closed = false;
    }

    public override async close(): Promise<void> {
        this._closed = true;
        const writer = this.getWriter();
        const result = writer.close();
        writer.releaseLock();
        return result;
        // return super.close();
    }

    /**
     * 更新文件流的写入位置
     * @see
     * {@link https://fs.spec.whatwg.org/#api-filesystemwritablefilestream-write}
     * @param data - 将要写入的数据
     */
    write(data: FileSystemWriteChunkType): Promise<void> {
        if (this._closed) {
            return Promise.reject(new TypeError("Cannot write to a CLOSED writable stream"));
        }

        // 1. Let writer be the result of getting a writer for this.
        const writer = this.getWriter();

        // 2. Let result be the result of writing a chunk to writer given data.
        const result = writer.write(data as W);

        // 3. Release writer.
        writer.releaseLock();

        // 4. Return result.
        return result;
    }

    /**
     * 更新文件流的写入位置
     * @see
     * {@link https://fs.spec.whatwg.org/#dom-filesystemwritablefilestream-seek}
     * @param position - 写入位置相对于文件首的偏移量
     */
    seek(position: number): Promise<void> {
        return this.write({
            type: "seek",
            position,
        });
    }

    /**
     * 截断文件流
     * @see
     * {@link https://fs.spec.whatwg.org/#api-filesystemwritablefilestream-truncate}
     * @param size - 截断位置相对于文件首的偏移量
     */
    truncate(size: number): Promise<void> {
        return this.write({
            type: "truncate",
            size,
        });
    }
}

export default SiyuanFileSystemWritableFileStream;

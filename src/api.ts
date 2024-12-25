/**
 * Copyright (c) 2023 frostime. All rights reserved.
 * https://github.com/frostime/sy-plugin-template-vite
 * 
 * See API Document in [API.md](https://github.com/siyuan-note/siyuan/blob/master/API.md)
 * API 文档见 [API_zh_CN.md](https://github.com/siyuan-note/siyuan/blob/master/API_zh_CN.md)
 */

import { fetchPost, fetchSyncPost, IWebSocketData, IOperation, Protyle } from "siyuan";


export async function request(url: string, data: any) {
    let response: IWebSocketData = await fetchSyncPost(url, data);
    let res = response.code === 0 ? response.data : null;
    return res;
}


// **************************************** Noteboook ****************************************


export async function lsNotebooks(): Promise<IReslsNotebooks> {
    let url = '/api/notebook/lsNotebooks';
    return request(url, '');
}


export async function openNotebook(notebook: NotebookId) {
    let url = '/api/notebook/openNotebook';
    return request(url, { notebook: notebook });
}


export async function closeNotebook(notebook: NotebookId) {
    let url = '/api/notebook/closeNotebook';
    return request(url, { notebook: notebook });
}


export async function renameNotebook(notebook: NotebookId, name: string) {
    let url = '/api/notebook/renameNotebook';
    return request(url, { notebook: notebook, name: name });
}


export async function createNotebook(name: string): Promise<Notebook> {
    let url = '/api/notebook/createNotebook';
    return request(url, { name: name });
}


export async function removeNotebook(notebook: NotebookId) {
    let url = '/api/notebook/removeNotebook';
    return request(url, { notebook: notebook });
}


export async function getNotebookConf(notebook: NotebookId): Promise<IResGetNotebookConf> {
    let data = { notebook: notebook };
    let url = '/api/notebook/getNotebookConf';
    return request(url, data);
}


export async function setNotebookConf(notebook: NotebookId, conf: NotebookConf): Promise<NotebookConf> {
    let data = { notebook: notebook, conf: conf };
    let url = '/api/notebook/setNotebookConf';
    return request(url, data);
}


// **************************************** File Tree ****************************************
export async function createDocWithMd(notebook: NotebookId, path: string, markdown: string): Promise<DocumentId> {
    let data = {
        notebook: notebook,
        path: path,
        markdown: markdown,
    };
    let url = '/api/filetree/createDocWithMd';
    return request(url, data);
}


export async function renameDoc(notebook: NotebookId, path: string, title: string): Promise<DocumentId> {
    let data = {
        doc: notebook,
        path: path,
        title: title
    };
    let url = '/api/filetree/renameDoc';
    return request(url, data);
}


export async function removeDoc(notebook: NotebookId, path: string) {
    let data = {
        notebook: notebook,
        path: path,
    };
    let url = '/api/filetree/removeDoc';
    return request(url, data);
}


export async function moveDocs(fromPaths: string[], toNotebook: NotebookId, toPath: string) {
    let data = {
        fromPaths: fromPaths,
        toNotebook: toNotebook,
        toPath: toPath
    };
    let url = '/api/filetree/moveDocs';
    return request(url, data);
}


export async function getHPathByPath(notebook: NotebookId, path: string): Promise<string> {
    let data = {
        notebook: notebook,
        path: path
    };
    let url = '/api/filetree/getHPathByPath';
    return request(url, data);
}


export async function getHPathByID(id: BlockId): Promise<string> {
    let data = {
        id: id
    };
    let url = '/api/filetree/getHPathByID';
    return request(url, data);
}
export async function getBlockDOM(id: BlockId): Promise<string> {
    let data = {
        id: id
    };
    let url = '/api/block/getBlockDOM';
    return request(url, data);
}

export async function getIDsByHPath(notebook: NotebookId, path: string): Promise<BlockId[]> {
    let data = {
        notebook: notebook,
        path: path
    };
    let url = '/api/filetree/getIDsByHPath';
    return request(url, data);
}

// **************************************** Asset Files ****************************************

export async function upload(assetsDirPath: string, files: any[]): Promise<IResUpload> {
    let form = new FormData();
    form.append('assetsDirPath', assetsDirPath);
    for (let file of files) {
        form.append('file[]', file);
    }
    let url = '/api/asset/upload';
    return request(url, form);
}

// **************************************** Block ****************************************
type DataType = "markdown" | "dom";
export async function insertBlock(
    dataType: DataType, data: string,
    nextID?: BlockId, previousID?: BlockId, parentID?: BlockId
): Promise<IResdoOperations[]> {
    let payload = {
        dataType: dataType,
        data: data,
        nextID: nextID,
        previousID: previousID,
        parentID: parentID
    }
    let url = '/api/block/insertBlock';
    return request(url, payload);
}


export async function prependBlock(dataType: DataType, data: string, parentID: BlockId | DocumentId): Promise<IResdoOperations[]> {
    let payload = {
        dataType: dataType,
        data: data,
        parentID: parentID
    }
    let url = '/api/block/prependBlock';
    return request(url, payload);
}


export async function appendBlock(dataType: DataType, data: string, parentID: BlockId | DocumentId): Promise<IResdoOperations[]> {
    let payload = {
        dataType: dataType,
        data: data,
        parentID: parentID
    }
    let url = '/api/block/appendBlock';
    return request(url, payload);
}


export async function updateBlock(dataType: DataType, data: string, id: BlockId): Promise<IResdoOperations[]> {
    let payload = {
        dataType: dataType,
        data: data,
        id: id
    }
    let url = '/api/block/updateBlock';
    return request(url, payload);
}


export async function deleteBlock(id: BlockId): Promise<IResdoOperations[]> {
    let data = {
        id: id
    }
    let url = '/api/block/deleteBlock';
    return request(url, data);
}


export async function moveBlock(id: BlockId, previousID?: PreviousID, parentID?: ParentID): Promise<IResdoOperations[]> {
    let data = {
        id: id,
        previousID: previousID,
        parentID: parentID
    }
    let url = '/api/block/moveBlock';
    return request(url, data);
}


export async function foldBlock(id: BlockId) {
    let data = {
        id: id
    }
    let url = '/api/block/foldBlock';
    return request(url, data);
}


export async function unfoldBlock(id: BlockId) {
    let data = {
        id: id
    }
    let url = '/api/block/unfoldBlock';
    return request(url, data);
}


export async function getBlockKramdown(id: BlockId): Promise<IResGetBlockKramdown> {
    let data = {
        id: id
    }
    let url = '/api/block/getBlockKramdown';
    return request(url, data);
}


export async function getChildBlocks(id: BlockId): Promise<IResGetChildBlock[]> {
    let data = {
        id: id
    }
    let url = '/api/block/getChildBlocks';
    return request(url, data);
}

export async function transferBlockRef(fromID: BlockId, toID: BlockId, refIDs: BlockId[]) {
    let data = {
        fromID: fromID,
        toID: toID,
        refIDs: refIDs
    }
    let url = '/api/block/transferBlockRef';
    return request(url, data);
}

// **************************************** Attributes ****************************************
export async function setBlockAttrs(id: BlockId, attrs: { [key: string]: string }) {
    let data = {
        id: id,
        attrs: attrs
    }
    let url = '/api/attr/setBlockAttrs';
    return request(url, data);
}


export async function getBlockAttrs(id: BlockId): Promise<{ [key: string]: string }> {
    let data = {
        id: id
    }
    let url = '/api/attr/getBlockAttrs';
    return request(url, data);
}

// **************************************** SQL ****************************************

export async function sql(sql: string): Promise<any[]> {
    let sqldata = {
        stmt: sql,
    };
    let url = '/api/query/sql';
    return request(url, sqldata);
}

export async function getBlockByID(blockId: string): Promise<Block> {
    let sqlScript = `select * from blocks where id ='${blockId}'`;
    let data = await sql(sqlScript);
    return data[0];
}

// **************************************** Template ****************************************

export async function render(id: DocumentId, path: string): Promise<IResGetTemplates> {
    let data = {
        id: id,
        path: path
    }
    let url = '/api/template/render';
    return request(url, data);
}


export async function renderSprig(template: string): Promise<string> {
    let url = '/api/template/renderSprig';
    return request(url, { template: template });
}

// **************************************** File ****************************************

export async function getFile(path: string): Promise<any> {
    let data = {
        path: path
    }
    let url = '/api/file/getFile';
    return new Promise((resolve, _) => {
        fetchPost(url, data, (content: any) => {
            resolve(content)
        });
    });
}


/**
 * fetchPost will secretly convert data into json, this func merely return Blob
 * @param endpoint 
 * @returns 
 */
export const getFileBlob = async (path: string): Promise<Blob | null> => {
    const endpoint = '/api/file/getFile'
    let response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({
            path: path
        })
    });
    if (!response.ok) {
        return null;
    }
    let data = await response.blob();
    return data;
}


export async function putFile(path: string, isDir: boolean, file: any) {
    let form = new FormData();
    form.append('path', path);
    form.append('isDir', isDir.toString());
    // Copyright (c) 2023, terwer.
    // https://github.com/terwer/siyuan-plugin-importer/blob/v1.4.1/src/api/kernel-api.ts
    form.append('modTime', Math.floor(Date.now() / 1000).toString());
    form.append('file', file);
    let url = '/api/file/putFile';
    return request(url, form);
}

export async function removeFile(path: string) {
    let data = {
        path: path
    }
    let url = '/api/file/removeFile';
    return request(url, data);
}



export async function readDir(path: string): Promise<IResReadDir> {
    let data = {
        path: path
    }
    let url = '/api/file/readDir';
    return request(url, data);
}


// **************************************** Export ****************************************

export async function exportMdContent(id: DocumentId): Promise<IResExportMdContent> {
    let data = {
        id: id
    }
    let url = '/api/export/exportMdContent';
    return request(url, data);
}

export async function exportResources(paths: string[], name: string): Promise<IResExportResources> {
    let data = {
        paths: paths,
        name: name
    }
    let url = '/api/export/exportResources';
    return request(url, data);
}

// **************************************** Convert ****************************************

export type PandocArgs = string;
export async function pandoc(args: PandocArgs[]) {
    let data = {
        args: args
    }
    let url = '/api/convert/pandoc';
    return request(url, data);
}

// **************************************** Notification ****************************************

// /api/notification/pushMsg
// {
//     "msg": "test",
//     "timeout": 7000
//   }
export async function pushMsg(msg: string, timeout: number = 7000) {
    let payload = {
        msg: msg,
        timeout: timeout
    };
    let url = "/api/notification/pushMsg";
    return request(url, payload);
}

export async function pushErrMsg(msg: string, timeout: number = 7000) {
    let payload = {
        msg: msg,
        timeout: timeout
    };
    let url = "/api/notification/pushErrMsg";
    return request(url, payload);
}

// **************************************** Network ****************************************
export async function forwardProxy(
    url: string, method: string = 'GET', payload: any = {},
    headers: any[] = [], timeout: number = 7000, contentType: string = "text/html"
): Promise<IResForwardProxy> {
    let data = {
        url: url,
        method: method,
        timeout: timeout,
        contentType: contentType,
        headers: headers,
        payload: payload
    }
    let url1 = '/api/network/forwardProxy';
    return request(url1, data);
}


// **************************************** System ****************************************

export async function bootProgress(): Promise<IResBootProgress> {
    return request('/api/system/bootProgress', {});
}


export async function version(): Promise<string> {
    return request('/api/system/version', {});
}


export async function currentTime(): Promise<number> {
    return request('/api/system/currentTime', {});
}


type AttrType = { [key: string]: string };

export async function transBatchUpdateAttrs(blockAttrs: { id: string, old: AttrType, new: AttrType }[]) {
    return blockAttrs.map(b => {
        const op = {} as IOperation;
        op.action = "updateAttrs";
        op.id = b.id;
        op.data = JSON.stringify({ old: b.old, new: b.new });
        return op;
    });
}

export async function transUpdateBlocks(ops: { id: string, domStr: string }[]) {
    ops = ops.filter(op => !!op.id);
    if (!(ops.length > 0)) return [];
    return ops.map(({ id, domStr }) => {
        const op = {} as IOperation;
        op.action = "update"; // dom
        op.id = id;
        op.data = domStr;
        return op;
    });
}

export async function transDeleteBlocks(ids: string[]) {
    return ids?.map(id => {
        const op = {} as IOperation;
        op.action = "delete";
        op.id = id;
        return op;
    }) ?? [];
}

export async function transMoveBlocksAfter(ids: string[], previousID: string) {
    return ids.slice().reverse().map(id => {
        const op = {} as IOperation;
        op.action = "move";
        op.id = id;
        op.previousID = previousID;
        return op;
    });
}

export async function transMoveBlocksAsChild(ids: string[], parentID: string) {
    return ids.slice().reverse().map(id => {
        const op = {} as IOperation;
        op.action = "move";
        op.id = id;
        op.parentID = parentID;
        return op;
    });
}

// 代码在插件环境中使用，这里略过前面的处理，直接到提交事务部分
// 这部分代码本来不是一个方法，这里封装过了
// 仅需要更新一个块
export function updateOneBlock(blockId: string, updatedDom: string, originalDom: string, protyle: Protyle["protyle"]) {
    // protyle是{detail}获取的detail.protyle，这里获取当前编辑器的实例
    // blockId是{detail}获取的当前块的块id，仅适用于一个块
    // updatedDom和originalDom是修改后的Dom和修改前的Dom，用于撤回操作
    protyle.getInstance().updateTransaction(blockId, updatedDom, originalDom);
    // 操作后需要等待操作完成刷新界面，但是这部分获取有点问题，不知道什么时候事务完成
    // 如果使用getIns().isuploading()获取，好像无法判断当前是否完成事务
    // 这里刷新界面，建议自行设置延时，示例中不进行处理了
    protyle.getInstance().reload(true);
}

// 需要更新多个块
export function updateMultiBlock(doOperations: IOperation[], undoOperations: IOperation[], protyle: Protyle["protyle"]) {
    // 这里的protyle不变
    protyle.getInstance().transaction(doOperations, undoOperations);
    // 这里用到的do和undo分别是自行封装的IOperation数组，其中的action是必须项，可用id标识修改块，data标识更新前后的dom
    // 可参考前面Achuan-2给出的/api/transactions代码，不过需要单独处理do和undo
    // 之后要不要刷新还没有进行测试，这里给出刷新代码
    protyle.getInstance().reload(true);
}

// 封装doOperation和undoOperation的方法
// 这里只收一组数据，多组数据请自行处理
// export function setTrans(blockId: String, updatedDom: string, originalDom: string) {
//     let doOperations: IOperations[] = [];
//     let undoOperations: IOperations[] = [];
//     doOperations.push({
//         action: "update",
//         id: blockId,
//         data: updatedDom
//     });
//     undoOperations.push({
//         action: "update",
//         id: blockId,
//         data: originalDom
//     });
//     let transaction = [doOperations, undoOperations];
//     return transaction;
// }

export function generateBlockId(): { data: { blockId: string, datePart: string } } {
    const date = new Date();
    // 调整时间为东八区
    const offset = 8 * 60 * 60 * 1000; // 东八区的偏移量（毫秒）
    const localDate = new Date(date.getTime() + offset);
    const dateString = localDate.toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
    const randomString = Math.random().toString(36).substring(2, 9);
    const blockId = `${dateString}-${randomString}`;
    return {
        data: {
            blockId: blockId,
            datePart: dateString
        }
    };
}



//                 const idData = api.generateBlockId();
//                 const myhtml = `<div 
//                         data-node-id="${idData.data.blockId}" 
//                         data-node-index="1" 
//                         data-type="NodeParagraph" 
//                         class="p" 
//                         updated="${idData.data.datePart}"
//                     >
//                         <div contenteditable="true" spellcheck="false">
// asfaf 66666666  asas fafs34<wbr>
//                         </div>
//                         <div class="protyle-attr" contenteditable="false">
//                         </div>
//                     </div>`;
//                 // console.log(idData, "idData");
//                 currentProtyle.getInstance().insert(
//                     `<div data-node-id="${idData.data.blockId}" data-node-index="1" data-type="NodeVideo" class="iframe" updated="${idData.data.datePart}"><div class="iframe-content">​<video controls="controls" src="https://qpan.zcl.me:4343/d/sp/freecompress-%E9%AD%94%E6%B3%95%E5%A5%B3%E5%AD%A92.mp4?sign=A_Ui6w6T9Dpao66Yp05k71CyqfYKLFABoGeOFiv94GM=:0" data-src=""></video><span class="protyle-action__drag" contenteditable="false"></span></div><div class="protyle-attr" contenteditable="false">​</div></div>`,
//                     true,
//                     true
//                 );

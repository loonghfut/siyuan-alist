// import { AlistUploader } from '@/libs/alist-uploader';  //废案
import { url, token, alistname, alistmima, alistUrl,beta } from '@/index';
import "@/index.scss";
import { error } from 'console';
import { showMessage } from 'siyuan';

//控制日志输出
export let notebookId = '';
export let islog = true;
export function outLog(msg: any, tag: string = '') {
    if (islog) {
        console.log(msg, tag);
    }
}
export function trunLog(msg: boolean) {
    islog = msg;
}
//连接验证（判断是否连接上目标服务）



export async function isconnect() {
    try {
        const response = await fetch(`${url}/api/notebook/lsNotebooks`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${token}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            if (data.code === 0) {
                outLog(data.data);
                outLog('isconnect()连接成功');
                showMessage('连接目标服务成功');
                return true;
            } else {
                outLog('isconnect()连接失败');
                showMessage('连接目标服务失败');
                return false;
            }
        } else {
            outLog('isconnect()连接失败');
            showMessage('连接目标服务失败');
            return false;
        }
    } catch (error) {
        outLog('isconnect()连接失败');
        showMessage('连接目标服务失败');
        return false;
    }
}

//更改目标服务笔记本配置（解决笔记本关闭问题）
export async function setNotebookConf(notebookId, rename: string, isUrl = true) {
    const conf = {
        name: rename,
        closed: false,
        // refCreateSavePath: "",
        // createDocNameTemplate: "",
        // dailyNoteSavePath: "/daily note/{{now | date \"2006/01\"}}/{{now | date \"2006-01-02\"}}",
        // dailyNoteTemplatePath: ""
    };
    try {
        let response;
        if (isUrl) {
            response = await fetch(`${url}/api/notebook/setNotebookConf`, {
                method: 'POST',
                headers: {
                    'Authorization': `token ${token}`
                },
                body: JSON.stringify({
                    notebook: notebookId,
                    conf: conf
                })
            });
        } else {
            response = await fetch('/api/notebook/setNotebookConf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    notebook: notebookId,
                    conf: conf
                })
            });
        }

        if (!response.ok) {
            throw new Error('Failed to set notebook configuration');
        }
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error setting notebook configuration:', error);
    }
}
//获取笔记本名称
export async function getNotebookName(notebookId: string, isUrl = false) {
    try {
        console.log(notebookId);
        let response;
        if (isUrl) {
            response = await fetch(`${url}/api/notebook/getNotebookConf`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${token}`
                },
                body: JSON.stringify({ notebook: notebookId }),
            });
        } else {
            response = await fetch('/api/notebook/getNotebookConf', {
                method: 'POST',
                body: JSON.stringify({ notebook: notebookId }),
            });
        }

        if (!response.ok) {
            throw new Error('Failed to get notebook name');
        }

        const data = await response.json();
        console.log(data);
        outLog(data);
        return data.data.conf.name;
    } catch (error) {
        console.error('Error getting notebook name:', error);
    }
}

// 1获取当前笔记的路径
//  这个api也可以直接获取文件内容，但这个api可能以后更新会失效，所以还是用另一个api获取文件内容
export async function getCurrentNotePath(docId: string, isDir = false, isUrl = false) {
    const index = docId.lastIndexOf('.');
    if (index !== -1) {
        docId = docId.substring(0, index);
    }
    try {
        let docResponse;
        if (isUrl) {
            docResponse = await fetch(`${url}/api/filetree/getDoc`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${token}`
                },
                body: JSON.stringify({ id: docId }),
            });
        } else {
            docResponse = await fetch('/api/filetree/getDoc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: docId }),
            });
        }

        if (!docResponse.ok) {
            throw new Error('Failed to get current document information');
        }

        const docData = await docResponse.json();
        outLog(docData, "getCurrentNotePath");
        notebookId = docData.data.box;
        if (isDir) {
            const notePath = "data/" + docData.data.box + docData.data.path;
            //去掉后缀
            const notePath2 = notePath.substring(0, notePath.lastIndexOf('.'));
            return notePath2;
        }
        const notePath = "data/" + docData.data.box + docData.data.path;
        // console.log('Current note path:', notePath);
        return notePath;
    } catch (error) {
        console.error('Error getting current note path:', error);
    }
}

export async function getCurrentNotePathById(docId: string, isDir = false, isUrl = false) {
    const index = docId.lastIndexOf('.');
    if (index !== -1) {
        docId = docId.substring(0, index);
    }
    try {
        let docResponse;
        if (isUrl) {
            docResponse = await fetch(`${url}/api/filetree/getPathByID`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${token}`
                },
                body: JSON.stringify({ id: docId }),
            });
        } else {
            docResponse = await fetch('/api/filetree/getPathByID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: docId }),
            });
        }

        if (!docResponse.ok) {
            throw new Error('Failed to get current document information');
        }

        const docData = await docResponse.json();
        outLog(docData, "getCurrentNotePath");
        notebookId = docData.data.box;
        if (isDir) {
            const notePath = "data" + docData.data;
            //TODO:这里返回路径没有笔记本的，需要知道笔记本的id才行
            //去掉后缀
            const notePath2 = notePath.substring(0, notePath.lastIndexOf('.'));
            return notePath2;
        }
        const notePath = "data" + docData.data;
        // console.log('Current note path:', notePath);
        return notePath;
    } catch (error) {
        console.error('Error getting current note path:', error);
    }
}



// 2导出笔记文字数据
export async function getNoteData(notePath: string, isUrl = false) {
    let response;
    if (isUrl) {
        response = await fetch(`${url}/api/file/getFile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            },
            body: JSON.stringify({ path: notePath }),
        });
    } else {
        response = await fetch(`/api/file/getFile`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ path: notePath }),
        });
    }
    if (response.ok) {
        const data = await response.text();
        console.log('成功获取笔记数据');
        outLog(response.status, "getNoteData");
        outLog(data, "getNoteData");
        return data; // 返回文件内容
    } else {
        console.log(JSON.stringify({ path: notePath }));
        throw new Error("Failed to get note data");

    }
}
// 3保存为文件并下载
export function saveNoteData(noteData: string, fileName: string) {
    console.log(noteData);
    const blob = new Blob([noteData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
//23
export async function hebing23(notePath: string) {
    try {
        const noteData = await getNoteData(notePath);
        const fileName = notePath.split('/').pop() || 'note.sy';
        console.log(noteData);
        saveNoteData(noteData, fileName);
        console.log("Note data download initiated successfully!");
    } catch (error) {
        console.error("Failed to transfer note:", error);
    }

}


// 导出笔记资源数据
//// 获取资源文件路径(用原文件不好提取路径，所以用md文件提取路径)
//////导出为md文件
export async function getmd(id: string, isUrl = false) {
    const index = id.lastIndexOf('.');
    if (index !== -1) {
        id = id.substring(0, index);
    }
    let response;
    if (isUrl) {
        response = await fetch(`${url}/api/export/exportMdContent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `token ${token}`
            },
            body: JSON.stringify({ id: id }),
        });
    } else {
        response = await fetch(`/api/export/exportMdContent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        });
    }
    if (response.ok) {
        console.log('成功获取笔记md数据');
        // console.log(response.status);
        const data = await response.json();
        outLog(data.data.content, "getmd");
        const link = extractResourceLinks(data.data.content);
        outLog(link, "getmd");

        return link;
        // return data.data.content; // 返回文件内容

    } else {
        console.log(JSON.stringify({ id: id }));
        throw new Error("Failed to get note md");
    }
}
//////提取链接
export function extractResourceLinks(content: string) {
    // 定义正则表达式来匹配资源文件路径
    //  const regex = /!\[.*?\]\((assets\/.*?\.(?:jpg|jpeg|png|gif))\)/g;
    const regex = /\[.*?\]\((assets\/.*?)\)/g;

    let matches;
    const links = [];

    // 使用正则表达式查找所有匹配项
    while ((matches = regex.exec(content)) !== null) {
        // 提取路径并添加到结果数组中
        links.push(matches[1]);
    }
    if (links.length === 0) {
        outLog('No resource links found in note', 'extractResourceLinks');
        return null;
    }
    const prefixedLinks = links.map(link => `data/${link}`);
    return prefixedLinks;
}
//////下载资源文件（直接下载，文件太大太多会出现bug）
//返回Blob对象资源文件
export async function downloadImage(imagePath: string): Promise<Blob | null> {
    // 定义请求的body
    const apiUrl = '/api/file/getFile'; // 资源文件下载API地址
    const downloadFileName = imagePath.split('/').pop() || 'note.sy';
    const requestBody = {
        path: imagePath
    };

    // 获取文件扩展名
    const fileExtension = downloadFileName.split('.').pop().toLowerCase();

    // 定义MIME类型映射
    const mimeTypes = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'bmp': 'image/bmp',
        'svg': 'image/svg+xml',
        'pdf': 'application/pdf',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'xls': 'application/vnd.ms-excel',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'ppt': 'application/vnd.ms-powerpoint',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'zip': 'application/zip',
        'rar': 'application/x-rar-compressed',
        '7z': 'application/x-7z-compressed'
    };
    // 获取对应的MIME类型，默认为'application/octet-stream'
    const mimeType = mimeTypes[fileExtension] || 'application/octet-stream';

    try {
        // 使用fetch调用API
        showMessage('下载资源文件中...', -1, 'info', '下载资源');
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            showMessage('网络错误，下载失败', -1, 'error', '下载资源');
            throw new Error('Network response was not ok');
        }
        const buffer = await response.arrayBuffer();
        // 将图片二进制数据转换为Blob对象
        const blob = new Blob([buffer], { type: mimeType });
        showMessage('资源文件下载成功', 6000, 'info', '下载资源');
        outLog(blob, "downloadImage");
        return blob;
    } catch (error) {
        showMessage('下载资源文件失败', -1, 'error', '下载资源');
        console.error("请求失败:", error);
        return null;
    }
}

export function downloadImageM(imagePath) {
    // 定义请求的body
    const apiUrl = '/api/file/getFile'; // 资源文件下载API地址
    const downloadFileName = imagePath.split('/').pop() || 'note.sy';
    const requestBody = {
        path: imagePath
    };

    // 获取文件扩展名
    const fileExtension = downloadFileName.split('.').pop().toLowerCase();

    // 定义MIME类型映射
    const mimeTypes = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'bmp': 'image/bmp',
        'svg': 'image/svg+xml'
    };

    // 获取对应的MIME类型，默认为'application/octet-stream'
    const mimeType = mimeTypes[fileExtension] || 'application/octet-stream';

    // 使用fetch调用API
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // 使用ReadableStream分块处理大文件
            const reader = response.body.getReader();
            const chunks = [];
            let receivedLength = 0;

            return new Promise((resolve, reject) => {
                function pump() {
                    reader.read().then(({ done, value }) => {
                        if (done) {
                            resolve({ chunks, receivedLength });
                            return;
                        }
                        chunks.push(value);
                        receivedLength += value.length;
                        pump();
                    }).catch(reject);
                }
                pump();
            });
        })
        .then(({ chunks, receivedLength }) => {
            console.log("Received buffer length:", receivedLength);
            // 将所有分块合并成一个ArrayBuffer
            const concatenated = new Uint8Array(receivedLength);
            let position = 0;
            for (const chunk of chunks) {
                concatenated.set(chunk, position);
                position += chunk.length;
            }
            // 将图片二进制数据转换为Blob对象
            const blob = new Blob([concatenated], { type: mimeType });

            // 创建一个URL对象
            const url = URL.createObjectURL(blob);

            // 创建一个a元素并设置下载属性
            const a = document.createElement('a');
            a.href = url;
            a.download = downloadFileName;

            // 触发下载
            document.body.appendChild(a);
            a.click();

            // 清理
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error("请求失败:", error);
        });
}
//////下载资源文件（打包zip再下载）
export async function exportResources(name, paths) {
    const apiUrl = '/api/export/exportResources';
    const requestBody = {
        name: name,
        paths: paths
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("ce");
        const result = await response.json();
        console.log(result);
        console.log(result.data.path);
        return result.data.path;
    } catch (error) {
        console.error('Error exporting resources:', error);
        throw error;
    }
}

// 导入笔记文字数据
export async function putFileContent(filePath: string, content: string, isUrl = true): Promise<void> {
    outLog(content, "putFileContent");
    const blob = new Blob([content], { type: 'text/plain' });
    const formData = new FormData();
    formData.append('path', filePath);
    // formData.append('file', blob, filePath.split('/').pop() || 'file');
    formData.append('file', blob);
    formData.append('isDir', 'false');
    // formData.append('modTime', new Date().toISOString());
    // console.log(formData);
    let response;
    if (isUrl) {
        response = await fetch(`${url}/api/file/putFile`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${token}`
            },
            body: formData
        });
    } else {
        response = await fetch('/api/file/putFile', {
            method: 'POST',
            body: formData
        });
    }

    if (!response.ok) {
        showMessage('网络错误，传输失败');
        throw new Error(`Failed to put file content: ${response.statusText}`);
    } else {
        response.json().then(data => {
            outLog(data);
            if (data.code === 0) {
                outLog('File content saved successfully!', 'putFileContent');
                showMessage('文本文件成功传输');
            } else {
                showMessage('文本文件传输失败，返回信息：' + data.msg);
                outLog('File content saved failed!', 'putFileContent');
            }
        });
        // console.log('File content saved successfully!');
    }
}

// 导入笔记资源数据(接受blob对象)
export async function putFileContentM(filePath: string, content, isUrl = true): Promise<void> {
    outLog(content, "putFileContentM");
    outLog('M', "putFileContentM");

    // const fileExtension = filePath.split('.').pop().toLowerCase();
    // // 定义MIME类型映射
    // console.log(fileExtension);
    // const mimeTypes = {
    //     'jpg': 'image/jpeg',
    //     'jpeg': 'image/jpeg',
    //     'png': 'image/png',
    //     'gif': 'image/gif',
    //     'webp': 'image/webp',
    //     'bmp': 'image/bmp',
    //     'svg': 'image/svg+xml'
    // };
    // const blob = new Blob([content], { type: mimeTypes[fileExtension] || 'application/octet-stream' });
    const blob = content;
    const formData = new FormData();
    formData.append('path', filePath);
    // formData.append('file', blob, filePath.split('/').pop() || 'file');
    formData.append('file', blob);//BUG:可能会出现bug
    formData.append('isDir', 'false');
    // formData.append('modTime', new Date().toISOString());
    // console.log(formData);
    let response;
    if (isUrl) {
        response = await fetch(`${url}/api/file/putFile`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${token}`
            },
            body: formData
            // body: JSON.stringify(formData)
        });
    } else {
        response = await fetch('/api/file/putFile', {
            method: 'POST',
            body: formData
        });
    }

    if (!response.ok) {
        showMessage('网络错误，传输失败');
        throw new Error(`Failed to put file content: ${response.statusText}`);

    } else {
        response.json().then(data => {
            console.log(data);

            if (data.code === 0) {
                outLog('File content saved successfully!', 'putFileContentM');
                showMessage('资源文件成功传输');
            } else {
                showMessage('资源传输失败，返回信息：' + data.msg, -1, 'error');
                outLog('File content saved failed!', 'putFileContentM');
            }
        });

    }
}

//刷新文件树
export async function refreshURL() {
    await fetch(`${url}/api/filetree/refreshFiletree`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        }
    });
}
export async function refresh() {
    await fetch(`/api/filetree/refreshFiletree`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `token ${token}`
        }
    });
}

//处理数据库资源文件
export async function handleDbResource(currentDocId) {
    //获取笔记文件数据
    const data = await getNoteData(await getCurrentNotePath(currentDocId, false, true), true);
    //将json字符串转换为json对象，并输出
    //BUG
    //提取数据库资源文件路径
    const dbResourcePaths = extractDbResourcePaths(data);
    outLog(dbResourcePaths, "handleDbResource");
    if (dbResourcePaths) {
        for (const dbResourcePath of dbResourcePaths) {
            console.log(dbResourcePath);
            await putFileContent(dbResourcePath, await getNoteData(dbResourcePath), false);
        }
    } else {
        console.log("没有数据库资源文件");
        showMessage("没有数据库资源文件");
    }
}




//提取数据库资源文件路径
function extractDbResourcePaths(content: string) {
    const regex = /"AttributeViewID":\s*"([^"]+)"/g;
    const attributeViewIDs = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
        attributeViewIDs.push(match[1]);
    }
    if (attributeViewIDs.length === 0) {
        outLog('No resource links found in note', 'extractResourceLinks');
        return null;
    }
    //给数组每个元素加上data/storage/av/前缀
    const prefixedPaths = attributeViewIDs.map(id => `data/storage/av/${id}.json`);
    return prefixedPaths;
}


//传输标记和锁定只读功能方法
export async function transferLockAndReadonlyDBUG(currentDocId) {
    const data = await getNoteData(await getCurrentNotePath(currentDocId));
    const transformedData = transferLockAndReadonly(data);
    console.log(transformedData);
}

export async function transferLockAndReadonly(jsonString) {
    // 将JSON字符串转换为对象
    let originalJson = JSON.parse(jsonString);

    // 修改Properties属性
    originalJson.Properties["custom-sy-readonly"] = "true";
    originalJson.Properties["tags"] = "传输";

    // 将对象转换回单行JSON字符串并返回
    return JSON.stringify(originalJson);
    // return JSON.stringify(originalJson, null, 2);
}


//全量导出所有数据
//远程导出全量资源数据，返回zip文件路径
export async function exportAllDataPathURL() {
    showMessage('远程全量导出中...', -1, 'info', '远程导出');
    const response = await fetch(`${url}/api/export/exportData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        }

    });
    if (response.ok) {
        const data = await response.json();
        outLog(data);
        if (data.code === 0) {
            showMessage('远程全量导出成功', 6000, 'info', '远程导出');
            const link = '/temp' + data.data.zip;
            const link1 = decodeURIComponent(link);
            outLog(link1, "exportAllDataPathURL");
            return link1;
        } else {
            showMessage('远程全量导出失败，返回信息：' + data.msg, -1, 'error', '远程导出');
            console.log('远程全量导出失败，返回信息：' + data.msg);
            return null;
        }
    } else {
        showMessage('远程全量导出失败,网络错误', -1, 'error', '远程导出');
        console.log('远程全量导出失败,网络错误');
        return null;
    }
}

//本地导出全量资源数据，返回zip文件路径
export async function exportAllDataPath() {
    showMessage('全量导出中...', -1, 'info', '全量导出');
    const response = await fetch(`/api/export/exportData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        outLog(data);
        if (data.code === 0) {
            showMessage('全量导出成功', 6000, 'info', '全量导出');
            const link = '/temp' + data.data.zip;
            outLog(link, "exportAllDataPath");
            const link2 = decodeURIComponent(link);
            outLog(link2, "exportAllDataPath");
            return link2;
        } else {
            showMessage('全量导出失败，返回信息：' + data.msg, -1, 'error', '全量导出');
            console.log('全量导出失败，返回信息：' + data.msg);
            return null;
        }
    } else {
        showMessage('全量导出失败,网络错误', -1, 'error', '全量导出');
        console.log('全量导出失败,网络错误');
        return null;
    }
}



//拉取相关方法

export async function getNoteDataURL(notePath: string) {
    const response = await fetch(`${url}/api/file/getFile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `token ${token}`
        },
        body: JSON.stringify({ path: notePath }),
    });
    if (response.ok) {
        const data = await response.text();
        console.log('成功获取笔记数据');
        outLog(response.status, "getNoteData");
        outLog(data, "getNoteData");
        return data; // 返回文件内容
    } else {
        console.log(JSON.stringify({ path: notePath }));
        throw new Error("Failed to get note data");
    }
}

//远程拉取资源
export async function downloadImageURL(imagePath: string): Promise<Blob | null> {
    // 定义请求的body
    const apiUrl = `${url}/api/file/getFile`; // 资源文件下载API地址
    const downloadFileName = imagePath.split('/').pop() || 'note.sy';
    const requestBody = {
        path: imagePath
    };

    // 获取文件扩展名
    const fileExtension = downloadFileName.split('.').pop().toLowerCase();

    // 定义MIME类型映射
    const mimeTypes = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'bmp': 'image/bmp',
        'svg': 'image/svg+xml',
        'pdf': 'application/pdf',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'xls': 'application/vnd.ms-excel',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'ppt': 'application/vnd.ms-powerpoint',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'zip': 'application/zip',
        'rar': 'application/x-rar-compressed',
        '7z': 'application/x-7z-compressed'
    };

    // 获取对应的MIME类型，默认为'application/octet-stream'
    const mimeType = mimeTypes[fileExtension] || 'application/octet-stream';

    try {
        // 使用fetch调用API
        showMessage('正在远程下载资源...', -1, 'info', '远程下载资源');
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            showMessage('网络错误，下载失败', -1, 'error', '远程下载资源');
            throw new Error('Network response was not ok');
        }
        // const buffer = await response.blob();

        const buffer = await response.arrayBuffer();
        // 将图片二进制数据转换为Blob对象
        outLog(buffer, "downloadImageURL");
        const blob = new Blob([buffer], { type: mimeType });
        outLog('fanhuiblob', "downloadImageURL");
        outLog(blob, "downloadImageURL");
        // downloadBlob(blob);
        // importAllDataURL(blob);
        showMessage('远程下载资源成功', 6000, 'info', '远程下载资源');
        return blob;
    } catch (error) {
        showMessage('下载失败', -1, 'error', '远程下载资源');
        console.error("请求失败:", error);
        return null;
    }
}

//DBUG 下载blob对象
export function downloadBlob(blob, fileName = 'download.zip') {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

//导入全量笔记数据
export async function importAllDataURL(blob: Blob) {
    const file = new File([blob], 'data.zip', { type: 'application/zip' });
    const formData = new FormData();
    formData.append('file', file);
    showMessage('正在远程导入全量数据...', -1, 'info', '远程导入全量数据');
    const response = await fetch(`${url}/api/import/importData`, {
        method: 'POST',
        headers: {
            'Authorization': `token ${token}`
        },
        body: formData
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.code === 0) {
            showMessage('全量数据导入成功', 6000, 'info', '远程导入全量数据');
        } else {
            showMessage('全量数据导入失败，返回信息：' + data.msg, -1, 'error', '远程导入全量数据');
        }
    } else {
        showMessage('全量数据导入失败，网络错误', -1, 'error', '远程导入全量数据');
        console.log('全量数据导入失败');
    }
}

export async function importAllData(blob: Blob) {
    const file = new File([blob], 'data.zip', { type: 'application/zip' });
    const formData = new FormData();
    formData.append('file', file);
    showMessage('正在导入全量数据...', -1, 'info', '导入全量数据');
    const response = await fetch(`/api/import/importData`, {
        method: 'POST',
        headers: {
            // 'Authorization': `token ${token}`
        },
        body: formData
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.code === 0) {
            showMessage('全量数据导入成功', 6000, 'info', '导入全量数据');
        } else {
            showMessage('全量数据导入失败，返回信息：' + data.msg, -1, 'error', '导入全量数据');
        }
    } else {
        showMessage('全量数据导入失败，网络错误', -1, 'error', '导入全量数据');
        console.log('全量数据导入失败');
    }
}


//备份全量数据到alist
/**
 * 执行AList流式上传的函数
 * @param {string} filePath - 在AList中的目标路径
 */
// 9/16 2024 更新：返回文件路径到剪切板
// 11/16 2021 更新：尝试重构(failure)（success）
export async function uploadToAList(blob, filePath) {
    if (beta) {
        try {
            const FileName = filePath.split('/').pop()
            const file = new File([blob], FileName, { type: 'application/zip' });
            // 创建用于上传的FormData对象
            const formData = new FormData();
            formData.append('file', file);
            const token2 = await getToken(alistname, alistmima);
            const xhr = new XMLHttpRequest();
            xhr.open('put', `${alistUrl}/api/fs/form`);//TODO：用/put流式上传api会乱码，但是这里却没问题，有时间再研究
            // 设置请求头
            xhr.setRequestHeader('Authorization', token2); 
            xhr.setRequestHeader('File-Path', encodeURIComponent(filePath));
            xhr.setRequestHeader('As-Task', 'true'); // 根据需要添加其他头部
            // 监听上传进度
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    showMessage(`上传进度: ${percentComplete.toFixed(2)}%`,-1,'info','beta');
                    console.log(`上传进度: ${percentComplete.toFixed(2)}%`); 
                }
            });

            // 监听上传成功
            xhr.onload = () => {
                if (xhr.status === 200) {
                    showMessage(`上传成功`,3000,'info','beta');
                    console.log('上传成功');
                } else {
                    console.error('上传失败:', xhr.statusText);
                }
            };

            // 监听上传失败
            xhr.onerror = () => {
                console.error('上传过程中发生错误请重试');
            };

            // 发送请求
            xhr.send(formData);

        } catch (error) {
            console.error('上传出现异常请重试:', error);
        }

    } else {
        try {
            const FileName = filePath.split('/').pop()
            const file = new File([blob], FileName, { type: 'application/zip' });
            // 创建用于上传的FormData对象
            const formData = new FormData();
            formData.append('file', file);
            outLog(file.name);
            const token2 = await getToken(alistname, alistmima);
            showMessage('正在备份到AList...', -1, 'info', '备份到AList');
            const response = await fetch(`${alistUrl}/api/fs/put`, {  //TODO：用/put流式上传api会乱码
                method: 'PUT',
                headers: {
                    'Authorization': token2,
                    'File-Path': encodeURIComponent(filePath),
                    'Content-Type': 'application/octet-stream',
                    'Content-Length': String(file.size),
                    'As-Task': 'true'
                },
                body: file
            });

            // 检查响应并返回结果
            console.log(file.name, "asdas");
            console.log(response, "asdas");
            if (response.status === 200) {
                const result = await response.json();
                if (result.code === 200) {
                    showMessage('备份到alist成功', 6000, 'info', '备份到AList');
                    // 9/16 2024 更新：返回文件路径到剪切板
                    var markdownLink = `[${FileName}](${alistUrl}${filePath})`;
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(markdownLink).then(function () {
                            outLog('Markdown链接已复制到剪贴板', 'uploadToAList');
                            showMessage('文件链接已复制到剪贴板', 1000);

                        }).catch(function (err) {
                            console.error('无法复制链接: ', err);
                            // 可以在这里添加一个错误提示
                            // showMessage('复制链接', 6000, 'error');
                        });
                    }

                    console.log("Upload successful.");
                } else {
                    showMessage('备份到AList失败:' + result.message, -1, 'error', '备份到AList');
                    console.log(`Upload failed. Status code: ${response.status} - Message: ${result.message}`);
                }
            } else {
                showMessage('备份到AList失败:' + await response.text(), -1, 'error', '备份到AList');
                console.log(`Upload failed. Status code: ${response.status} - Message: ${await response.text()}`);
            }
        } catch (error) {
            showMessage('备份到AList失败:' + error.message, -1, 'error', '备份到AList');
            console.error('上传出错:', error);
            throw error; // 将错误向上抛出
        }
    }
}

async function getToken(username, password) {
    const url = `${alistUrl}/api/auth/login`;
    const data = { Username: username, Password: password };
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log(result);
    return result.data.token;
}

export async function checkAlistConnection(username, password) {
    try {
        const response = await fetch(`${alistUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Username: username, Password: password })
        });

        if (response.status === 200) {
            const result = await response.json();
            if (result.code === 200) {
                showMessage('AList 连接成功');
                console.log('AList 连接成功');
                return true;
            } else {
                showMessage('AList 连接失败，用户名或密码错误');
                console.log('AList 连接失败:', result.message);
                return false;
            }
        } else {
            showMessage('AList 连接失败，网络错误');
            console.log('AList 连接失败，状态码:', response.status);
            return false;
        }
    } catch (error) {
        showMessage('AList 连接失败，网络错误');
        console.error('AList 连接失败，错误:', error);
        return false;
    }
}

export function isUrlContained(targetUrl, standardUrl) {
    // 将传入的网址转换为 URL 对象
    let target = new URL(targetUrl);
    let standard = new URL(standardUrl);

    // 比较协议、主机和路径
    if (target.protocol === standard.protocol &&
        target.hostname === standard.hostname &&
        target.pathname.startsWith(standard.pathname)) {
        return true;
    }

    return false;
}

//插入文档方法
export function insertDoc() {

}

//获取时间
export function getDateTime() {
    const date = new Date();
    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${hour}:${minute}:${second}`;
}

export function scheduleDailyTask(time, task) {
    // 解析输入的时间字符串
    const timeParts = time.split('/');

    // 检查时间字符串的格式
    if (timeParts.length !== 2) {
        showMessage('alist备份时间格式错误，正确格式为 "小时/分钟"', -1, "error");
        throw new Error('时间格式错误，正确格式为 "小时/分钟"');
    }

    const hour = Number(timeParts[0]);
    const minute = Number(timeParts[1]);

    // 检查小时和分钟的有效性
    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        showMessage('alist备份时间小时或分钟无效，请确保小时在0-23之间，分钟在0-59之间', -1, "error");
        throw new Error('小时或分钟无效，请确保小时在0-23之间，分钟在0-59之间');
    }

    outLog(`${hour} ${minute}`, 'scheduleDailyTask');
    function executeTask() {
        // 执行传入的任务
        task();

        // 获取当前时间
        const now = new Date();

        // 设置下一次执行的时间
        const nextExecutionTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1, // 下一天
            hour,
            minute,
            0 // 秒
        );

        // 计算距离下一次执行的时间差（毫秒）
        const timeUntilNextExecution = nextExecutionTime.getTime() - now.getTime();
        console.log(`任务将在 ${hour}:${minute} 执行，距禿下次执行还有 ${timeUntilNextExecution / 1000} 秒`, '111111111');
        // 设置定时器，等待时间差后再次执行
        setTimeout(executeTask, timeUntilNextExecution);
    }

    // 获取当前时间
    const now = new Date();

    // 设置今天的目标时间
    const targetTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hour,
        minute,
        0 // 秒
    );

    // 如果当前时间已经过了目标时间，则设置为明天的目标时间
    if (now > targetTime) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    // 计算距离目标时间的时间差（毫秒）
    const timeUntilTarget = targetTime.getTime() - now.getTime();
    console.log(`任务将在 ${hour}:${minute} 执行，距离下次执行还有 ${timeUntilTarget / 1000} 秒`, 'sad');
    showMessage(`alist备份任务将在 ${hour}:${minute} 执行，距离下次执行还有 ${timeUntilTarget / 1000} 秒`);
    // 设置定时器，等待时间差后执行任务
    setTimeout(executeTask, timeUntilTarget);
}


// export function setupFileUpload() {
//     `<!DOCTYPE html>
// <html lang="zh-CN">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <style>
//         .upload-container {
//             width: 300px;
//             height: 150px;
//             border: 2px dashed #fff;
//             border-radius: 10px;
//             background-color: #333;
//             display: flex;
//             flex-direction: column;
//             justify-content: center;
//             align-items: center;
//             color: #fff;
//             font-size: 16px;
//             cursor: pointer;
//             text-align: center;
//         }

//         .upload-container:hover {
//             background-color: #444;
//         }

//         .upload-input {
//             display: none;
//         }
//     </style>
//     <title>文件上传</title>
// </head>
// <body>
//     <div id="uploadContainer" class="upload-container">
//         <div>+</div>
//         <div>点击或拖拽文件到此处上传</div>
//     </div>
// </body>
// </html>
// `

// function setupFileUpload(containerId, inputId) {
//     const uploadContainer = document.getElementById(containerId);
//     const fileInput = document.getElementById(inputId);

//     // 点击上传区域触发文件选择
//     uploadContainer.addEventListener('click', () => {
//         fileInput.click();
//     });

//     // 处理文件选择
//     fileInput.addEventListener('change', (event) => {
//         const files = event.target.files;
//         alert(`选择了 ${files.length} 个文件`);
//     });

//     // 拖拽上传处理
//     uploadContainer.addEventListener('dragover', (event) => {
//         event.preventDefault();
//         uploadContainer.style.backgroundColor = '#555'; // 改变背景色以显示拖拽效果
//     });

//     uploadContainer.addEventListener('dragleave', () => {
//         uploadContainer.style.backgroundColor = '#333'; // 恢复原背景色
//     });

//     uploadContainer.addEventListener('drop', (event) => {
//         event.preventDefault();
//         uploadContainer.style.backgroundColor = '#333'; // 恢复原背景色
//         const files = event.dataTransfer.files;
//         alert(`拖拽上传了 ${files.length} 个文件`);
//     });
// }

//     // 调用方法
//     setupFileUpload('uploadContainer', 'fileInput');

// }






//   // 首次插入倒计时显示元素到 #toolbar > #drag 元素旁边

//   const uploadContainer = document.getElementById('uploadContainer');
//   const fileInput = document.getElementById('fileInput');

//   // 点击上传区域触发文件选择
//   uploadContainer.addEventListener('click', () => {
//       fileInput.click();
//   });

//   // 处理文件选择
//   fileInput.addEventListener('change', (event) => {
//       const files = event.target.files;
//       alert(`选择了 ${files.length} 个文件`);
//   });

//   // 拖拽上传处理
//   uploadContainer.addEventListener('dragover', (event) => {
//       event.preventDefault();
//       uploadContainer.style.backgroundColor = '#555'; // 改变背景色以显示拖拽效果
//   });

//   uploadContainer.addEventListener('dragleave', () => {
//       uploadContainer.style.backgroundColor = '#333'; // 恢复原背景色
//   });

//   uploadContainer.addEventListener('drop', (event) => {
//       event.preventDefault();
//       uploadContainer.style.backgroundColor = '#333'; // 恢复原背景色
//       const files = event.dataTransfer.files;
//       alert(`拖拽上传了 ${files.length} 个文件`);
//   });


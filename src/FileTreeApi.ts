import { url, token } from './index';
import * as api from './api';
import * as myapi from './myapi';
import { selectedOption } from './app.vue';
import { showMessage } from 'siyuan';

// import { showMessage } from 'siyuan';
export async function ceshi() {
    console.log('ceshi');
    const res = await api.lsNotebooks();
    console.log(res);
    const res2 = await api.readDir("data/20240827231422-iiuknu8");
    console.log(res2);
    const res3 = await api.getHPathByPath("20240827231422-iiuknu8", "/20240827231424-o1erwwg.sy");
    console.log(res3);
}

export async function getFileTreeData() {
    // 获取笔记本列表
    try {
        const notebooksResponse = await fetch(`${url}/api/notebook/lsNotebooks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            },
            body: JSON.stringify({})
        });
        const notebooksData = await notebooksResponse.json();
        if (notebooksData.code !== 0) {
            throw new Error(notebooksData.msg);
        }


        const fileTreeData = [];


        for (const notebook of notebooksData.data.notebooks) {
            // console.log(selectedOption.value);
            if (selectedOption.value !== notebook.name) {
                continue;
            }
            // 获取每个笔记本的文件和文件夹列表
            const readDirResponse = await fetch(`${url}/api/file/readDir`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${token}`
                },
                body: JSON.stringify({ path: `data/${notebook.id}` })
            });
            const readDirData = await readDirResponse.json();
            if (readDirData.code !== 0) {
                throw new Error(readDirData.msg);
            }

            const children = await processDirectory(notebook.id, readDirData.data);


            fileTreeData.push({
                id: notebook.id,
                name: notebook.name,
                type: 'folder',
                expanded: false,
                children: children
            });

        }

        return fileTreeData;
    } catch (error) {
        console.error(error);
        // showMessage("获取文件树失败,请检查配置");
        return [{"name": "获取文件树失败,请检查配置"}];
    }
}

async function processDirectory(notebookId, items) {
    const children = [];


    for (const item of items) {
        if (item.name === ".siyuan") {
            continue;
        }

        if (item.isDir) {
            const readDirResponse = await fetch(`${url}/api/file/readDir`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${token}`
                },
                // body: JSON.stringify({ path: `data/${notebookId}/${item.name}` })
                body: JSON.stringify({ path: `${await myapi.getCurrentNotePath(item.name, item.isDir, true)}` })
                //TODO: 以后优化速度，不调用这个api，它返回的内容比较多

            });
            const readDirData = await readDirResponse.json();
            if (readDirData.code !== 0) {
                throw new Error(readDirData.msg);
            }

            const subChildren = await processDirectory(notebookId, readDirData.data);


            children.push({
                box: notebookId,
                id: item.name,
                name: await GetNameByID(item.name),
                type: 'folder',
                expanded: false,
                children: subChildren
            });
        } else {
            children.push({
                box: notebookId,
                id: item.name,
                name: await GetNameByID(item.name),
                type: 'file'
            });
        }
    }

    return children;
}

async function GetNameByID(id: string) {
    //判断是否有后缀名，若有则去掉后缀名
    const index = id.lastIndexOf('.');
    if (index !== -1) {
        id = id.substring(0, index);
    }
    const res = await fetch(`${url}/api/filetree/getHPathByID`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${token}`
        },
        body: JSON.stringify({ id: id })
    });
    const data = await res.json();
    if (data.code !== 0) {
        throw new Error(data.msg);
    }
    console.log(data.data);
    const name = data.data.split('/').pop();
    return name;
}

export async function listNotebooks() {
    try {
        const notebooksResponse = await fetch(`${url}/api/notebook/lsNotebooks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${token}`
            },
            body: JSON.stringify({})
        });
        const notebooksData = await notebooksResponse.json();
        if (notebooksData.code !== 0) {
            showMessage("获取目标源笔记本列表失败,请检查配置");
            throw new Error(notebooksData.msg);
        }
        return notebooksData.data.notebooks;
    } catch (error) {
        console.error(error);
        showMessage("获取目标源笔记本列表失败,请检查配置");
        return [];
    }
}
import { showMessage } from 'siyuan';
import { state } from '@/core/state';
import { outLog } from '@/core/logger';

let cachedToken = '';

async function ensureToken(): Promise<string> {
    if (cachedToken) return cachedToken;
    cachedToken = await login(state.config.alistUsername, state.config.alistPassword);
    return cachedToken;
}

export function clearToken() {
    cachedToken = '';
}

async function login(username: string, password: string): Promise<string> {
    const res = await fetch(`${state.config.alistUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Username: username, Password: password }),
    });
    const result = await res.json();
    outLog(result);
    return result.data.token;
}

export async function checkConnection(username: string, password: string): Promise<boolean> {
    try {
        const res = await fetch(`${state.config.alistUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Username: username, Password: password }),
        });
        if (res.status === 200) {
            const result = await res.json();
            if (result.code === 200) {
                showMessage('AList 连接成功');
                return true;
            }
            showMessage('AList 连接失败，用户名或密码错误');
            return false;
        }
        showMessage('AList 连接失败，网络错误');
        return false;
    } catch {
        showMessage('AList 连接失败，网络错误');
        return false;
    }
}

export async function uploadWithProgress(
    blob: Blob | File,
    filePath: string,
    onSuccess?: () => Promise<void>,
) {
    const fileName = filePath.split('/').pop()!;
    const file = blob instanceof File ? blob : new File([blob], fileName, { type: 'application/zip' });
    const token = await ensureToken();

    if (state.config.beta) {
        return uploadViaForm(file, filePath, token, onSuccess);
    }
    return uploadViaStream(file, filePath, token, onSuccess);
}

async function uploadViaForm(
    file: File,
    filePath: string,
    token: string,
    onSuccess?: () => Promise<void>,
) {
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('put', `${state.config.alistUrl}/api/fs/form`);
    xhr.setRequestHeader('Authorization', token);
    xhr.setRequestHeader('File-Path', encodeURIComponent(filePath));
    xhr.setRequestHeader('As-Task', 'true');

    xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
            const pct = ((e.loaded / e.total) * 100).toFixed(2);
            showMessage(`上传进度: ${pct}%`, -1, 'info', 'beta');
        }
    });

    xhr.onload = async () => {
        if (xhr.status === 200) {
            showMessage('上传成功', 3000, 'info', 'beta');
            if (onSuccess) await onSuccess();
        } else {
            console.error('上传失败:', xhr.statusText);
        }
    };

    xhr.onerror = () => console.error('上传过程中发生错误请重试');
    xhr.send(formData);
}

async function uploadViaStream(
    file: File,
    filePath: string,
    token: string,
    onSuccess?: () => Promise<void>,
) {
    const fileName = file.name;
    showMessage('正在备份到AList...', -1, 'info', '备份到AList');

    const res = await fetch(`${state.config.alistUrl}/api/fs/put`, {
        method: 'PUT',
        headers: {
            'Authorization': token,
            'File-Path': encodeURIComponent(filePath),
            'Content-Type': 'application/octet-stream',
            'Content-Length': String(file.size),
            'As-Task': 'true',
        },
        body: file,
    });

    if (res.status === 200) {
        const result = await res.json();
        if (result.code === 200) {
            showMessage('备份到alist成功', 6000, 'info', '备份到AList');
            if (onSuccess) await onSuccess();
            const link = `[${fileName}](${state.displayUrl}${filePath})`;
            try {
                await navigator.clipboard.writeText(link);
                showMessage('文件链接已复制到剪贴板', 1000);
            } catch { /* ignore */ }
        } else {
            showMessage('备份到AList失败:' + result.message, -1, 'error', '备份到AList');
        }
    } else {
        showMessage('备份到AList失败:' + await res.text(), -1, 'error', '备份到AList');
    }
}

export async function getSign(filePath: string) {
    const token = await ensureToken();
    const maxRetries = 10;
    const retryDelay = 500;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const res = await fetch(`${state.config.alistUrl}/api/fs/get`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({ path: filePath, refresh: true }),
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();
            if (data.code === 200) {
                showMessage('获取链接成功', 1, 'info', 'alistgetSign');
                return data;
            }

            showMessage(`获取链接出了点问题：${data.message}，正在重试 (${attempt}/${maxRetries})`, -1, 'info', 'alistgetSign');
            if (attempt < maxRetries) {
                await new Promise(r => setTimeout(r, retryDelay));
            } else {
                throw new Error(`获取链接失败：${data.message}`);
            }
        } catch (error: any) {
            if (attempt < maxRetries) {
                showMessage(`获取链接出了点问题：${error.message}，正在重试 (${attempt}/${maxRetries})`, -1, 'info', 'alistgetSign');
                await new Promise(r => setTimeout(r, retryDelay));
            } else {
                showMessage(`获取直链失败：${error.message}，自动改为插入普通链接`, -1, 'error', 'alistgetSign');
                throw error;
            }
        }
    }
}

export async function mkdir(dir: string) {
    const token = await ensureToken();
    const res = await fetch(`${state.config.alistUrl}/api/fs/mkdir`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ path: dir }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
}

export async function rename(pathName: string, newName: string) {
    const token = await ensureToken();
    const res = await fetch(`${state.config.alistUrl}/api/fs/rename`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ name: newName, path: pathName }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
}

export async function deleteFile(dir: string, name: string, recycleBin?: string) {
    const recycleDir = recycleBin || `${state.config.uploadPath}/回收站`;
    await mkdir(recycleDir);

    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
    const newName = `${timestamp}-${name}`;
    const renameResult = await rename(`${dir}/${name}`, newName);

    if (renameResult.code !== 200) {
        showMessage(`alist文件${name}未找到（可能已经删除过了）`, -1, 'error');
        return renameResult;
    }

    const token = await ensureToken();
    const res = await fetch(`${state.config.alistUrl}/api/fs/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ src_dir: dir, dst_dir: recycleDir, names: [newName] }),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    if (data.code === 200) {
        showMessage(`文件${name}已移动到回收站，请手动删除笔记中的链接`, 6000, 'info');
    } else {
        showMessage(`文件${name}移动失败${data.message}，请重试`, -1, 'error');
    }
    return data;
}

export async function getFileInfo(path: string) {
    const token = await ensureToken();
    const res = await fetch(`${state.config.alistUrl}/api/fs/get`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ path, password: '', page: 1, per_page: 0, refresh: false }),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
}

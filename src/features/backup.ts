import { showMessage } from 'siyuan';
import { state } from '@/core/state';
import { outLog } from '@/core/logger';
import { uploadWithProgress } from '@/services/alist-client';
import { getMimeType } from '@/utils/mime';

export async function exportAllDataPath(): Promise<string | null> {
    showMessage('全量导出中...', -1, 'info', '全量导出');
    const res = await fetch('/api/export/exportData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
        showMessage('全量导出失败,网络错误', -1, 'error', '全量导出');
        return null;
    }
    const data = await res.json();
    if (data.code !== 0) {
        showMessage('全量导出失败，返回信息：' + data.msg, -1, 'error', '全量导出');
        return null;
    }
    showMessage('全量导出成功', 6000, 'info', '全量导出');
    return decodeURIComponent('/temp' + data.data.zip);
}

export async function downloadFile(path: string): Promise<Blob | null> {
    const mimeType = getMimeType(path);
    try {
        showMessage('下载资源文件中...', -1, 'info', '下载资源');
        const res = await fetch('/api/file/getFile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path }),
        });
        if (!res.ok) {
            showMessage('网络错误，下载失败', -1, 'error', '下载资源');
            return null;
        }
        const buffer = await res.arrayBuffer();
        showMessage('资源文件下载成功', 6000, 'info', '下载资源');
        return new Blob([buffer], { type: mimeType });
    } catch (error) {
        showMessage('下载资源文件失败', -1, 'error', '下载资源');
        console.error('请求失败:', error);
        return null;
    }
}

export async function runBackup(filename: string) {
    showMessage('正在备份...', -1, 'info', '备份');
    outLog('runbackup');
    try {
        let resolvedName = filename;
        if (resolvedName.includes('${timeNow}')) {
            state.refreshTimestamp();
            resolvedName = resolvedName.replace('${timeNow}', state.timeNow);
        }
        const link = await exportAllDataPath();
        if (!link) return;
        const data = await downloadFile(link);
        if (!data) return;
        await uploadWithProgress(data, state.config.backupPath + '/' + resolvedName);
    } catch (error) {
        showMessage('备份失败!', -1, 'error', '备份');
        console.error('Failed to run backup:', error);
    }
    showMessage('备份结束!', 6000, 'info', '备份');
}

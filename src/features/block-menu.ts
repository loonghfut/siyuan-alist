import { confirm } from 'siyuan';
import { state } from '@/core/state';
import { outLog } from '@/core/logger';
import { deleteFile } from '@/services/alist-client';
import { isUrlContained, getFileNameFromUrl, getPathFromUrl } from '@/utils/url';
import { downloadFile } from './backup';
import { handleFileUpload, handleImageUpload } from './upload';
import { uploadWithProgress } from '@/services/alist-client';
import { uploadButtonHTML, deleteButtonHTML } from '@/ui/templates';
import { isImageFile } from '@/utils/mime';
import * as api from '@/api';

export function getCursorBlockId(): string | null {
    outLog('getCursorBlockId');
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return null;

    const range = selection.getRangeAt(0);
    let container: Node = range.startContainer;
    if (container.nodeType === Node.TEXT_NODE) {
        container = container.parentElement!;
    }
    if (!(container instanceof Element)) return null;

    const block = container.closest('.protyle-wysiwyg [data-node-id]');
    return block?.getAttribute('data-node-id') || null;
}

export function blockIconEventHandler({ detail }: any) {
    let linkUrl = '';
    const imgElement = detail.element.querySelector('img');
    if (imgElement) {
        linkUrl = imgElement.getAttribute('src');
    } else {
        linkUrl = detail.element.dataset.href;
    }

    if (linkUrl?.startsWith('assets')) {
        detail.menu.addItem({
            iconHTML: uploadButtonHTML,
            label: '',
            click: async () => {
                await uploadAttachment(linkUrl, detail);
            },
        });
    }

    if (linkUrl?.startsWith('http') && isUrlContained(linkUrl, state.config.alistUrl)) {
        detail.menu.addItem({
            iconHTML: deleteButtonHTML,
            label: '',
            click: async () => {
                confirm('确定要将附件移动到回收站吗？', '移动到回收站后，请手动删除笔记中的链接', () => {
                    deleteAttachment(linkUrl, detail);
                });
            },
        });
    }
}

async function uploadAttachment(linkUrl: string, detail: any) {
    const blob = await downloadFile(decodeURIComponent('data/' + linkUrl));
    if (!blob) return;
    const filename = linkUrl.split('/')[1];
    const file = new File([blob], filename, { type: blob.type, lastModified: Date.now() });
    const nodeId = detail.element.offsetParent.dataset.nodeId;

    await uploadWithProgress(file, `${state.config.uploadPath}/${state.today}/${filename}`);

    if (isImageFile(file)) {
        await handleImageUpload(file, nodeId);
    } else {
        await handleFileUpload(file, nodeId);
    }
}

async function deleteAttachment(linkUrl: string, detail: any) {
    const filename = getFileNameFromUrl(linkUrl, true);
    const path = getPathFromUrl(linkUrl);
    await deleteFile(path, filename);
    const kramdown = await api.getBlockKramdown(detail.element.offsetParent.dataset.nodeId);
    outLog(kramdown, '删除操作');
}

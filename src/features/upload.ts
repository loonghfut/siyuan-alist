import { state } from '@/core/state';
import { uploadWithProgress, getSign } from '@/services/alist-client';
import { isImageFile, isVideoFile } from '@/utils/mime';
import * as api from '@/api';

export function createFileInput() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '*/*';
    input.multiple = true;
    input.addEventListener('change', async (e) => {
        const files = (e.target as HTMLInputElement).files;
        if (!files || files.length === 0) return;
        for (const file of files) {
            if (isImageFile(file)) {
                await handleImageUpload(file);
            } else {
                await handleFileUpload(file);
            }
        }
    });
    input.click();
}

export async function handleFileUpload(file: File, blockId?: string) {
    const targetId = blockId || state.clickId;
    const parentId = targetId || state.currentDocId;
    const { uploadPath } = state.config;
    const filePath = `${uploadPath}/${state.today}/${file.name}`;

    await uploadWithProgress(file, filePath, async () => {
        if (isVideoFile(file) && state.config.autoInsertVideo) {
            let sign = '';
            try {
                const signData = await getSign(filePath);
                if (signData?.data?.sign) {
                    sign = '?sign=' + signData.data.sign;
                }
            } catch {
                api.appendBlock('markdown', `📄[${file.name}](${state.displayUrl}${filePath})`, parentId);
                return;
            }
            const videoHtml = `<video controls="controls" src="${state.displayUrl}/d${filePath}${sign}"></video>`;
            api.appendBlock(targetId ? 'markdown' : 'dom', videoHtml, parentId);
        } else {
            api.appendBlock('markdown', `📄[${file.name}](${state.displayUrl}${filePath})`, parentId);
        }
    });
}

export async function handleImageUpload(file: File, blockId?: string) {
    const targetId = blockId || state.clickId;
    const parentId = targetId || state.currentDocId;
    const { imagePath } = state.config;
    const filePath = `${imagePath}/${state.today}/${file.name}`;

    await uploadWithProgress(file, filePath, async () => {
        const signData = await getSign(filePath);
        let sign = '';
        if (signData?.data?.sign) {
            sign = '?sign=' + signData.data.sign;
        }
        api.appendBlock('markdown', `![${file.name}](${state.displayUrl}/d${filePath}${sign})`, parentId);
    });
}

export async function handleFileUploadWithoutLink(file: File) {
    await uploadWithProgress(file, state.config.uploadPath + '/' + file.name);
}

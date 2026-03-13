import { showMessage } from 'siyuan';
import { toolbarUploadCSS } from './templates';
import { createFileInput, handleFileUpload, handleImageUpload } from '@/features/upload';
import { isImageFile } from '@/utils/mime';

const UPLOAD_ICON_SVG = '上传<svg width="15" height="15"><use xlink:href="#iconAlist"></use></svg>附件';

export function insertToolbarUpload() {
    const toolbarDrag = document.querySelector('#toolbar > #drag');
    if (!toolbarDrag) {
        console.error('找不到 #toolbar > #drag 元素');
        return;
    }
    if (document.getElementById('uploadContainer')) return;

    // Inject CSS
    const style = document.createElement('style');
    style.textContent = toolbarUploadCSS;
    document.head.appendChild(style);

    // Create container element programmatically
    const container = document.createElement('div');
    container.id = 'uploadContainer';
    container.className = 'upload-container';

    const text = document.createElement('div');
    text.className = 'wd b3-list-item__text';
    text.innerHTML = UPLOAD_ICON_SVG;
    container.appendChild(text);

    toolbarDrag.insertAdjacentElement('afterend', container);

    container.addEventListener('click', (e) => {
        e.stopPropagation();
        createFileInput();
    });

    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        container.style.backgroundColor = '#70c6bea1';
        text.innerText = '松手上传';
    });

    container.addEventListener('dragleave', () => {
        container.style.backgroundColor = 'var(--b3-toolbar-hover)';
        text.innerHTML = UPLOAD_ICON_SVG;
    });

    container.addEventListener('drop', async (e) => {
        e.preventDefault();
        container.style.backgroundColor = 'var(--b3-toolbar-hover)';
        text.innerHTML = UPLOAD_ICON_SVG;

        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (isImageFile(file)) {
                await handleImageUpload(file);
            } else {
                await handleFileUpload(file);
            }
        } else {
            showMessage('没有文件', 1000);
        }
    });
}

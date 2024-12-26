import { showMessage } from "siyuan";
import SiYuanAlist, { alistToPath2, today, alistUrl, alistFilename } from ".";
import * as api from "./api";
import { fileUploadElement } from "./fileUploadElement";
import * as myapi from "./myapi";
import { downloadImage, outLog, uploadToAList } from "./myapi";

//右键删除附件
export async function runblockIconEventDelete(linkUrl:any ,detail: any) {
    // console.log(linkUrl,"linkUrl");
    if (!detail || !detail.element) {
        console.error("detail 或 detail.element 未定义");
        return;
    }
    const filename = myapi.getFileNameFromUrl(linkUrl, true);
    const path = myapi.getPathFromUrl(linkUrl);
    console.log(filename);
    console.log(path);
    // console.log("ces1", detail.element.dataset.href);
    myapi.alistDelete(path, filename);
    // console.log("ces2", detail.element.offsetParent);
    myapi.deletetxt(detail.element.offsetParent.dataset.nodeId);
    // api.deleteBlock(detail.element.offsetParent.dataset.nodeId);
}//根据光标获取块ID


export function getCursorBlockId() {
    outLog("getCursorBlockId");
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return null;

    const range = selection.getRangeAt(0);
    let container = range.startContainer;

    // 如果 startContainer 是文本节点，则获取其父元素
    if (container.nodeType === Node.TEXT_NODE) {
        container = container.parentElement;
    }

    // 确保 container 是一个元素节点
    if (!(container instanceof Element)) {
        return null;
    }

    const blockElement = container.closest('.protyle-wysiwyg [data-node-id]');

    if (blockElement) {
        console.log(blockElement.getAttribute('data-node-id'));
        return blockElement.getAttribute('data-node-id');
    } else {
        return null;
    }
}
//右键上传附件
export async function runblockIconEvent(linkUrl: any, detail: any) {
    // console.log(decodeURIComponent("data/" + linkUrl));
    const blob = await downloadImage(decodeURIComponent("data/" + linkUrl));
    const filename = linkUrl.split("/")[1];
    const file = new File([blob], filename, { type: blob.type, lastModified: Date.now() });
    await uploadToAList(file, alistToPath2 + "/" + today + "/" + filename);
    // api.appendBlock('markdown', `📄[${filename}](${alistUrl}${alistToPath2}/${today}/${filename})`, detail.element.offsetParent.dataset.nodeId);
    if (file.type.startsWith('image')) {
        await SiYuanAlist.handleImageUpload(file, detail.element.offsetParent.dataset.nodeId);
    } else {
        await SiYuanAlist.handleFileUpload(file, detail.element.offsetParent.dataset.nodeId);
    }
    // console.log("ces1", detail.element.dataset.href);
    // console.log("ces2", detail.element.offsetParent.dataset.nodeId);
}
export function insertCountdownElement() {
    let toolbarDrag = document.querySelector('#toolbar > #drag');
    if (toolbarDrag) {
        toolbarDrag.insertAdjacentHTML(
            "afterend",
            fileUploadElement
        );
    } else {
        console.error("找不到 #toolbar > #drag 元素");
    }
    const uploadContainer = document.getElementById('uploadContainer');
    const textElement = uploadContainer.querySelector('.wd') as HTMLElement; // 获取子元素
    uploadContainer.addEventListener('click', () => {
        SiYuanAlist.createFileInput();
    });

    // 文件选择事件处理

    uploadContainer.addEventListener('dragover', (event) => {
        event.preventDefault();
        uploadContainer.style.backgroundColor = '#70c6bea1'; // 改变背景色以显示拖拽效果

        // uploadContainer.style.border = '12px dashed #42625f6e'; // 显示虚线边框
        if (textElement) {
            textElement.innerText = '松手上传'; // 或者使用 textContent
        }
    });

    uploadContainer.addEventListener('dragleave', () => {
        uploadContainer.style.backgroundColor = 'var(--b3-toolbar-hover)'; // 恢复原背景色
        if (textElement) {
            textElement.innerHTML = '上传<svg width="15" height="15"><use xlink:href="#iconAlist"></use></svg>附件'; // 或者使用 textContent
        }
    });

    uploadContainer.addEventListener('drop', async (event) => {
        event.preventDefault();
        uploadContainer.style.backgroundColor = 'var(--b3-toolbar-hover)'; // 恢复原背景色
        if (textElement) {
            textElement.innerHTML = '上传<svg width="15" height="15"><use xlink:href="#iconAlist"></use></svg>附件'; // 或者使用 textContent
        }
        const files = event.dataTransfer.files; // 获取拖拽的文件列表
        if (files && files.length > 0) {
            const file = files[0]; // 获取选中的第一个文件
            if (file.type.startsWith('image')) {
                await SiYuanAlist.handleImageUpload(file);
            } else {
                await SiYuanAlist.handleFileUpload(file);
            }
        } else {
            console.log("没有文件");
            showMessage("没有文件", 1000);
        }
    });
}
export function buildFilenameInputElement(): string {
    return `<style>
            #alistFilename {
                width: 100%;
                padding: 4px;
                color: #fff; /* 设置文字为白色 */
                background-color: #333; /* 设置背景颜色为深色 */
                border: 1px solid #007BFF;
                border-radius: 4px;
                font-size: 14px;
                outline: none;
            }
            #alistFilename:focus {
                border-color: #007BFF;
                box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
            }
        </style>
        文件名: <input type="text" id="alistFilename" value="${alistFilename}">`;
}


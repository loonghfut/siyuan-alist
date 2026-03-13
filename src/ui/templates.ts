export const uploadButtonHTML = `<style>
    .wd {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
    }
</style>
<div class="wd b3-list-item__text">上传<svg width="15" height="15">
    <use xlink:href="#iconAlist"></use>
</svg>附件</div>`;

export const deleteButtonHTML = `<style>
    .wd {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
    }
</style>
<div class="wd b3-list-item__text">删除<svg width="15" height="15">
    <use xlink:href="#iconAlist"></use>
</svg>附件</div>`;

export const toolbarUploadCSS = `
.upload-container {
    width: 100px;
    height: 30px;
    border-radius: 4px;
    background-color: var(--b3-toolbar-hover);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    cursor: pointer;
    text-align: center;
    position: relative;
    z-index: 3;
    -webkit-app-region: no-drag;
    pointer-events: auto;
}
.upload-container .wd {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    pointer-events: none;
}`;

export function getDockHTML(src: string) {
    return `<div id="alist-dock" class="alist-dock-container">
        <iframe
            allow="clipboard-read; clipboard-write"
            sandbox="allow-forms allow-presentation allow-same-origin allow-scripts allow-modals allow-popups"
            src="${src}"
            data-src=""
            border="1"
            frameborder="no"
            framespacing="0"
            allowfullscreen="true"
            style="height: 100%; width: 100%; pointer-events: auto;"
        ></iframe>
    </div>`;
}

export function buildFilenameInput(defaultName: string): string {
    return `<style>
        #alistFilename {
            width: 100%;
            padding: 4px;
            color: #fff;
            background-color: #333;
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
    文件名: <input type="text" id="alistFilename" value="${defaultName}">`;
}

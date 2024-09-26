import { createApp } from "vue";
import App from "./app.vue";
import {
    Plugin,
    showMessage,
    getFrontend,
    getBackend,
    IModel,
    Menu,
    confirm,
    // openTab
} from "siyuan";
import "@/index.scss";
// import * as api from "@/api"
import * as myapi from "@/myapi";
import * as api from '@/api';

import {
    getCurrentNotePath,
    getNoteData,
    getmd,
    downloadImage,
    putFileContent,
    putFileContentM,
    isconnect,
    notebookId,
    setNotebookConf,
    outLog,
    trunLog,
    getNotebookName,
    refreshURL,
    handleDbResource,
    transferLockAndReadonly,
    // transferLockAndReadonlyDBUG,
    exportAllDataPath,
    downloadImageURL,
    exportAllDataPathURL,
    importAllDataURL,
    // downloadBlob,
    importAllData,
    uploadToAList,
    checkAlistConnection,
    refresh,
    // getCurrentNotePathById,

} from "@/myapi";

import { SettingUtils } from "./libs/setting-utils";

const STORAGE_NAME = "menu-config";
const TAB_TYPE = "custom_tab";
const DOCK_TYPE = "dock_tab";//之后列出目标服务笔记列表 done！


export let currentDocId: string | null = null;
export let url: string | null = null;
export let token: string | null = null;
export let serNum: string | null = null;
//alist相关设置  
export let alistname: string | null = null;
export let alistmima: string | null = null;
export let alistUrl: string | null = null;
export let alistToPath: string | null = null;
export let alistToPath2: string | null = null;
export let alistFilename: string | null = null;
// let notePath: string | null = null;
let targetURL: string | null = null;
let isclickalist: boolean = true;
export default class SiYuanLink extends Plugin {
    initalist: any;
    alistdock: any = null;
    customTab: () => IModel;
    private settingUtils: SettingUtils;
    private isMobile: boolean;
    async onload() {
        //监听事件
        document.addEventListener("click", this.onlick, true);

        //TODO暂时放弃这种方案
        // this.eventBus.on("paste", this.eventBusPaste);


        const frontEnd = getFrontend();
        this.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile";
        console.log(frontEnd, this.isMobile);
        this.data[STORAGE_NAME] = { readonlyText: "Readon" };
        // 图标的制作参见帮助文档
        //图标相关设置
        //添加图标
        this.addIcons(`<symbol id="iconTransfer" viewBox="0 0 32 32">
<path d="M27.414 19.414l-4-4c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l1.586 1.586h-12.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h12.172l-1.586 1.586c-0.781 0.781-0.781 2.047 0 2.828 0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586l4-4c0.781-0.781 0.781-2.047 0-2.828zM10.586 10.586l-4 4c-0.781 0.781-0.781 2.047 0 2.828 0.39 0.39 0.902 0.586 1.414 0.586s1.024-0.195 1.414-0.586l1.586-1.586h12.172c1.105 0 2-0.895 2-2s-0.895-2-2-2h-12.172l1.586-1.586c0.781-0.781 0.781-2.047 0-2.828s-2.047-0.781-2.828 0l-4 4c-0.781 0.781-0.781 2.047 0 2.828z"></path>
</symbol>
<symbol id="iconSaving"  viewBox="0 0 32 32">
  <path d="M28 22h-24c-1.105 0-2-0.895-2-2v-12c0-1.105 0.895-2 2-2h24c1.105 0 2 0.895 2 2v12c0 1.105-0.895 2-2 2zM4 8v12h24v-12h-24zM16 18l-6-6h4v-4h4v4h4l-6 6zM26 24h-20c-1.105 0-2-0.895-2-2v-2h24v2c0 1.105-0.895 2-2 2z"></path>
</symbol>
<symbol id="iconDataTransferSimple" viewBox="0 0 32 32">
<path d="M4 16h24M16 4v24M4 16l8-8 8 8"/>
</symbol>
<symbol id="iconDataTransferRetro" viewBox="0 0 32 32">
<path d="M4 16h8v-2h-8v2zM20 16h8v-2h-8v2zM4 20h24v-2h-24v2zM16 4v24"/>
</symbol>
<symbol id="iconDataTransferDynamic" viewBox="0 0 32 32">
<path d="M4 16c4-4 12-4 16 0s12 4 16 0M16 4v24M4 16l8-8 8 8M24 16c-4 4-12 4-16 0"/>
</symbol>
<symbol id="iconDataTransferTech" viewBox="0 0 32 32">
<path d="M16 4h-2v24h2zM4 16h24M16 4l8 8-8 8zM8 8h16M24 24h-16"/>
</symbol>
<symbol id="alist" viewBox="0 0 32 32">
  <path id="svg_2" d="m634.37,138.38c11.88,-1.36 24.25,1.3 34.18,8.09c14.96,9.66 25.55,24.41 34.49,39.51c40.59,68.03 81.45,135.91 122.02,203.96c54.02,90.99 108.06,181.97 161.94,273.06c37.28,63 74.65,125.96 112.18,188.82c24.72,41.99 50.21,83.54 73.84,126.16c10.18,17.84 15.77,38.44 14.93,59.03c-0.59,15.92 -3.48,32.28 -11.84,46.08c-11.73,19.46 -31.39,33.2 -52.71,40.36c-11.37,4.09 -23.3,6.87 -35.43,6.89c-132.32,-0.05 -264.64,0.04 -396.95,0.03c-11.38,-0.29 -22.95,-1.6 -33.63,-5.72c-7.81,-3.33 -15.5,-7.43 -21.61,-13.42c-10.43,-10.32 -17.19,-24.96 -15.38,-39.83c0.94,-10.39 3.48,-20.64 7.76,-30.16c4.15,-9.77 9.99,-18.67 15.06,-27.97c22.13,-39.47 45.31,-78.35 69.42,-116.65c7.72,-12.05 14.44,-25.07 25.12,-34.87c11.35,-10.39 25.6,-18.54 41.21,-19.6c12.55,-0.52 24.89,3.82 35.35,10.55c11.8,6.92 21.09,18.44 24.2,31.88c4.49,17.01 -0.34,34.88 -7.55,50.42c-8.09,17.65 -19.62,33.67 -25.81,52.18c-1.13,4.21 -2.66,9.52 0.48,13.23c3.19,3 7.62,4.18 11.77,5.22c12,2.67 24.38,1.98 36.59,2.06c45,-0.01 90,0 135,0c8.91,-0.15 17.83,0.3 26.74,-0.22c6.43,-0.74 13.44,-1.79 18.44,-6.28c3.3,-2.92 3.71,-7.85 2.46,-11.85c-2.74,-8.86 -7.46,-16.93 -12.12,-24.89c-119.99,-204.91 -239.31,-410.22 -360.56,-614.4c-3.96,-6.56 -7.36,-13.68 -13.03,-18.98c-2.8,-2.69 -6.95,-4.22 -10.77,-3.11c-3.25,1.17 -5.45,4.03 -7.61,6.57c-5.34,6.81 -10.12,14.06 -14.51,21.52c-20.89,33.95 -40.88,68.44 -61.35,102.64c-117.9,198.43 -235.82,396.85 -353.71,595.29c-7.31,13.46 -15.09,26.67 -23.57,39.43c-7.45,10.96 -16.49,21.23 -28.14,27.83c-13.73,7.94 -30.69,11.09 -46.08,6.54c-11.23,-3.47 -22.09,-9.12 -30.13,-17.84c-10.18,-10.08 -14.69,-24.83 -14.17,-38.94c0.52,-14.86 5.49,-29.34 12.98,-42.1c71.58,-121.59 143.62,-242.92 215.93,-364.09c37.2,-62.8 74.23,-125.69 111.64,-188.36c37.84,-63.5 75.77,-126.94 113.44,-190.54c21.02,-35.82 42.19,-71.56 64.28,-106.74c6.79,-11.15 15.58,-21.15 26.16,-28.85c8.68,-5.92 18.42,-11 29.05,-11.94z" fill="#70c6be"/>
  <path id="svg_3" d="m628.35,608.38c17.83,-2.87 36.72,1.39 51.5,11.78c11.22,8.66 19.01,21.64 21.26,35.65c1.53,10.68 0.49,21.75 -3.44,31.84c-3.02,8.73 -7.35,16.94 -12.17,24.81c-68.76,115.58 -137.5,231.17 -206.27,346.75c-8.8,14.47 -16.82,29.47 -26.96,43.07c-7.37,9.11 -16.58,16.85 -27.21,21.89c-22.47,11.97 -51.79,4.67 -68.88,-13.33c-8.66,-8.69 -13.74,-20.63 -14.4,-32.84c-0.98,-12.64 1.81,-25.42 7.53,-36.69c5.03,-10.96 10.98,-21.45 17.19,-31.77c30.22,-50.84 60.17,-101.84 90.3,-152.73c41.24,-69.98 83.16,-139.55 124.66,-209.37c4.41,-7.94 9.91,-15.26 16.09,-21.9c8.33,-8.46 18.9,-15.3 30.8,-17.16z" fill="#1ba0d8"/>
</symbol>
<symbol id="iconCloudUpload" viewBox="0 0 32 32">
  <path fill="currentColor" d="M6 22h24v2H6z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M30.84 13.37A1.94 1.94 0 0 0 28.93 12h-2.38a3 3 0 0 1-.14 2h2.54c1.05 2.94 2.77 7.65 3.05 8.48V30H4v-7.52C4.28 21.65 7.05 14 7.05 14h2.53a3 3 0 0 1-.14-2H7.07a1.92 1.92 0 0 0-1.9 1.32C2 22 2 22.1 2 22.33V30a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2v-7.67c0-.23 0-.33-3.16-8.96" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="m18 19.84l6.38-6.35A1 1 0 1 0 23 12.08L19 16V4a1 1 0 1 0-2 0v12l-4-3.95a1 1 0 0 0-1.41 1.42Z" class="clr-i-outline clr-i-outline-path-3"/><path fill="none" d="M0 0h36v36H0z"/>
</symbol>
<symbol id="iconAlist" viewBox="0 0 1252 1252">
  <path id="svg_2" d="m634.37,138.38c11.88,-1.36 24.25,1.3 34.18,8.09c14.96,9.66 25.55,24.41 34.49,39.51c40.59,68.03 81.45,135.91 122.02,203.96c54.02,90.99 108.06,181.97 161.94,273.06c37.28,63 74.65,125.96 112.18,188.82c24.72,41.99 50.21,83.54 73.84,126.16c10.18,17.84 15.77,38.44 14.93,59.03c-0.59,15.92 -3.48,32.28 -11.84,46.08c-11.73,19.46 -31.39,33.2 -52.71,40.36c-11.37,4.09 -23.3,6.87 -35.43,6.89c-132.32,-0.05 -264.64,0.04 -396.95,0.03c-11.38,-0.29 -22.95,-1.6 -33.63,-5.72c-7.81,-3.33 -15.5,-7.43 -21.61,-13.42c-10.43,-10.32 -17.19,-24.96 -15.38,-39.83c0.94,-10.39 3.48,-20.64 7.76,-30.16c4.15,-9.77 9.99,-18.67 15.06,-27.97c22.13,-39.47 45.31,-78.35 69.42,-116.65c7.72,-12.05 14.44,-25.07 25.12,-34.87c11.35,-10.39 25.6,-18.54 41.21,-19.6c12.55,-0.52 24.89,3.82 35.35,10.55c11.8,6.92 21.09,18.44 24.2,31.88c4.49,17.01 -0.34,34.88 -7.55,50.42c-8.09,17.65 -19.62,33.67 -25.81,52.18c-1.13,4.21 -2.66,9.52 0.48,13.23c3.19,3 7.62,4.18 11.77,5.22c12,2.67 24.38,1.98 36.59,2.06c45,-0.01 90,0 135,0c8.91,-0.15 17.83,0.3 26.74,-0.22c6.43,-0.74 13.44,-1.79 18.44,-6.28c3.3,-2.92 3.71,-7.85 2.46,-11.85c-2.74,-8.86 -7.46,-16.93 -12.12,-24.89c-119.99,-204.91 -239.31,-410.22 -360.56,-614.4c-3.96,-6.56 -7.36,-13.68 -13.03,-18.98c-2.8,-2.69 -6.95,-4.22 -10.77,-3.11c-3.25,1.17 -5.45,4.03 -7.61,6.57c-5.34,6.81 -10.12,14.06 -14.51,21.52c-20.89,33.95 -40.88,68.44 -61.35,102.64c-117.9,198.43 -235.82,396.85 -353.71,595.29c-7.31,13.46 -15.09,26.67 -23.57,39.43c-7.45,10.96 -16.49,21.23 -28.14,27.83c-13.73,7.94 -30.69,11.09 -46.08,6.54c-11.23,-3.47 -22.09,-9.12 -30.13,-17.84c-10.18,-10.08 -14.69,-24.83 -14.17,-38.94c0.52,-14.86 5.49,-29.34 12.98,-42.1c71.58,-121.59 143.62,-242.92 215.93,-364.09c37.2,-62.8 74.23,-125.69 111.64,-188.36c37.84,-63.5 75.77,-126.94 113.44,-190.54c21.02,-35.82 42.19,-71.56 64.28,-106.74c6.79,-11.15 15.58,-21.15 26.16,-28.85c8.68,-5.92 18.42,-11 29.05,-11.94z" fill="#70c6be"/>
  <path id="svg_3" d="m628.35,608.38c17.83,-2.87 36.72,1.39 51.5,11.78c11.22,8.66 19.01,21.64 21.26,35.65c1.53,10.68 0.49,21.75 -3.44,31.84c-3.02,8.73 -7.35,16.94 -12.17,24.81c-68.76,115.58 -137.5,231.17 -206.27,346.75c-8.8,14.47 -16.82,29.47 -26.96,43.07c-7.37,9.11 -16.58,16.85 -27.21,21.89c-22.47,11.97 -51.79,4.67 -68.88,-13.33c-8.66,-8.69 -13.74,-20.63 -14.4,-32.84c-0.98,-12.64 1.81,-25.42 7.53,-36.69c5.03,-10.96 10.98,-21.45 17.19,-31.77c30.22,-50.84 60.17,-101.84 90.3,-152.73c41.24,-69.98 83.16,-139.55 124.66,-209.37c4.41,-7.94 9.91,-15.26 16.09,-21.9c8.33,-8.46 18.9,-15.3 30.8,-17.16z" fill="#1ba0d8"/>
</symbol>
<symbol id="iconChat" viewBox="0 0 32 32">
    <path d="M4 4h24c1.104 0 2 0.896 2 2v16c0 1.104-0.896 2-2 2H6l-4 4v-4H4c-1.104 0-2-0.896-2-2V6c0-1.104 0.896-2 2-2zm0 2v16h24V6H4zm2 4h12v2H6v-2zm0 4h18v2H6v-2zm0 4h14v2H6v-2z"/>
</symbol>
<symbol id="icon-deepseek-chat" viewBox="0 0 14 14">
   <path id="path" d="M15.4424 4.72852C15.2998 4.6582 15.2383 4.79297 15.1543 4.85938C15.126 4.88086 15.1016 4.91016 15.0781 4.93555C14.8691 5.1582 14.626 5.30469 14.3076 5.28711C13.8428 5.26172 13.4463 5.4082 13.0957 5.76367C13.0205 5.32422 12.7725 5.0625 12.3955 4.89453C12.1982 4.80664 11.999 4.7207 11.8604 4.5293C11.7637 4.39453 11.7373 4.24414 11.6895 4.0957C11.6582 4.00586 11.6279 3.91406 11.5244 3.89844C11.4131 3.88086 11.3691 3.97461 11.3252 4.05273C11.1494 4.375 11.082 4.72852 11.0889 5.08789C11.1035 5.89258 11.4434 6.53516 12.1191 6.99219C12.1963 7.04492 12.2158 7.09766 12.1914 7.17383C12.1455 7.33008 12.0908 7.48438 12.043 7.64062C12.0117 7.74219 11.9658 7.76367 11.8584 7.71875C11.4873 7.56445 11.167 7.33398 10.8848 7.05664C10.4043 6.5918 9.96973 6.07812 9.42773 5.67773C9.30078 5.58203 9.17383 5.49609 9.04199 5.41211C8.48926 4.875 9.11426 4.43359 9.25977 4.38086C9.41016 4.32617 9.31152 4.13867 8.82324 4.14062C8.33398 4.14258 7.88672 4.30664 7.31641 4.52539C7.23242 4.55859 7.14551 4.58203 7.05469 4.60156C6.53711 4.50391 6 4.48242 5.43848 4.54492C4.38184 4.66406 3.53711 5.16406 2.91699 6.01758C2.1709 7.04492 1.99512 8.21094 2.20996 9.42773C2.43652 10.7109 3.08984 11.7715 4.09473 12.6016C5.13574 13.4629 6.33594 13.8848 7.7041 13.8027C8.53516 13.7559 9.46094 13.6445 10.5049 12.7598C10.7686 12.8906 11.0449 12.9434 11.5029 12.9824C11.8564 13.0156 12.1963 12.9648 12.459 12.9102C12.8711 12.8223 12.8428 12.4395 12.6943 12.3711C11.4854 11.8066 11.751 12.0352 11.5098 11.8496C12.124 11.123 13.0488 10.3672 13.4111 7.91797C13.4395 7.72461 13.415 7.60156 13.4111 7.44336C13.4092 7.34766 13.4307 7.31055 13.54 7.30078C13.8428 7.26562 14.1367 7.18164 14.4072 7.0332C15.1895 6.60547 15.5059 5.90234 15.5801 5.05859C15.5908 4.92969 15.5781 4.79688 15.4424 4.72852ZM8.61914 12.3184C7.44727 11.3965 6.87988 11.0918 6.64453 11.1055C6.42578 11.1191 6.46484 11.3691 6.51367 11.5332C6.56348 11.6953 6.62988 11.8066 6.72168 11.9492C6.78516 12.043 6.8291 12.1816 6.6582 12.2871C6.28125 12.5215 5.625 12.209 5.59473 12.1934C4.83105 11.7441 4.19336 11.1484 3.74316 10.3359C3.30957 9.55469 3.05664 8.71484 3.01562 7.82031C3.00391 7.60352 3.06738 7.52734 3.2832 7.48828C3.56543 7.43555 3.85742 7.42383 4.14062 7.4668C5.33594 7.64062 6.35352 8.17578 7.20605 9.02344C7.69336 9.50586 8.06152 10.084 8.44141 10.6465C8.84473 11.2461 9.2793 11.8145 9.83203 12.2832C10.0273 12.4473 10.1826 12.5703 10.332 12.6621C9.88184 12.7129 9.13184 12.7246 8.61914 12.3184ZM9.18066 8.70312C9.18066 8.60547 9.25684 8.5293 9.35352 8.5293C9.37598 8.5293 9.39551 8.53516 9.41309 8.54102C9.43652 8.54883 9.45898 8.5625 9.47656 8.58203C9.50684 8.61328 9.52441 8.65625 9.52441 8.70312C9.52441 8.79883 9.44824 8.875 9.35156 8.875C9.25488 8.875 9.18066 8.79883 9.18066 8.70312ZM10.9238 9.59766C10.8125 9.64453 10.7002 9.68359 10.5928 9.6875C10.4258 9.69727 10.2441 9.62891 10.1455 9.54492C9.99219 9.41602 9.88184 9.34375 9.83594 9.11914C9.81641 9.02344 9.82715 8.875 9.84473 8.78906C9.88477 8.60547 9.84082 8.48828 9.71094 8.38086C9.60547 8.29297 9.47168 8.26953 9.3252 8.26953C9.27051 8.26953 9.21973 8.24609 9.18262 8.22656C9.12109 8.19531 9.07031 8.11914 9.11914 8.02539C9.13477 7.99414 9.20898 7.91992 9.22656 7.9082C9.42578 7.79297 9.65625 7.83008 9.86914 7.91602C10.0664 7.99609 10.2158 8.14453 10.4307 8.35547C10.6494 8.60938 10.6895 8.67773 10.8145 8.86914C10.9131 9.01758 11.0029 9.16992 11.0645 9.34375C11.1016 9.45312 11.0537 9.54297 10.9238 9.59766Z" fill-rule="nonzero" fill="#4D6BFE"></path>
</symbol>
`);


        //添加图标
        this.addTopBar({
            icon: "iconTransfer",
            title: "数据传输",
            position: "right",
            callback: () => {
                // if(this.isMobile)
                let rect = document.querySelector("#barPlugins").getBoundingClientRect();
                this.addMenu(rect);
                // showMessage("处理中...");

            }
        });
        this.addTopBar({
            icon: "iconCloudUpload",
            title: "全量备份到alist",
            position: "left",
            callback: () => {
                // console.log(await getCurrentNotePathById(currentDocId));
                let rect = document.querySelector("#plugin_siyuan-link_1").getBoundingClientRect();
                this.addMenu2(rect);
                // this.runbackup();
                // showMessage("处理中...");
            }
        });
        this.addTopBar({
            icon: "iconAlist",
            title: "附件上传",
            position: "right",
            callback: () => {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = '*/*'; // 支持所有文件类型

                // 文件选择事件处理
                fileInput.addEventListener('change', async (event) => {
                    console.log(event);
                    const inputElement = event.target as HTMLInputElement; // 类型断言
                    const files = inputElement.files; // 现在可以安全地访问 files
                    if (files && files.length > 0) {
                        const file = files[0]; // 获取选中的第一个文件
                        await uploadToAList(file, alistToPath2 + "/" + file.name); // 调用上传文件的函数
                        //增加插入笔记上传的文件链接
                        api.appendBlock('markdown', `[${file.name}](${alistUrl}${alistToPath2}/${file.name})`, currentDocId);
                    }
                });

                // 触发文件输入的点击事件
                fileInput.click();
            }
        });



        this.addDock({
            config: {
                position: "RightTop",
                size: { width: 250, height: 0 },
                icon: "iconAlist",
                title: "alist网页",
            },
            data: null,
            type: "alist-dock",
            resize() {
                if (this.element.clientWidth == 0) {
                    isclickalist = true;
                } else {
                    isclickalist = false;
                    this.element.style.width = "200px";
                }
            },
            update() {
                // console.log("alist-dock" + " update");
                // console.log(this, "cehsihs8");
                this.element.innerHTML = `<div id="alist-dock" style="height: 100% ; width: 100%;">
                <iframe 
                allow="clipboard-read; clipboard-write"
                sandbox="allow-forms allow-presentation allow-same-origin allow-scripts allow-modals allow-popups" 
                src="${targetURL}" 
                data-src="" 
                border="0" 
                frameborder="no" 
                framespacing="0" 
                allowfullscreen="true" 
                style="height: 99% ; width: 100%;"
                >
                </iframe>
                </div>`;
            },
            init: (dock) => {
                this.alistdock = dock;//将dock赋值给全局变量，以便在其它地方进行后续操作
                if (alistUrl == "") {
                    showMessage("请先配置alist网址...", -1, "error");
                }
                dock.element.innerHTML = `<div id="alist-dock" style="height: 100% ; width: 100%;">
                <iframe 
                allow="clipboard-read; clipboard-write"
                sandbox="allow-forms allow-presentation allow-same-origin allow-scripts allow-modals allow-popups" 
                src="${alistUrl}" 
                data-src="" 
                border="0" 
                frameborder="no" 
                framespacing="0" 
                allowfullscreen="true" 
                style="height: 99% ; width: 100%;"
                >
                </iframe>
                </div>`;
            },
            destroy() {
                console.log("destroy dock:", "alist-dock");
            }
        });


        this.addDock({
            config: {
                position: "RightTop",
                size: { width: 250, height: 0 },
                icon: "icon-deepseek-chat",
                title: "deepseek-chat",
            },
            data: null,
            type: "deepseek-dock",
            resize() {

            },
            update() {
                // this.element.innerHTML = `<div id="alist-dock" style="height: 100% ; width: 100%;">
                // <iframe 
                // allow="clipboard-read; clipboard-write"
                // sandbox="allow-forms allow-presentation allow-same-origin allow-scripts allow-modals allow-popups" 
                // src="${targetURL}" 
                // data-src="" 
                // border="0" 
                // frameborder="no" 
                // framespacing="0" 
                // allowfullscreen="true" 
                // style="height: 99% ; width: 100%;"
                // >
                // </iframe>
                // </div>`;
            },
            init: (dock) => {
                // this.alistdock = dock;//将dock赋值给全局变量，以便在其它地方进行后续操作
                dock.element.innerHTML = `<div id="alist-dock" style="height: 100% ; width: 100%;">
                <iframe 
                allow="clipboard-read; clipboard-write"
                sandbox="allow-forms allow-presentation allow-same-origin allow-scripts allow-modals allow-popups" 
                src="https://chat.deepseek.com/" 
                data-src="" 
                border="0" 
                frameborder="no" 
                framespacing="0" 
                allowfullscreen="true" 
                style="height: 99% ; width: 100%;"
                >
                </iframe>
                </div>`;
            },
            destroy() {
                console.log("destroy dock:", "alist-dock");
            }
        });


        this.addDock({
            config: {
                position: "RightTop",
                size: { width: 250, height: 0 },
                icon: "iconChat",
                title: "kimi-chat",
            },
            data: null,
            type: "kimi-dock",
            resize() {

            },
            update() {
                // this.element.innerHTML = `<div id="alist-dock" style="height: 100% ; width: 100%;">
                // <iframe 
                // allow="clipboard-read; clipboard-write"
                // sandbox="allow-forms allow-presentation allow-same-origin allow-scripts allow-modals allow-popups" 
                // src="${targetURL}" 
                // data-src="" 
                // border="0" 
                // frameborder="no" 
                // framespacing="0" 
                // allowfullscreen="true" 
                // style="height: 99% ; width: 100%;"
                // >
                // </iframe>
                // </div>`;
            },
            init: (dock) => {
                // this.alistdock = dock;//将dock赋值给全局变量，以便在其它地方进行后续操作
                dock.element.innerHTML = `<div id="alist-dock" style="height: 100% ; width: 100%;">
                <iframe 
                allow="clipboard-read; clipboard-write"
                sandbox="allow-forms allow-presentation allow-same-origin allow-scripts allow-modals allow-popups" 
                src="https://kimi.moonshot.cn/" 
                data-src="" 
                border="0" 
                frameborder="no" 
                framespacing="0" 
                allowfullscreen="true" 
                style="height: 99% ; width: 100%;"
                >
                </iframe>
                </div>`;
            },
            destroy() {
                console.log("destroy dock:", "alist-dock");
            }
        });


        this.addDock({
            config: {
                position: "RightTop",
                size: { width: 300, height: 0 },
                icon: "iconSaving",
                title: "目标源笔记",
            },
            data: null,
            type: DOCK_TYPE,
            resize() {
                console.log(DOCK_TYPE + " resize");
            },
            update() {
                console.log(DOCK_TYPE + " update");

            },
            init: (dock) => {
                dock.element.innerHTML = `<div id="siyuan-link-dock" style="height: 100% ; width: 100%;"></div>`;
                const app = createApp(App, { plugin: this });
                // app.config.globalProperties.$selectedFileIds=[];
                app.mount("#siyuan-link-dock");
            },
            destroy() {
                console.log("destroy dock:", DOCK_TYPE);
            }
        });


        //命令面板选项相关设置
        // this.addCommand({
        //     langKey: "chuan",
        //     hotkey: "",
        //     globalCallback: () => {
        //         confirm("你好，欢迎使用SiYuanLink插件！", "SiYuanLink插件", () => {
        //             showMessage("你好，欢迎使用2222222SiYuanLink插件！");
        //         });

        //         console.log('dd');
        //     },
        // });
        //命令面板选项相关设置

        //插件设置相关
        this.settingUtils = new SettingUtils({
            plugin: this, name: STORAGE_NAME
        });
        this.settingUtils.addItem({
            key: "sykey",
            value: "",
            type: "textinput",
            title: "目标源密钥1",
            description: "要接收数据的目标源密钥1",
            action: {
                // Called when focus is lost and content changes
                callback: async () => {
                    // Return data and save it in real time
                    let value = await this.settingUtils.takeAndSave("sykey");
                    token = value;
                    // console.log(value);
                }
            }
        });
        this.settingUtils.addItem({
            key: "syurl",
            value: "",
            type: "textinput",
            title: "目标源网址1",
            description: "要接收数据的目标源的网址1",
            action: {
                // Called when focus is lost and content changes
                callback: async () => {
                    // Return data and save it in real time
                    let value = await this.settingUtils.takeAndSave("syurl");
                    url = value;
                    // console.log(value);
                }
            }
        });
        this.settingUtils.addItem({
            key: "sykey2",
            value: "",
            type: "textinput",
            title: "目标源密钥2",
            description: "要接收数据的目标源密钥2",
            action: {
                // Called when focus is lost and content changes
                callback: async () => {
                    // Return data and save it in real time
                    let value = await this.settingUtils.takeAndSave("sykey");
                    token = value;
                    // console.log(value);
                }
            }
        });
        this.settingUtils.addItem({
            key: "syurl2",
            value: "",
            type: "textinput",
            title: "目标源网址2",
            description: "要接收数据的目标源的网址2",
            action: {
                // Called when focus is lost and content changes
                callback: async () => {
                    // Return data and save it in real time
                    let value = await this.settingUtils.takeAndSave("syurl");
                    url = value;
                    // console.log(value);
                }
            }
        });
        this.settingUtils.addItem({
            key: "Select",
            value: 1,
            type: "select",
            title: "目标源",
            description: "选择目标源",
            options: {
                1: "目标源1",
                2: "目标源2"
            },
            action: {
                callback: async () => {
                    // Read data in real time
                    let value = await this.settingUtils.takeAndSave("Select");
                    serNum = value;
                    console.log(serNum);
                    if (serNum == "1") {
                        url = this.settingUtils.get("syurl");
                        token = this.settingUtils.get("sykey");
                    } else if (serNum == "2") {
                        url = this.settingUtils.get("syurl2");
                        token = this.settingUtils.get("sykey2");
                    }
                    outLog(url, "当前目标源地址");
                }
            }
        });
        this.settingUtils.addItem({
            key: "isconnect",
            value: "",
            type: "button",
            title: "验证服务连接",
            description: "判断是否连接上目标服务和alist服务",
            button: {
                label: "验证",
                callback: () => {
                    showMessage("正在验证...");
                    isconnect();
                    if (alistUrl != "") {
                        checkAlistConnection(alistname, alistmima);
                    } else {
                        showMessage("未配置备份地址", 2000);
                    }
                }
            }
        });
        this.settingUtils.addItem({
            key: "push",
            value: "",
            type: "button",
            title: "全量传输",
            description: "全量传输当前data",
            button: {
                label: "传输",
                callback: () => {
                    showMessage("正在传输...");
                    this.runpush();
                }
            }
        });
        this.settingUtils.addItem({
            key: "pull",
            value: "",
            type: "button",
            title: "全量拉取",
            description: "全量拉取目标服务data",
            button: {
                label: "拉取",
                callback: () => {
                    showMessage("正在拉取...");
                    this.runpull();
                }
            }
        });
        this.settingUtils.addItem({
            key: "islog",
            value: Boolean,
            type: "checkbox",
            title: "是否日志输出",
            description: "控制本插件日志是否输出到控制台",
            action: {
                callback: () => {
                    // Return data and save it in real time
                    let value = !this.settingUtils.get("islog");
                    this.settingUtils.set("islog", value);
                    trunLog(value);
                    outLog(value);
                }
            }
        });
        this.settingUtils.addItem({
            key: "readonlyText",
            value: Boolean,
            type: "checkbox",
            title: "是否只读标记",
            description: "控制是否在传输时对笔记内容进行只读标记",
            action: {
                callback: () => {
                    // Return data and save it in real time
                    let value = !this.settingUtils.get("readonlyText");
                    this.settingUtils.set("readonlyText", value);
                }
            }
        });
        this.settingUtils.addItem({
            key: "alistUrl",
            value: "",
            type: "textinput",
            title: "alist服务地址",
            description: "备份到alist的服务地址",
            action: {
                // Called when focus is lost and content changes
                callback: async () => {
                    // Return data and save it in real time
                    let value = await this.settingUtils.takeAndSave("alistUrl");
                    alistUrl = value;
                    // console.log(value);
                }
            }
        });
        this.settingUtils.addItem({
            key: "alistname",
            value: "",
            type: "textinput",
            title: "alist用户名",
            description: "备份到alist的用户名",
            action: {
                // Called when focus is lost and content changes
                callback: async () => {
                    // Return data and save it in real time
                    let value = await this.settingUtils.takeAndSave("alistname");
                    alistname = value;
                    // console.log(value);
                }
            }
        });
        this.settingUtils.addItem({
            key: "alistToken",
            value: "",
            type: "textinput",
            title: "alist密码",
            description: "备份到alist的密码",
            action: {
                // Called when focus is lost and content changes
                callback: async () => {
                    // Return data and save it in real time
                    let value = await this.settingUtils.takeAndSave("alistToken");
                    alistmima = value;
                    // console.log(value);
                }
            }
        });

        this.settingUtils.addItem({
            key: "alistToPath",
            value: "",
            type: "textinput",
            title: "备份路径",
            description: "备份到alist的路径",
            action: {
                // Called when focus is lost and content changes
                callback: async () => {
                    // Return data and save it in real time
                    let value = await this.settingUtils.takeAndSave("alistToPath");
                    alistToPath = value;
                    // console.log(value);
                }
            }
        });
        this.settingUtils.addItem({
            key: "alistFilename",
            value: "",
            type: "textinput",
            title: "默认备份文件名",
            description: "备份到alist的默认文件名(注意要加后缀名eg:siyuan-backup.zip)",
            action: {
                // Called when focus is lost and content changes
                callback: async () => {
                    // Return data and save it in real time
                    let value = await this.settingUtils.takeAndSave("alistFilename");
                    alistFilename = value;
                    // console.log(value);
                }
            }
        });
        this.settingUtils.addItem({
            key: "isrefresh",
            value: true,
            type: "checkbox",
            title: "拉取笔记时是否刷新",
            description: "控制拉取笔记时是否刷新页面（建议开启）",
            action: {
                callback: () => {
                    // Return data and save it in real time
                    let value = !this.settingUtils.get("isrefresh");
                    this.settingUtils.set("isrefresh", value);
                }
            }
        });
        this.settingUtils.addItem({
            key: "alistToPath2",
            value: "",
            type: "textinput",
            title: "附件上传路径",
            description: "附件上传到alist的路径",
            action: {
                // Called when focus is lost and content changes
                callback: async () => {
                    // Return data and save it in real time
                    let value = await this.settingUtils.takeAndSave("alistToPath2");
                    alistToPath2 = value;
                    // console.log(value);
                }
            }
        });

        try {
            this.settingUtils.load();
        } catch (error) {
            console.error("Error loading settings storage, probably empty config json:", error);
        }
        //插件设置相关
        console.log(this.i18n.helloPlugin);

    }
    //选中菜单设置



    private addMenu(rect?: DOMRect) {
        //退出回调
        const menu = new Menu("topBarSample", () => {
            outLog(this.i18n.byeMenu);
        });
        //添加菜单项
        menu.addItem({
            icon: "iconDataTransferSimple",
            label: "传输当前笔记",
            click: () => {
                if (url == "") {
                    showMessage("请先配置目标源地址！");
                    return;
                }
                outLog("传输当前笔记");
                this.run();
                // this.dbug();
            }
        });
        // menu.addItem({
        //     icon: "iconAlist",
        //     label: "ALIST",
        //     click: async () => {
        //         const tab = openTab({
        //             app: this.app,
        //             custom: {
        //                 icon: "iconAlist",
        //                 title: "ALIST",
        //                 data: null,
        //                 id: this.name + 'alist'
        //             },
        //             position: "right",
        //         });
        //         const tab1 = await tab
        //         console.log(tab1);
        //         console.log(tab1.headElement);
        //         const alistSpan = tab1.headElement.querySelector('span.item__text');
        //         // 修改其文本内容
        //         if (alistSpan) {
        //             alistSpan.textContent = '新的内容'; // 在这里替换 '新的内容' 为你想要的内容
        //         }
        //         console.log(tab1.panelElement);
        //         //插入html
        //         tab1.panelElement.innerHTML = `<iframe
        //         allow="clipboard-read; clipboard-write"
        //         sandbox="allow-forms allow-presentation allow-same-origin allow-scripts allow-modals allow-popups"
        //         src="${alistUrl}"
        //         data-src=""
        //         border="0"
        //         frameborder="no"
        //         framespacing="0"
        //         allowfullscreen="true"
        //         style="height: 100% ; width: 100%;"
        //         >
        //         </iframe>`;

        //     }
        // });
        menu.open({
            x: rect.right,
            y: rect.bottom,
            isLeft: true,
        });
    }

    private addMenu2(rect?: DOMRect) {
        //退出回调
        const menu = new Menu("topBarSample2", () => {
            outLog(this.i18n.byeMenu);
        });
        //添加菜单项
        menu.addItem({
            icon: "",
            label: "备份data",
            click: () => {
                if (alistUrl == "") {
                    showMessage("请先配置备份地址！");
                    return;
                }
                confirm("请给备份文件取个名字 ^_^", `<style>
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
    文件名: <input type="text" id="alistFilename" value="${alistFilename}">`, () => {
                    const inputElement = document.getElementById("alistFilename") as HTMLInputElement;
                    const inputValue = inputElement.value;
                    if (inputValue) {
                        outLog("正在备份..." + inputValue);
                        outLog("备份data");
                        this.runbackup(inputValue);
                    } else {
                        showMessage("没有输入文件名，备份取消。");
                        return;
                    }
                });

                // this.runbackup();
                // this.dbug();
            }
        });
        menu.open({
            x: rect.left,
            y: rect.bottom,
            isLeft: false,
        });
    }




    onLayoutReady() {

        this.settingUtils.load();
        console.log(`frontend: ${getFrontend()}; backend: ${getBackend()}`);
        serNum = this.settingUtils.get("Select");
        if (serNum == "1") {
            url = this.settingUtils.get("syurl");
            token = this.settingUtils.get("sykey");
        } else if (serNum == "2") {
            url = this.settingUtils.get("syurl2");
            token = this.settingUtils.get("sykey2");
        }
        outLog(url, "当前目标源地址");
        alistmima = this.settingUtils.get("alistToken");
        alistname = this.settingUtils.get("alistname");
        alistUrl = this.settingUtils.get("alistUrl");
        alistToPath = this.settingUtils.get("alistToPath");
        alistToPath2 = this.settingUtils.get("alistToPath2");
        alistFilename = this.settingUtils.get("alistFilename");
        outLog(alistUrl, "当前备份地址");
        outLog(alistname, "当前备份用户名");
        outLog(alistToPath, "当前备份路径");
        outLog(alistToPath2, "当前附件上传路径");
        outLog(alistFilename, "当前备份文件名");
        trunLog(this.settingUtils.get("islog"));
        outLog('cseffsddfsfdsfdfd');


        let tabDiv = document.createElement("div");

        this.customTab = this.addTab({
            type: TAB_TYPE,
            init() {
                this.element.appendChild(tabDiv);
                console.log(this.element);
            },
            beforeDestroy() {
                console.log("before destroy tab:", TAB_TYPE);
            },
            destroy() {
                console.log("destroy tab:", TAB_TYPE);
            }
        });

        //获取当前文档ID
        this.eventBus.on("switch-protyle", (event) => {
            currentDocId = event.detail.protyle.block.id;
            console.log("Current document ID:", currentDocId);
        });
        //获取当前文档ID
    }



    //插件卸载相关
    async onunload() {
        // console.log(this.i18n.byePlugin);
        showMessage("Goodbye ");
        console.log("onunload");

        this.eventBus.off("paste", this.eventBusPaste);
        document.removeEventListener("click", this.onlick, true);
    }

    uninstall() {
        console.log("uninstall");

        this.eventBus.off("paste", this.eventBusPaste);
        document.removeEventListener("click", this.onlick, true);
    }
    //插件卸载相关

    //写插件实现功能的函数
    private async run() {
        if (currentDocId) {
            try {
                showMessage("正在传输...", -1, "info", "单笔记传输")
                const notePath = await getCurrentNotePath(currentDocId);
                outLog(notePath, "当前笔记路径");
                //获取文字数据并保存
                //是否标记只读
                if (this.settingUtils.get("readonlyText")) {
                    await putFileContent(notePath, await transferLockAndReadonly(await getNoteData(notePath)));
                } else {
                    await putFileContent(notePath, await getNoteData(notePath));
                }
                //处理数据库资源文件
                handleDbResource(currentDocId);
                //修改目标服务笔记配置
                //0.0.6: 这里的notebookId可能是空的，导致无法修改笔记配置
                await setNotebookConf(notebookId, await getNotebookName(notebookId));
                //获取资源路径并下载
                const links = await getmd(currentDocId);
                if (links) {
                    for (const link of links) {
                        console.log(link);
                        console.log('1');
                        const imageData = await downloadImage(link);
                        putFileContentM(link, imageData);
                    }
                } else {
                    showMessage("未发现资源文件附件");
                    console.log("未发现资源文件附件");
                }
                //数据库文件处理
                await refreshURL();
            } catch (error) {
                console.error("运行时发生错误:", error);
                showMessage("运行时发生错误:" + error.message);
            }
            showMessage("传输结束!", 6000, "info", "单笔记传输")
        }
    }

    public async pullNote(currentDocIds: string[]) {
        try {
            let index = 0;
            for (const currentDocId of currentDocIds) {
                showMessage(`正在传输${index}...`, -1, "info", "多笔记传输")
                const notePath = await getCurrentNotePath(currentDocId, false, true);
                outLog(notePath, "当前笔记路径");
                //获取文字数据并保存
                //是否标记只读 
                //远程拉取相关
                if (this.settingUtils.get("readonlyText")) {
                    await putFileContent(notePath, await transferLockAndReadonly(await getNoteData(notePath, true)), false);
                } else {
                    await putFileContent(notePath, await getNoteData(notePath, true), false);
                }
                //处理数据库资源文件
                handleDbResource(currentDocId);
                //修改目标服务笔记配置
                //0.0.6: 这里的notebookId可能是空的，导致无法修改笔记配置
                await setNotebookConf(notebookId, await getNotebookName(notebookId, true), false);
                //获取资源路径并下载
                const links = await getmd(currentDocId, true);
                if (links) {
                    for (const link of links) {
                        console.log(link);
                        console.log('1');
                        const imageData = await downloadImageURL(link);
                        putFileContentM(link, imageData, false);
                    }
                } else {
                    showMessage(`未发现资源文件附件${index}`);
                    console.log(`未发现资源文件附件${index}`);
                }
                index++;
            }
            //数据库文件处理
            showMessage(`成功传输${index}`, -1, "info", "多笔记传输")
            if (this.settingUtils.get("isrefresh")) {
                await refresh();
            }
        } catch (error) {
            console.error("运行时发生错误:", error);
            showMessage("运行时发生错误:" + error.message);
        }
        showMessage("传输结束!", 6000, "info", "多笔记传输")


    }






    //全量传输
    private async runpush() {
        showMessage("正在传输...", -1, "info", "传输")
        outLog('runpush');
        try {
            const link = await exportAllDataPath();
            // const data = await downloadImage(link);
            await importAllDataURL(await downloadImage(link));
        } catch (error) {
            showMessage("传输失败!", -1, "error", "传输")
            console.error('Failed to run runpush:', error);
        }
        showMessage("传输结束!", 6000, "info", "传输")
    }

    //全量拉取
    private async runpull() {
        showMessage("正在拉取...", -1, "info", "拉取")
        outLog('runpull');
        try {
            const link = await exportAllDataPathURL();
            // const data = await downloadImage(link);
            await importAllData(await downloadImageURL(link));
        } catch (error) {
            showMessage("拉取失败!", -1, "error", "拉取")
            console.error('Failed to run runpull:', error);
        }
        showMessage("拉取结束!", 6000, "info", "拉取")
    }

    private async runbackup(alistFilename: string) {
        showMessage("正在备份...", -1, "info", "备份")
        outLog('runbackup');
        try {
            const link = await exportAllDataPath();
            // const data = await downloadImageURL(link);
            const data = await downloadImage(link);
            await uploadToAList(data, alistToPath + "/" + alistFilename);
        } catch (error) {
            showMessage("备份失败!", -1, "error", "备份");
            console.error('Failed to run runbackup:', error);
        }
        showMessage("备份结束!", 6000, "info", "备份")
    }
    //点击链接触发的事件
    onlick = (e) => {
        // console.log(e.target);
        if (
            e.target.dataset &&
            e.target.dataset.type == "a" &&
            e.target.dataset.href
        ) {
            try {
                console.log(e.target.dataset.href);
                this.isrecall(e.target, e);
            } catch (e) {
                console.error(e);
            }
        }
    };

    isrecall(target: any, e: any) {
        if (!target.dataset.href) {
            return;
        } else {
            const isContained = myapi.isUrlContained(target.dataset.href, alistUrl);
            // console.log(isContained);
            if (isContained) {
                const buttonAlist = document.querySelector('span[data-type="siyuan-linkalist-dock"]');
                // console.log(buttonAlist, 'buttonAlist');
                if (buttonAlist) {
                    // 手动触发点击事件
                    if (isclickalist) {//判断是否点击
                        const clickEvent = new MouseEvent('click', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        });
                        buttonAlist.dispatchEvent(clickEvent);
                    }

                    if (this.alistdock) {//判断是否存在
                        targetURL = target.dataset.href;
                        this.alistdock.update();
                    } else {
                        //首次点击，以初始化
                        const clickEvent = new MouseEvent('click', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        });
                        buttonAlist.dispatchEvent(clickEvent);
                        if (this.alistdock) {//判断是否存在
                            targetURL = target.dataset.href;
                            this.alistdock.update();
                        } else {
                            console.error('Alist dock not found');
                        }
                        // console.error('Alist dock not found');
                    }
                } else {
                    console.error('Span element not found');
                }


                // console.log(this.alistdock,'this.alistdock');

                e.preventDefault();
                e.stopPropagation();
            }
        }
    }

    private eventBusPaste(event: any) {
        // 如果需异步处理请调用 preventDefault， 否则会进行默认处理
        event.preventDefault();
        showMessage("Paste event triggered");
        console.log(event);
        const pasttext = event.detail.textPlain;

        console.log(pasttext);

        // 如果使用了 preventDefault，必须调用 resolve，否则程序会卡死
        event.detail.resolve({
            textPlain: event.detail.textPlain.trim(),
        });
    }
}

// handleUrl(protocol, target:any) {

// }



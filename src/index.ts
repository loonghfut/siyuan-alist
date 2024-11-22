// import { createApp } from "vue";
// import App from "./app.vue";
import * as sy from "siyuan";

import {
    Plugin,
    showMessage,
    getFrontend,
    getBackend,
    IModel,
    // IOperation,
    // Menu,
    confirm,
    // openTab
} from "siyuan";
import "@/index.scss";
// import * as api from "@/api"
import * as myapi from "@/myapi";
import * as api from '@/api';

import {
    downloadImage,
    outLog,
    trunLog,
    exportAllDataPath,
    uploadToAList,
    checkAlistConnection,
} from "@/myapi";

import { SettingUtils } from "./libs/setting-utils";
import path from "path";




const STORAGE_NAME = "menu-config";
const TAB_TYPE = "custom_tab";


export let currentDocId: string | null = null;
export let url: string | null = null;
export let token: string | null = null;
export let serNum: string | null = null;
export let isKeyPressed: boolean = false;
export let hotkey: string | null = null;
export let isReadonly: boolean = false;
// hotkey = "z";
//alist相关设置  
export let beta: boolean = false;
export let beta_pro: boolean = false;
export let alistname: string | null = null;
export let alistmima: string | null = null;
export let alistUrl: string | null = null;
export let alistToPath: string | null = null;  //备份路径
export let alistToPath2: string | null = null; //上传路径
export let alistFilename: string | null = null;
export let alistTime: string | null = null;
export let isCtrl: boolean = false;
export let isdrag: boolean = true;
export let today: string | null = null;

export let clickId: string | null = null;

// let notePath: string | null = null;
let targetURL: string | null = null;
let isclickalist: boolean = true;
export default class SiYuanLink extends Plugin {
    initalist: any;
    alistdock: any = null;
    customTab: () => IModel;
    private settingUtils: SettingUtils;
    isMobile: boolean;
    private blockIconEventBindThis = this.blockIconEvent.bind(this);

    async onload() {

        isReadonly = window.siyuan.config.readonly;
        console.log(isReadonly, "是否只读");
        if (isReadonly) {
            // showMessage("只读模式下插件不可用", -1, "error");
            return;
        }

        //获取当前日期
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        today = year + "-" + month + "-" + day;
        console.log(today, "当前日期");



        //监听事件
        document.addEventListener("click", this.onlick, true);

        const frontEnd = getFrontend();
        this.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile";
        console.log(frontEnd, this.isMobile);
        this.data[STORAGE_NAME] = { readonlyText: "Readon" };
        // 图标的制作参见帮助文档
        //图标相关设置
        //添加图标
        this.addIcons(`
<symbol id="iconSaving"  viewBox="0 0 32 32">
  <path d="M28 22h-24c-1.105 0-2-0.895-2-2v-12c0-1.105 0.895-2 2-2h24c1.105 0 2 0.895 2 2v12c0 1.105-0.895 2-2 2zM4 8v12h24v-12h-24zM16 18l-6-6h4v-4h4v4h4l-6 6zM26 24h-20c-1.105 0-2-0.895-2-2v-2h24v2c0 1.105-0.895 2-2 2z"></path>
</symbol>
<symbol id="iconCloudUpload" viewBox="0 0 32 32">
  <path fill="currentColor" d="M6 22h24v2H6z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M30.84 13.37A1.94 1.94 0 0 0 28.93 12h-2.38a3 3 0 0 1-.14 2h2.54c1.05 2.94 2.77 7.65 3.05 8.48V30H4v-7.52C4.28 21.65 7.05 14 7.05 14h2.53a3 3 0 0 1-.14-2H7.07a1.92 1.92 0 0 0-1.9 1.32C2 22 2 22.1 2 22.33V30a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2v-7.67c0-.23 0-.33-3.16-8.96" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="m18 19.84l6.38-6.35A1 1 0 1 0 23 12.08L19 16V4a1 1 0 1 0-2 0v12l-4-3.95a1 1 0 0 0-1.41 1.42Z" class="clr-i-outline clr-i-outline-path-3"/><path fill="none" d="M0 0h36v36H0z"/>
</symbol>
<symbol id="iconAlist" viewBox="0 0 1252 1252">
  <path id="svg_2" d="m634.37,138.38c11.88,-1.36 24.25,1.3 34.18,8.09c14.96,9.66 25.55,24.41 34.49,39.51c40.59,68.03 81.45,135.91 122.02,203.96c54.02,90.99 108.06,181.97 161.94,273.06c37.28,63 74.65,125.96 112.18,188.82c24.72,41.99 50.21,83.54 73.84,126.16c10.18,17.84 15.77,38.44 14.93,59.03c-0.59,15.92 -3.48,32.28 -11.84,46.08c-11.73,19.46 -31.39,33.2 -52.71,40.36c-11.37,4.09 -23.3,6.87 -35.43,6.89c-132.32,-0.05 -264.64,0.04 -396.95,0.03c-11.38,-0.29 -22.95,-1.6 -33.63,-5.72c-7.81,-3.33 -15.5,-7.43 -21.61,-13.42c-10.43,-10.32 -17.19,-24.96 -15.38,-39.83c0.94,-10.39 3.48,-20.64 7.76,-30.16c4.15,-9.77 9.99,-18.67 15.06,-27.97c22.13,-39.47 45.31,-78.35 69.42,-116.65c7.72,-12.05 14.44,-25.07 25.12,-34.87c11.35,-10.39 25.6,-18.54 41.21,-19.6c12.55,-0.52 24.89,3.82 35.35,10.55c11.8,6.92 21.09,18.44 24.2,31.88c4.49,17.01 -0.34,34.88 -7.55,50.42c-8.09,17.65 -19.62,33.67 -25.81,52.18c-1.13,4.21 -2.66,9.52 0.48,13.23c3.19,3 7.62,4.18 11.77,5.22c12,2.67 24.38,1.98 36.59,2.06c45,-0.01 90,0 135,0c8.91,-0.15 17.83,0.3 26.74,-0.22c6.43,-0.74 13.44,-1.79 18.44,-6.28c3.3,-2.92 3.71,-7.85 2.46,-11.85c-2.74,-8.86 -7.46,-16.93 -12.12,-24.89c-119.99,-204.91 -239.31,-410.22 -360.56,-614.4c-3.96,-6.56 -7.36,-13.68 -13.03,-18.98c-2.8,-2.69 -6.95,-4.22 -10.77,-3.11c-3.25,1.17 -5.45,4.03 -7.61,6.57c-5.34,6.81 -10.12,14.06 -14.51,21.52c-20.89,33.95 -40.88,68.44 -61.35,102.64c-117.9,198.43 -235.82,396.85 -353.71,595.29c-7.31,13.46 -15.09,26.67 -23.57,39.43c-7.45,10.96 -16.49,21.23 -28.14,27.83c-13.73,7.94 -30.69,11.09 -46.08,6.54c-11.23,-3.47 -22.09,-9.12 -30.13,-17.84c-10.18,-10.08 -14.69,-24.83 -14.17,-38.94c0.52,-14.86 5.49,-29.34 12.98,-42.1c71.58,-121.59 143.62,-242.92 215.93,-364.09c37.2,-62.8 74.23,-125.69 111.64,-188.36c37.84,-63.5 75.77,-126.94 113.44,-190.54c21.02,-35.82 42.19,-71.56 64.28,-106.74c6.79,-11.15 15.58,-21.15 26.16,-28.85c8.68,-5.92 18.42,-11 29.05,-11.94z" fill="#70c6be"/>
  <path id="svg_3" d="m628.35,608.38c17.83,-2.87 36.72,1.39 51.5,11.78c11.22,8.66 19.01,21.64 21.26,35.65c1.53,10.68 0.49,21.75 -3.44,31.84c-3.02,8.73 -7.35,16.94 -12.17,24.81c-68.76,115.58 -137.5,231.17 -206.27,346.75c-8.8,14.47 -16.82,29.47 -26.96,43.07c-7.37,9.11 -16.58,16.85 -27.21,21.89c-22.47,11.97 -51.79,4.67 -68.88,-13.33c-8.66,-8.69 -13.74,-20.63 -14.4,-32.84c-0.98,-12.64 1.81,-25.42 7.53,-36.69c5.03,-10.96 10.98,-21.45 17.19,-31.77c30.22,-50.84 60.17,-101.84 90.3,-152.73c41.24,-69.98 83.16,-139.55 124.66,-209.37c4.41,-7.94 9.91,-15.26 16.09,-21.9c8.33,-8.46 18.9,-15.3 30.8,-17.16z" fill="#1ba0d8"/>
</symbol>
`);


        //添加图标
        this.addTopBar({
            icon: "iconCloudUpload",
            title: "全量备份到alist",
            position: "left",
            callback: () => {
                // console.log(await getCurrentNotePathById(currentDocId));
                // let rect = document.querySelector("#plugin_siyuan-alist_0").getBoundingClientRect();
                // this.addMenu2(rect);
                this.readbackup();
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
                        await uploadToAList(file, alistToPath2 + "/" + today + "/" + file.name); // 调用上传文件的函数
                        //增加插入笔记上传的文件链接
                        // console.log(alistToPath2 + "/" + alistTime + "/" + file.name,"afa");
                        if (clickId) {
                            api.appendBlock('markdown', `📄[${file.name}](${alistUrl}${alistToPath2}/${today}/${file.name})`, clickId);
                        } else {
                            api.appendBlock('markdown', `📄[${file.name}](${alistUrl}${alistToPath2}/${today}/${file.name})`, currentDocId);
                        }
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


        //插件设置相关
        this.settingUtils = new SettingUtils({
            plugin: this, name: STORAGE_NAME
        });



        this.settingUtils.addItem({
            key: "isconnect",
            value: "",
            type: "button",
            title: "验证服务连接",
            description: "判断是否连接上alist服务和是否定时备份",
            button: {
                label: "验证",
                callback: () => {
                    showMessage("正在验证...");
                    if (alistUrl != "") {
                        checkAlistConnection(alistname, alistmima);
                        //TODO:验证是否定时备份
                    } else {
                        showMessage("未配置备份地址", 2000);
                    }
                }
            }
        });
        this.settingUtils.addItem({
            key: "islog",
            value: false,
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
            key: "Select",
            value: 1,
            type: "select",
            title: "选择触发方式",
            description: "选择触发侧边栏或者新建页面方式，默认左键触发侧边栏，alt+左键触发新建页面",
            options: {
                1: "默认",
                2: "alt+左键触发侧边栏",
                3: "alt+左键触发新建页面",
            },
            action: {
                callback: async () => {
                    // Read data in real time
                    await this.settingUtils.takeAndSave("Select");
                    myapi.refresh();
                }
            }
        });
        this.settingUtils.addItem({
            key: "isdrag",
            value: true,
            type: "checkbox",
            title: "增加拖拽上传能力    (功能测试中...欢迎反馈bug)",
            description: "启用后顶栏部分区域可以拖拽文件上传",
            action: {
                callback: async () => {
                    // Return data and save it in real time
                    // let value = !this.settingUtils.get("isdrag");
                    // this.settingUtils.set("isdrag", value);
                    // outLog(value);
                    await this.settingUtils.takeAndSave("isdrag");
                    myapi.refresh();
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

        this.settingUtils.addItem({
            key: "alistTime",
            value: "",
            type: "textinput",
            title: "（可选）每日备份定时【需保证思源一直在运行,且不要多端同时在线】 ",
            description: "设置每日全量备份的时间,不填则取消定时(设置格式eg: 08/00 表示每天 8:00)",
            action: {
                // Called when focus is lost and content changes
                callback: async () => {
                    // Return data and save it in real time
                    let value = await this.settingUtils.takeAndSave("alistTime");
                    alistTime = value;
                    myapi.refresh();
                    // console.log(value);
                }
            }
        });

        this.settingUtils.addItem({
            key: "beta",
            value: false,
            type: "checkbox",
            title: "beta版本",
            description: "启用后可进入beta模式，体验可能不稳定的新功能(具体功能详见更新日志)，欢迎反馈bug ",
            action: {
                callback: async () => {
                    // Return data and save it in real time
                    // let value = !this.settingUtils.get("isdrag");
                    // this.settingUtils.set("isdrag", value);
                    // outLog(value);
                    await this.settingUtils.takeAndSave("beta");
                    myapi.refresh();
                }
            }
        });
        // this.settingUtils.addItem({
        //     key: "beta_pro",
        //     value: false,
        //     type: "checkbox",
        //     title: "beta_pro版本【谨慎启用，建议先在新空间使用】",
        //     description: "体验还在测试中改动较大的新功能（稳定性未知）(具体功能详见更新日志)，欢迎反馈bug ",
        //     action: {
        //         callback: async () => {
        //             // Return data and save it in real time
        //             // let value = !this.settingUtils.get("isdrag");
        //             // this.settingUtils.set("isdrag", value);
        //             // outLog(value);
        //             await this.settingUtils.takeAndSave("beta_pro");
        //             myapi.refresh();
        //         }
        //     }
        // });


        try {
            this.settingUtils.load();
        } catch (error) {
            console.error("Error loading settings storage, probably empty config json:", error);
        }
        //插件设置相关
        console.log(this.i18n.helloPlugin);

    }
    //选中菜单设置


    private blockIconEvent({ detail }: any) {
        console.log("blockIconEvent", detail.element.dataset.href);
        const linkUrl = detail.element.dataset.href;
        if (linkUrl.startsWith("assets")) {
            detail.menu.addItem({
                iconHTML: `<style>
        .wd {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none; /* 防止该元素的文本被选中 */
        }
        </style>
            <div class="wd b3-list-item__text">上传<svg width="15" height="15">
            <use xlink:href="#iconAlist"></use>
        </svg>附件</div>`,
                label: '',
                click: async () => {
                    console.log("上传附件");
                    runblockIconEvent(detail);
                }
            });
        }
        if (linkUrl.startsWith("http")) {
            if (myapi.isUrlContained(linkUrl, alistUrl)) {
                detail.menu.addItem({
                    iconHTML: `<style>
        .wd {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none; /* 防止该元素的文本被选中 */
        }
        </style>
            <div class="wd b3-list-item__text">删除<svg width="15" height="15">
            <use xlink:href="#iconAlist"></use>
        </svg>附件</div>`,
                    label: '',
                    click: async () => {
                        console.log("删除附件");
                        confirm("确定要将附件移动到回收站吗？", "移动到回收站后，请手动删除笔记中的链接", () => {
                        runblockIconEventDelete(detail);
                        });
                    }
                });
            }
        }
    }

    async handleSelectionChange() {
        outLog("handleSelectionChange");
        const blockId = getCursorBlockId();
        if (blockId) {
            // showMessage(`光标所在的块ID: ${blockId}`);
            clickId = blockId;
        } else {
            showMessage("无法获取光标所在的块ID");
        }
    }



    onLayoutReady() {
        isReadonly = window.siyuan.config.readonly;
        if (isReadonly) {
            return;
        }
        // this.settingUtils.load();
        // console.log(`frontend: ${getFrontend()}; backend: ${getBackend()}`);


        alistmima = this.settingUtils.get("alistToken");//TODO:后面改到前面去
        alistname = this.settingUtils.get("alistname");
        alistUrl = this.settingUtils.get("alistUrl");
        alistToPath = this.settingUtils.get("alistToPath");
        alistToPath2 = this.settingUtils.get("alistToPath2");
        alistFilename = this.settingUtils.get("alistFilename");
        alistTime = this.settingUtils.get("alistTime");
        isCtrl = this.settingUtils.get("isCtrl");
        isdrag = this.settingUtils.get("isdrag");
        serNum = this.settingUtils.get("Select");

        beta = this.settingUtils.get("beta");
        beta_pro = this.settingUtils.get("beta_pro");

        trunLog(this.settingUtils.get("islog"));
        // outLog(serNum, "当前触发方式");
        // outLog(alistUrl, "当前备份地址");
        // outLog(alistname, "当前备份用户名");
        // outLog(alistToPath, "当前备份路径");
        // outLog(alistToPath2, "当前附件上传路径");
        // outLog(alistFilename, "当前备份文件名");
        // outLog(url, "当前目标源地址");


        if (beta) {
            this.eventBus.on("open-menu-link", this.blockIconEventBindThis);
            this.eventBus.on("click-editorcontent", this.handleSelectionChange);
        }


        if (alistTime) {
            myapi.scheduleDailyTask(alistTime, () => {
                console.log("备份任务开始执行");
                this.runbackup(alistFilename);
            });
        }
        if (isdrag && !this.isMobile) {//兼容移动端
            insertCountdownElement();
        }
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
            outLog("Current document ID:", currentDocId);
        });
        //获取当前文档ID
    }




    //插件卸载相关
    async onunload() {
        // console.log(this.i18n.byePlugin);
        showMessage("Goodbye ");
        console.log("onunload");

        // this.eventBus.off("paste", this.eventBusPaste);
        document.removeEventListener("click", this.onlick, true);
        this.eventBus.off("open-menu-link", this.blockIconEventBindThis);
        this.eventBus.off("click-editorcontent", this.handleSelectionChange);
    }

    uninstall() {
        console.log("uninstall");
        // this.eventBus.off("paste", this.eventBusPaste);
        document.removeEventListener("click", this.onlick, true);
        this.eventBus.off("open-menu-link", this.blockIconEventBindThis);
        this.eventBus.off("click-editorcontent", this.handleSelectionChange);
    }




    // isCtrl(e): boolean {
    //     return true;
    // }




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
    //点击链接触发的事件 TODO:后续优化，改为官方的点击事件
    onlick = async (e) => {
        //测试

        //测试
        if (
            e.altKey && e.button === 0 &&    // event.button === 0 表示鼠标左键
            e.target.dataset &&
            e.target.dataset.type == "a" &&
            e.target.dataset.href
        ) {
            if (serNum == '1' || serNum == '3') {
                this.openMyTab(e.target, e);
                // this.openMyPDF(e.target, e);//放弃，能力不够
            }
            if (serNum == '2') {
                e.preventDefault();
                try {
                    outLog(e.target.dataset.href);
                    this.isrecall(e.target, e);
                } catch (e) {
                    console.error(e);
                }
            }
        } else if (
            serNum == '1' &&
            e.button === 0 &&
            e.target.dataset &&
            e.target.dataset.type == "a" &&
            e.target.dataset.href
        ) {
            e.preventDefault();
            try {
                outLog(e.target.dataset.href);
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
                if (this.isMobile) {//移动端

                    //另一种方式  TODO:后续优化
                    const iframeHtml = `<iframe src="${target.dataset.href}" style="width:100%; height:100%; border:none;"></iframe>`;
                    console.log(e, 'clickId');
                    const dialog = new sy.Dialog({
                        // positionId: clickId,
                        title: null,
                        content: iframeHtml,
                        width: "80%",
                        height: "82%",
                        disableClose: false,
                        hideCloseIcon: true,
                    });
                    dialog.element.style.position = "absolute";
                    dialog.element.style.left = `${e.clientX}px`;
                    dialog.element.style.top = `${e.clientY}px`;



                } else {
                    const buttonAlist = document.querySelector('span[data-type="siyuan-alistalist-dock"]');
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
                }
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }

    async openMyTab(target: any, e: any) {
        const isContained = myapi.isUrlContained(target.dataset.href, alistUrl);
        if (!isContained) {
            return;
        }
        const tab = sy.openTab({
            app: this.app,
            custom: {
                icon: "iconAlist",
                title: `${target.innerText}`,
                data: null,
                id: this.name + 'alist'
            },
            position: "right",
        });
        const tab1 = await tab
        // console.log(tab1);
        // console.log(tab1.headElement);
        const alistSpan = tab1.headElement.querySelector('span.item__text');
        // 修改其文本内容
        if (alistSpan) {
            alistSpan.textContent = `${target.innerText}`;
        }
        // console.log(tab1.panelElement);
        //插入html
        tab1.panelElement.innerHTML = `<iframe
                    allow="clipboard-read; clipboard-write"
                    sandbox="allow-forms allow-presentation allow-same-origin allow-scripts allow-modals allow-popups"
                    src="${target.dataset.href}"
                    data-src=""
                    border="0"
                    frameborder="no"
                    framespacing="0"
                    allowfullscreen="true"
                    style="height: 100% ; width: 100%;"
                    >
                    </iframe>`;
        e.preventDefault();
        e.stopPropagation();
    }



    readbackup() {
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


}



function insertCountdownElement() {//TODO:需要优化
    let toolbarDrag = document.querySelector('#toolbar > #drag');
    if (toolbarDrag) {
        toolbarDrag.insertAdjacentHTML(
            "afterend",
            `<head>
    <style>
        .upload-container {
            width: 100px;
            height: 30px;
            border-radius: 4px;
            background-color: var(--b3-toolbar-hover) ;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 13px;
            cursor: pointer;
            text-align: center;
            
        }


        .upload-input {
            display: none;
        }
        .wd {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none; /* 防止该元素的文本被选中 */
        }
    </style>

</head>
<body>
    <div id="uploadContainer" class="upload-container">
        <div class="wd b3-list-item__text">上传<svg width="15" height="15">
            <use xlink:href="#iconAlist"></use>
        </svg>附件</div>
        <input type="file" id="fileInput" class="upload-input" multiple>
    </div>
</body>`
        );
    } else {
        console.error("找不到 #toolbar > #drag 元素");
    }
    const uploadContainer = document.getElementById('uploadContainer');
    const fileInput = document.getElementById('fileInput');
    const textElement = uploadContainer.querySelector('.wd') as HTMLElement; // 获取子元素
    uploadContainer.addEventListener('click', () => {
        fileInput.click();
    });

    // 文件选择事件处理
    fileInput.addEventListener('change', async (event) => {
        console.log(event);
        const inputElement = event.target as HTMLInputElement; // 类型断言
        const files = inputElement.files; // 现在可以安全地访问 files
        if (files && files.length > 0) {
            const file = files[0]; // 获取选中的第一个文件
            await uploadToAList(file, alistToPath2 + "/" + today + "/" + file.name); // 调用上传文件的函数
            //增加插入笔记上传的文件链接
            if (clickId) {
                api.appendBlock('markdown', `📄[${file.name}](${alistUrl}${alistToPath2}/${today}/${file.name})`, clickId);
            } else {
                api.appendBlock('markdown', `📄[${file.name}](${alistUrl}${alistToPath2}/${today}/${file.name})`, currentDocId);
            }
        }
    });
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
            await uploadToAList(file, alistToPath2 + "/" + today + "/" + file.name); // 调用上传文件的函数
            // 增加插入笔记上传的文件链接
            if (clickId) {
                api.appendBlock('markdown', `📄[${file.name}](${alistUrl}${alistToPath2}/${today}/${file.name})`, clickId);
            } else {
                api.appendBlock('markdown', `📄[${file.name}](${alistUrl}${alistToPath2}/${today}/${file.name})`, currentDocId);
            }
        } else {
            console.log("没有文件");
            showMessage("没有文件", 1000);
        }
    });
}


//右键上传附件
async function runblockIconEvent(detail: any) {
    const file = await downloadImage(decodeURIComponent("data/" + detail.element.dataset.href))
    // console.log(decodeURIComponent("data/" + detail.element.dataset.href));
    const filename = detail.element.dataset.href.split("/")[1];
    await uploadToAList(file, alistToPath2 + "/" + today + "/" + filename);
    api.appendBlock('markdown', `📄[${filename}](${alistUrl}${alistToPath2}/${today}/${filename})`, detail.element.offsetParent.dataset.nodeId);
    // console.log("ces1", detail.element.dataset.href);
    // console.log("ces2", detail.element.offsetParent.dataset.nodeId);
}

//右键删除附件
async function runblockIconEventDelete(detail: any) {
    const filename = myapi.getFileNameFromUrl(detail.element.dataset.href, true);
    const path = myapi.getPathFromUrl(detail.element.dataset.href);
    console.log(filename);
    console.log(path);
    // console.log("ces1", detail.element.dataset.href);
    myapi.alistDelete(path, filename);
    myapi.deletetxt(detail.element.offsetParent.dataset.nodeId);
    // api.deleteBlock(detail.element.offsetParent.dataset.nodeId);
}



//根据光标获取块ID
function getCursorBlockId() {
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
        return blockElement.getAttribute('data-node-id');
    } else {
        return null;
    }
}


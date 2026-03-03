// import { createApp } from "vue";
// import App from "./app.vue";
import * as sy from "siyuan";
import {
    Plugin,
    showMessage,
    getFrontend,
    // getBackend,
    IModel,
    IOperation,
    // Menu,
    confirm,
    fetchSyncPost,
    Protyle,
    // openTab
} from "siyuan";
import "@/index.scss";
// import * as api from "@/api"
import * as myapi from "@/myapi";
import * as api from '@/api';
declare global {
    const siyuan: any;
}

import {
    downloadImage,
    outLog,
    trunLog,
    exportAllDataPath,
    uploadToAList,
    checkAlistConnection,
} from "@/myapi";

import { SettingUtils } from "./libs/setting-utils";
import { buildFilenameInputElement, getCursorBlockId, insertCountdownElement, runblockIconEvent, runblockIconEventDelete } from "./runblockIconEventDelete";
import { svgIconsDefinition } from "./svgIconsDefinition";
import { getAlistDockUpdateHtml, getAlistDockHtml, uploadFileComponentHTML, removeFileIconHTML } from "./fileUploadElement";

const STORAGE_NAME = "menu-config";

export let currentProtyle
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
export let selectTOP: string | null = null;
export let alistPIC: string | null = null;
export let alistExternalUrl: string | null = null;

export function getDisplayUrl(): string {
    return alistExternalUrl || alistUrl || '';
}

export let today: string | null = null;
export let timeNow: string | null = null;
export let kuai: boolean = false;

export let clickId: string | null = null;
let resizeObserver: ResizeObserver | null = null;
let resizeTimeout: number = 0;
// let notePath: string | null = null;
export let targetURL: string | null = null;
let isclickalist: boolean = true;
export default class SiYuanAlist extends Plugin {
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
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        timeNow = `${year}${month}${day}${hour}${minute}${second}`;
        today = year + "-" + month + "-" + day;
        console.log(today, "当前日期");
        //监听事件
        document.addEventListener("click", this.onlick, true);

        const frontEnd = getFrontend();
        this.isMobile = frontEnd === "mobile" || frontEnd === "browser-mobile";
        console.log(frontEnd, this.isMobile);
        this.data[STORAGE_NAME] = { readonlyText: "Readon" };

        this.addIcons(svgIconsDefinition);
        //添加图标
        this.addTopBar({
            icon: "iconCloudUpload",
            title: "全量备份到alist",
            position: "left",
            callback: () => {
                this.readbackup();
            }
        });

        this.addTopBar({
            icon: "iconAlist",
            title: "附件上传",
            position: "right",
            callback: async () => {
                SiYuanAlist.createFileInput();
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
                this.element.innerHTML = getAlistDockUpdateHtml();
                const targetElement = this.element.querySelector('#alist-dock iframe');
                if (targetElement) {
                    resizeObserver = new ResizeObserver(() => {
                        (targetElement as HTMLElement).style.pointerEvents = 'none';

                        clearTimeout(resizeTimeout);
                        resizeTimeout = window.setTimeout(() => {
                            (targetElement as HTMLElement).style.pointerEvents = 'auto';
                        }, 300); // 300毫秒后恢复
                    });

                    resizeObserver.observe(targetElement);
                }

            },
            init: (dock) => {
                this.alistdock = dock;//将dock赋值给全局变量，以便在其它地方进行后续操作
                if (alistUrl == "") {
                    showMessage("请先配置alist网址...", -1, "error");
                }
                dock.element.innerHTML = getAlistDockHtml();
                //拖动流畅代码
                const targetElement = dock.element.querySelector('#alist-dock iframe');
                if (targetElement) {
                    resizeObserver = new ResizeObserver(() => {
                        (targetElement as HTMLElement).style.pointerEvents = 'none';

                        clearTimeout(resizeTimeout);
                        resizeTimeout = window.setTimeout(() => {
                            (targetElement as HTMLElement).style.pointerEvents = 'auto';
                        }, 300); // 300毫秒后恢复
                    });

                    resizeObserver.observe(targetElement);
                }
            },
            destroy() {
                console.log("destroy dock:", "alist-dock");
                // 断开 ResizeObserver
                if (resizeObserver) {
                    resizeObserver.disconnect();
                    resizeObserver = null;
                }
                // 清除定时器
                clearTimeout(resizeTimeout);
            }

        });
        //插件设置相关
        this.settingUtils = new SettingUtils({
            plugin: this, name: STORAGE_NAME
        });
        this.initializeSettings(frontEnd);
        try {
            this.settingUtils.load();
        } catch (error) {
            console.error("Error loading settings storage, probably empty config json:", error);
        }
    }

    private initializeSettings(frontEnd: string) {//设置相关
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
            key: "kuai",
            value: true,
            type: "checkbox",
            title: "自动插入视频块 （beta）",
            description: "当上传视频时自动在思源中插入视频块",
            action: {
                callback: async () => {
                    await this.settingUtils.takeAndSave("kuai");
                    myapi.refresh();
                }
            }
        });
        this.settingUtils.addItem({
            key: "isdrag",
            value: true,
            type: "checkbox",
            title: "增加拖拽上传能力",
            description: "启用后顶栏部分区域可以拖拽文件上传",
            action: {
                callback: async () => {
                    // Return data and save it in real time
                    await this.settingUtils.takeAndSave("isdrag");
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
            key: "alistExternalUrl",
            value: "",
            type: "textinput",
            title: "alist外网展示地址（可选）",
            description: "用于笔记中展示文件的外网地址，留空则使用上方的服务地址",
            action: {
                callback: async () => {
                    let value = await this.settingUtils.takeAndSave("alistExternalUrl");
                    alistExternalUrl = value || null;
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
            description: "备份到alist的默认文件名,支持自定义时间戳变量${timeNow}(注意要加后缀名eg:${timeNow}-siyuan-backup.zip)",
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
            key: "PIC",
            value: null,
            type: "textinput",
            title: "alist图片文件夹",
            description: `为方便alist管理，将图片单独保存在一个文件夹中`,
            action: {
                callback: async () => {
                    // Read data in real time
                    alistPIC = await this.settingUtils.takeAndSave("PIC");
                    // myapi.refresh();
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
            key: "SelectTOP",
            value: 1,
            type: "textinput",
            title: "选择自动备份平台（设定完后请刷新一下哦）（beta）",
            description: `当前平台：${frontEnd} ,请填入要自动备份的平台,目前只支持一种平台`,
            action: {
                callback: async () => {
                    // Read data in real time
                    await this.settingUtils.takeAndSave("SelectTOP");
                    // myapi.refresh();
                }
            }
        });

        this.settingUtils.addItem({
            key: "beta",
            value: true,
            type: "checkbox",
            title: "beta版本（经长时间测试，未发现问题，建议开启，预计下个版本默认开启）",
            description: "启用后可进入beta模式，体验更多可能不稳定的新功能(具体功能详见更新日志)，欢迎反馈bug ",
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
    }

    static createFileInput() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '*/*'; // 支持所有文件类型
        fileInput.multiple = true; // 支持多文件选择
        // 文件选择事件处理
        fileInput.addEventListener('change', async (event) => {
            const inputElement = event.target as HTMLInputElement; // 类型断言
            const files = inputElement.files; // 现在可以安全地访问 files
            if (files && files.length > 0) {
                for (const file of files) { // 遍历所有选中的文件
                    if (file.type.startsWith('image')) {
                        await SiYuanAlist.handleImageUpload(file); // 上传图片文件
                    } else {
                        await SiYuanAlist.handleFileUpload(file); // 上传其他类型的文件
                    }
                }
            }
        });
        fileInput.click();
    }

    static async handleFileUpload(file: File, selectID=null) {
        if (selectID){
            clickId=selectID;
        }
        await uploadToAList(file, alistToPath2 + "/" + today + "/" + file.name, async () => {
            if (file.type.startsWith('video') && kuai) {
                console.log("视频");
                // console.log(blockId, "kaui-id");
                let filesign;
                try {
                    filesign = await myapi.alistgetSign(`${alistToPath2}/${today}/${file.name}`);
                } catch (err) {
                    console.error("请求失败，重试一次：", err);
                    if (clickId) {
                        api.appendBlock('markdown', `📄[${file.name}](${getDisplayUrl()}${alistToPath2}/${today}/${file.name})`, clickId);
                    } else {
                        api.appendBlock('markdown', `📄[${file.name}](${getDisplayUrl()}${alistToPath2}/${today}/${file.name})`, currentDocId);
                    }
                }
                let SIGN = '';
                if (filesign.data.sign) {
                    SIGN = "?sign=" + filesign.data.sign;
                }
                if (clickId) {
                    console.log("clickId");
                    api.appendBlock('markdown',
                        `<video controls="controls" src="${getDisplayUrl()}/d${alistToPath2}/${today}/${file.name}${SIGN}"></video>`,
                        clickId);
                } else {
                    api.appendBlock('dom',
                        `<video controls="controls" src="${getDisplayUrl()}/d${alistToPath2}/${today}/${file.name}${SIGN}"></video>`,
                        currentDocId);
                }
            } else {
                if (clickId) {
                    api.appendBlock('markdown', `📄[${file.name}](${getDisplayUrl()}${alistToPath2}/${today}/${file.name})`, clickId);
                } else {
                    api.appendBlock('markdown', `📄[${file.name}](${getDisplayUrl()}${alistToPath2}/${today}/${file.name})`, currentDocId);
                }
            }
        });
    }

    static async handleImageUpload(file: File , selectID=null) {
        if (selectID){
            clickId=selectID;
        }
        await uploadToAList(file, alistPIC + "/" + today + "/" + file.name, async () => {
            console.log("图片");
            const filesign = await myapi.alistgetSign(`${alistPIC}/${today}/${file.name}`);
            let SIGN = '';
            console.log(filesign, "filesign");
            if (filesign.data.sign) {
                SIGN = "?sign=" + filesign.data.sign;
            }
            if (clickId) {
                api.appendBlock('markdown', `![${file.name}](${getDisplayUrl()}/d${alistPIC}/${today}/${file.name}${SIGN})`, clickId);
            } else {
                api.appendBlock('markdown', `![${file.name}](${getDisplayUrl()}/d${alistPIC}/${today}/${file.name}${SIGN})`, currentDocId);
            }
        });
    }

    //配合STtools插件使用，保存ics文件
    static async handleFileUploadwithoutlink(file: File) {
        await uploadToAList(file, alistToPath2 + "/" + file.name);
    }
    //选中菜单设置


    private blockIconEvent({ detail }: any) {
        // console.log(detail.element, "blockIconEvent2222");
        let linkUrl = '';
        const imgElement = detail.element.querySelector('img');
        if (imgElement) {
            console.log('imgElement');
            linkUrl = imgElement.getAttribute('src');
        } else {
            console.log("blockIconEvent", detail.element.dataset.href);
            linkUrl = detail.element.dataset.href;
        }
        if (linkUrl.startsWith("assets")) {
            detail.menu.addItem({
                iconHTML: uploadFileComponentHTML,
                label: '',
                click: async () => {
                    console.log("上传附件");
                    runblockIconEvent(linkUrl, detail);
                }
            });
        }
        if (linkUrl.startsWith("http")) {
            if (myapi.isUrlContained(linkUrl, alistUrl)) {
                detail.menu.addItem({
                    iconHTML: removeFileIconHTML,
                    label: '',
                    click: async () => {
                        console.log("删除附件");
                        confirm("确定要将附件移动到回收站吗？", "移动到回收站后，请手动删除笔记中的链接", () => {
                            console.log(detail.element);
                            runblockIconEventDelete(linkUrl, detail);
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
            outLog("无法获取光标所在的块ID");
        }
    }


    onLayoutReady() {
        isReadonly = window.siyuan.config.readonly;
        if (isReadonly) {
            return;
        }
        // this.settingUtils.load();
        alistmima = this.settingUtils.get("alistToken");//TODO:后面改到前面去
        alistname = this.settingUtils.get("alistname");
        alistUrl = this.settingUtils.get("alistUrl");
        alistExternalUrl = this.settingUtils.get("alistExternalUrl") || null;
        alistToPath = this.settingUtils.get("alistToPath");
        alistToPath2 = this.settingUtils.get("alistToPath2");
        alistFilename = this.settingUtils.get("alistFilename");
        alistTime = this.settingUtils.get("alistTime");
        isCtrl = this.settingUtils.get("isCtrl");
        isdrag = this.settingUtils.get("isdrag");
        serNum = this.settingUtils.get("Select");
        selectTOP = this.settingUtils.get("SelectTOP");
        alistPIC = this.settingUtils.get("PIC");
        kuai = this.settingUtils.get("kuai");

        beta = this.settingUtils.get("beta");
        // beta_pro = this.settingUtils.get("beta_pro");

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
            this.eventBus.on("open-menu-image", this.blockIconEventBindThis);
        }


        if (alistTime && selectTOP.startsWith(getFrontend())) {//TODO
            console.log("定时备份允许");
            myapi.scheduleDailyTask(alistTime, () => {
                console.log("备份任务开始执行");
                this.runbackup(alistFilename);
            });
        } else {
            console.log("无定时备份任务");
        }

        if (isdrag && !this.isMobile) {//兼容移动端，防止报错
            insertCountdownElement();
        }


        //获取当前文档ID
        this.eventBus.on("switch-protyle", (event) => {
            // console.log(event);
            currentProtyle = event.detail.protyle;
            currentDocId = event.detail.protyle.block.id;
            outLog("Current document IDS:", currentDocId);
        });
        // this.eventBus.on("loaded-protyle-static", (event) => {
        //     currentProtyle = event.detail.protyle;
        //     currentDocId = event.detail.protyle.block.id;
        //     outLog("Current document ID2:", currentDocId);
        // });     //获取当前文档ID
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

    private async runbackup(Filename: string) {
        showMessage("正在备份...", -1, "info", "备份")
        outLog('runbackup');
        try {
            if (Filename.includes("${timeNow}")) {
                updateTimeNow();
                Filename = Filename.replace("${timeNow}", timeNow);
            }
            console.log(`${Filename}`, "being backed up");
            const link = await exportAllDataPath();
            // const data = await downloadImageURL(link);
            const data = await downloadImage(link);
            await uploadToAList(data, alistToPath + "/" + `${Filename}`);
        } catch (error) {
            showMessage("备份失败!", -1, "error", "备份");
            console.error('Failed to run runbackup:', error);
        }
        showMessage("备份结束!", 6000, "info", "备份")
    }
    //点击链接触发的事件 TODO:后续优化，改为官方的点击事件
    onlick = async (e) => {
        //测试
        // if (resizeObserver) {
        //     // ResizeObserver 存在且未断开
        //     console.log("ResizeObserver 正在观察元素");
        // } else {
        //     // ResizeObserver 不存在或已断开
        //     console.log("ResizeObserver 不存在或已断开");
        // }
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
                            this.alistdock.destroy();
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
                                this.alistdock.destroy();
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
                    style="height: 100% ; width: 99%;"
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
        confirm("请给备份文件取个名字 ^_^", buildFilenameInputElement(), () => {
            const inputElement = document.getElementById("alistFilename") as HTMLInputElement;
            let inputValue = inputElement.value;
            if (inputValue) {
                outLog("正在备份..." + inputValue);
                outLog("备份data");
                this.runbackup(inputValue);
            } else {
                showMessage("没有输入文件名，备份取消。");
                return;
            }
        });
    }


}

function updateTimeNow() {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hour = date.getHours().toString().padStart(2, '0');
    let minute = date.getMinutes().toString().padStart(2, '0');
    let second = date.getSeconds().toString().padStart(2, '0');
    timeNow = `${year}${month}${day}${hour}${minute}${second}`;
}


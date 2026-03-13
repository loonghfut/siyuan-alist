import * as sy from 'siyuan';
import {
    Plugin,
    showMessage,
    getFrontend,
    confirm,
} from 'siyuan';
import '@/index.scss';

import { state } from '@/core/state';
import { outLog } from '@/core/logger';
import { scheduleDailyTask } from '@/core/scheduler';
import { isUrlContained } from '@/utils/url';

import { SettingUtils } from '@/libs/setting-utils';
import { registerSettings, loadConfigFromSettings } from '@/ui/settings';
import { createDockConfig } from '@/ui/dock';
import { insertToolbarUpload } from '@/ui/toolbar';
import { buildFilenameInput } from '@/ui/templates';
import { svgIconsDefinition } from '@/svgIconsDefinition';

import { runBackup } from '@/features/backup';
import { createFileInput, handleFileUpload, handleImageUpload, handleFileUploadWithoutLink } from '@/features/upload';
import { blockIconEventHandler, getCursorBlockId } from '@/features/block-menu';

const STORAGE_NAME = 'menu-config';

// Re-exports for backward compatibility (STtools plugin etc.)
export { state };
export const getDisplayUrl = () => state.displayUrl;
export let currentDocId: string | null = null;

export default class SiYuanAlist extends Plugin {
    private settingUtils: SettingUtils;
    private alistdock: { current: any } = { current: null };
    private isclickalist: { current: boolean } = { current: true };
    private blockIconEventBindThis = this.blockIconEvent.bind(this);

    async onload() {
        state.isReadonly = window.siyuan.config.readonly;
        if (state.isReadonly) return;

        state.refreshTimestamp();

        const frontEnd = getFrontend();
        state.isMobile = frontEnd === 'mobile' || frontEnd === 'browser-mobile';

        document.addEventListener('click', this.onLinkClick, true);
        this.data[STORAGE_NAME] = { readonlyText: 'Readon' };

        this.addIcons(svgIconsDefinition);

        this.addTopBar({
            icon: 'iconCloudUpload',
            title: '全量备份到alist',
            position: 'left',
            callback: () => this.readBackup(),
        });

        this.addTopBar({
            icon: 'iconAlist',
            title: '附件上传',
            position: 'right',
            callback: () => createFileInput(),
        });

        this.addDock(createDockConfig(this.alistdock, this.isclickalist) as any);

        this.settingUtils = new SettingUtils({ plugin: this, name: STORAGE_NAME });
        registerSettings(this.settingUtils, frontEnd);
        try {
            this.settingUtils.load();
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }

    onLayoutReady() {
        state.isReadonly = window.siyuan.config.readonly;
        if (state.isReadonly) return;

        loadConfigFromSettings(this.settingUtils);

        if (state.config.beta) {
            this.eventBus.on('open-menu-link', this.blockIconEventBindThis);
            this.eventBus.on('click-editorcontent', this.handleSelectionChange);
            this.eventBus.on('open-menu-image', this.blockIconEventBindThis);
        }

        if (state.config.backupTime && state.config.backupPlatform?.startsWith(getFrontend())) {
            scheduleDailyTask(state.config.backupTime, () => {
                runBackup(state.config.backupFilename);
            });
        }

        if (state.config.enableDrag && !state.isMobile) {
            insertToolbarUpload();
        }

        this.eventBus.on('switch-protyle', (event: any) => {
            state.currentProtyle = event.detail.protyle;
            state.currentDocId = event.detail.protyle.block.id;
            currentDocId = state.currentDocId;
            outLog('Current document ID:', state.currentDocId);
        });
    }

    async onunload() {
        showMessage('Goodbye ');
        document.removeEventListener('click', this.onLinkClick, true);
        this.eventBus.off('open-menu-link', this.blockIconEventBindThis);
        this.eventBus.off('click-editorcontent', this.handleSelectionChange);
    }

    uninstall() {
        document.removeEventListener('click', this.onLinkClick, true);
        this.eventBus.off('open-menu-link', this.blockIconEventBindThis);
        this.eventBus.off('click-editorcontent', this.handleSelectionChange);
    }

    // --- Static methods for external plugin compatibility (STtools) ---
    static createFileInput = createFileInput;
    static handleFileUpload = handleFileUpload;
    static handleImageUpload = handleImageUpload;
    static handleFileUploadwithoutlink = handleFileUploadWithoutLink;

    // --- Private methods ---

    private blockIconEvent(event: any) {
        blockIconEventHandler(event);
    }

    private handleSelectionChange() {
        outLog('handleSelectionChange');
        const blockId = getCursorBlockId();
        if (blockId) {
            state.clickId = blockId;
        }
    }

    private readBackup() {
        if (!state.config.alistUrl) {
            showMessage('请先配置备份地址！');
            return;
        }
        confirm(
            '请给备份文件取个名字 ^_^',
            buildFilenameInput(state.config.backupFilename),
            () => {
                const input = document.getElementById('alistFilename') as HTMLInputElement;
                if (input?.value) {
                    runBackup(input.value);
                } else {
                    showMessage('没有输入文件名，备份取消。');
                }
            },
        );
    }

    private onLinkClick = async (e: any) => {
        const { triggerMode } = state.config;

        if (
            e.altKey && e.button === 0 &&
            e.target.dataset?.type === 'a' &&
            e.target.dataset.href
        ) {
            if (triggerMode === '1' || triggerMode === '3') {
                this.openTab(e.target, e);
            }
            if (triggerMode === '2') {
                e.preventDefault();
                this.handleAlistLink(e.target, e);
            }
        } else if (
            triggerMode === '1' &&
            e.button === 0 &&
            e.target.dataset?.type === 'a' &&
            e.target.dataset.href
        ) {
            e.preventDefault();
            this.handleAlistLink(e.target, e);
        }
    };

    private handleAlistLink(target: any, e: any) {
        if (!target.dataset.href) return;
        if (!isUrlContained(target.dataset.href, state.config.alistUrl)) return;

        if (state.isMobile) {
            const dialog = new sy.Dialog({
                title: null,
                content: `<iframe src="${target.dataset.href}" style="width:100%; height:100%; border:none;"></iframe>`,
                width: '80%',
                height: '82%',
                disableClose: false,
                hideCloseIcon: true,
            });
            dialog.element.style.position = 'absolute';
            dialog.element.style.left = `${e.clientX}px`;
            dialog.element.style.top = `${e.clientY}px`;
        } else {
            const btn = document.querySelector('span[data-type="siyuan-alistalist-dock"]');
            if (!btn) return;

            if (this.isclickalist.current) {
                btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
            }

            if (this.alistdock.current) {
                state.targetUrl = target.dataset.href;
                this.alistdock.current.destroy();
                this.alistdock.current.update();
            } else {
                btn.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
                if (this.alistdock.current) {
                    state.targetUrl = target.dataset.href;
                    this.alistdock.current.destroy();
                    this.alistdock.current.update();
                }
            }
        }
        e.preventDefault();
        e.stopPropagation();
    }

    private async openTab(target: any, e: any) {
        if (!isUrlContained(target.dataset.href, state.config.alistUrl)) return;

        const tab = await sy.openTab({
            app: this.app,
            custom: {
                icon: 'iconAlist',
                title: target.innerText,
                data: null,
                id: this.name + 'alist',
            },
            position: 'right',
        });

        const span = tab.headElement.querySelector('span.item__text');
        if (span) span.textContent = target.innerText;

        tab.panelElement.innerHTML = `<iframe
            allow="clipboard-read; clipboard-write"
            sandbox="allow-forms allow-presentation allow-same-origin allow-scripts allow-modals allow-popups"
            src="${target.dataset.href}"
            data-src=""
            border="0"
            frameborder="no"
            framespacing="0"
            allowfullscreen="true"
            style="height: 100%; width: 99%;"
        ></iframe>`;

        e.preventDefault();
        e.stopPropagation();
    }
}

import type { Protyle } from 'siyuan';
import { formatToday, formatTimestamp } from '@/utils/date';

export interface PluginConfig {
    alistUrl: string;
    alistExternalUrl: string | null;
    alistUsername: string;
    alistPassword: string;
    backupPath: string;
    uploadPath: string;
    imagePath: string | null;
    backupFilename: string;
    backupTime: string;
    triggerMode: string;
    backupPlatform: string | null;
    autoInsertVideo: boolean;
    enableDrag: boolean;
    beta: boolean;
    enableLog: boolean;
}

class PluginState {
    config: PluginConfig = {
        alistUrl: '',
        alistExternalUrl: null,
        alistUsername: '',
        alistPassword: '',
        backupPath: '',
        uploadPath: '',
        imagePath: null,
        backupFilename: '',
        backupTime: '',
        triggerMode: '1',
        backupPlatform: null,
        autoInsertVideo: true,
        enableDrag: true,
        beta: true,
        enableLog: false,
    };

    currentProtyle: Protyle['protyle'] | null = null;
    currentDocId: string | null = null;
    clickId: string | null = null;
    today: string = formatToday();
    timeNow: string = formatTimestamp();
    targetUrl: string | null = null;
    isReadonly = false;
    isMobile = false;

    get displayUrl(): string {
        return this.config.alistExternalUrl || this.config.alistUrl || '';
    }

    refreshTimestamp() {
        this.timeNow = formatTimestamp();
        this.today = formatToday();
    }
}

export const state = new PluginState();

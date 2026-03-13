import { showMessage } from 'siyuan';
import { SettingUtils } from '@/libs/setting-utils';
import { state } from '@/core/state';
import { toggleLog, outLog } from '@/core/logger';
import { checkConnection } from '@/services/alist-client';

export function registerSettings(settingUtils: SettingUtils, frontEnd: string) {
    settingUtils.addItem({
        key: 'isconnect',
        value: '',
        type: 'button',
        title: '验证服务连接',
        description: '判断是否连接上alist服务和是否定时备份',
        button: {
            label: '验证',
            callback: () => {
                if (state.config.alistUrl) {
                    showMessage('正在验证...');
                    checkConnection(state.config.alistUsername, state.config.alistPassword);
                } else {
                    showMessage('未配置备份地址', 2000);
                }
            },
        },
    });

    settingUtils.addItem({
        key: 'islog',
        value: false,
        type: 'checkbox',
        title: '是否日志输出',
        description: '控制本插件日志是否输出到控制台',
        action: {
            callback: () => {
                const value = !settingUtils.get('islog');
                settingUtils.set('islog', value);
                toggleLog(value);
                outLog(value);
            },
        },
    });

    settingUtils.addItem({
        key: 'Select',
        value: 1,
        type: 'select',
        title: '选择触发方式',
        description: '选择触发侧边栏或者新建页面方式，默认左键触发侧边栏，alt+左键触发新建页面',
        options: { 1: '默认', 2: 'alt+左键触发侧边栏', 3: 'alt+左键触发新建页面' },
        action: {
            callback: async () => {
                await settingUtils.takeAndSave('Select');
            },
        },
    });

    settingUtils.addItem({
        key: 'kuai',
        value: true,
        type: 'checkbox',
        title: '自动插入视频块 （beta）',
        description: '当上传视频时自动在思源中插入视频块',
        action: {
            callback: async () => {
                await settingUtils.takeAndSave('kuai');
            },
        },
    });

    settingUtils.addItem({
        key: 'isdrag',
        value: true,
        type: 'checkbox',
        title: '增加拖拽上传能力',
        description: '启用后顶栏部分区域可以拖拽文件上传',
        action: {
            callback: async () => {
                await settingUtils.takeAndSave('isdrag');
            },
        },
    });

    settingUtils.addItem({
        key: 'alistUrl',
        value: '',
        type: 'textinput',
        title: 'alist服务地址',
        description: '备份到alist的服务地址',
        action: {
            callback: async () => {
                state.config.alistUrl = await settingUtils.takeAndSave('alistUrl');
            },
        },
    });

    settingUtils.addItem({
        key: 'alistExternalUrl',
        value: '',
        type: 'textinput',
        title: 'alist外网展示地址（可选）',
        description: '用于笔记中展示文件的外网地址，留空则使用上方的服务地址',
        action: {
            callback: async () => {
                state.config.alistExternalUrl = (await settingUtils.takeAndSave('alistExternalUrl')) || null;
            },
        },
    });

    settingUtils.addItem({
        key: 'alistname',
        value: '',
        type: 'textinput',
        title: 'alist用户名',
        description: '备份到alist的用户名',
        action: {
            callback: async () => {
                state.config.alistUsername = await settingUtils.takeAndSave('alistname');
            },
        },
    });

    settingUtils.addItem({
        key: 'alistToken',
        value: '',
        type: 'textinput',
        title: 'alist密码',
        description: '备份到alist的密码',
        action: {
            callback: async () => {
                state.config.alistPassword = await settingUtils.takeAndSave('alistToken');
            },
        },
    });

    settingUtils.addItem({
        key: 'alistToPath',
        value: '',
        type: 'textinput',
        title: '备份路径',
        description: '备份到alist的路径',
        action: {
            callback: async () => {
                state.config.backupPath = await settingUtils.takeAndSave('alistToPath');
            },
        },
    });

    settingUtils.addItem({
        key: 'alistFilename',
        value: '',
        type: 'textinput',
        title: '默认备份文件名',
        description: '备份到alist的默认文件名,支持自定义时间戳变量${timeNow}(注意要加后缀名eg:${timeNow}-siyuan-backup.zip)',
        action: {
            callback: async () => {
                state.config.backupFilename = await settingUtils.takeAndSave('alistFilename');
            },
        },
    });

    settingUtils.addItem({
        key: 'alistToPath2',
        value: '',
        type: 'textinput',
        title: '附件上传路径',
        description: '附件上传到alist的路径',
        action: {
            callback: async () => {
                state.config.uploadPath = await settingUtils.takeAndSave('alistToPath2');
            },
        },
    });

    settingUtils.addItem({
        key: 'PIC',
        value: null,
        type: 'textinput',
        title: 'alist图片文件夹',
        description: '为方便alist管理，将图片单独保存在一个文件夹中',
        action: {
            callback: async () => {
                state.config.imagePath = await settingUtils.takeAndSave('PIC');
            },
        },
    });

    settingUtils.addItem({
        key: 'alistTime',
        value: '',
        type: 'textinput',
        title: '（可选）每日备份定时【需保证思源一直在运行,且不要多端同时在线】',
        description: '设置每日全量备份的时间,不填则取消定时(设置格式eg: 08/00 表示每天 8:00)',
        action: {
            callback: async () => {
                state.config.backupTime = await settingUtils.takeAndSave('alistTime');
            },
        },
    });

    settingUtils.addItem({
        key: 'SelectTOP',
        value: 1,
        type: 'textinput',
        title: '选择自动备份平台（设定完后请刷新一下哦）（beta）',
        description: `当前平台：${frontEnd} ,请填入要自动备份的平台,目前只支持一种平台`,
        action: {
            callback: async () => {
                await settingUtils.takeAndSave('SelectTOP');
            },
        },
    });

    settingUtils.addItem({
        key: 'beta',
        value: true,
        type: 'checkbox',
        title: 'beta版本（经长时间测试，未发现问题，建议开启）',
        description: '启用后可进入beta模式，体验更多可能不稳定的新功能(具体功能详见更新日志)',
        action: {
            callback: async () => {
                await settingUtils.takeAndSave('beta');
            },
        },
    });
}

export function loadConfigFromSettings(settingUtils: SettingUtils) {
    state.config.alistPassword = settingUtils.get('alistToken');
    state.config.alistUsername = settingUtils.get('alistname');
    state.config.alistUrl = settingUtils.get('alistUrl');
    state.config.alistExternalUrl = settingUtils.get('alistExternalUrl') || null;
    state.config.backupPath = settingUtils.get('alistToPath');
    state.config.uploadPath = settingUtils.get('alistToPath2');
    state.config.backupFilename = settingUtils.get('alistFilename');
    state.config.backupTime = settingUtils.get('alistTime');
    state.config.triggerMode = settingUtils.get('Select');
    state.config.backupPlatform = settingUtils.get('SelectTOP');
    state.config.imagePath = settingUtils.get('PIC');
    state.config.autoInsertVideo = settingUtils.get('kuai');
    state.config.enableDrag = settingUtils.get('isdrag');
    state.config.beta = settingUtils.get('beta');
    state.config.enableLog = settingUtils.get('islog');

    toggleLog(state.config.enableLog);
}

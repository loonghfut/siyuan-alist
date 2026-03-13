import { showMessage } from 'siyuan';
import { outLog } from './logger';

export function scheduleDailyTask(time: string, task: () => void) {
    const parts = time.split('/');
    if (parts.length !== 2) {
        showMessage('alist备份时间格式错误，正确格式为 "小时/分钟"', -1, 'error');
        throw new Error('时间格式错误，正确格式为 "小时/分钟"');
    }

    const hour = Number(parts[0]);
    const minute = Number(parts[1]);

    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
        showMessage('alist备份时间小时或分钟无效，请确保小时在0-23之间，分钟在0-59之间', -1, 'error');
        throw new Error('小时或分钟无效');
    }

    outLog(`${hour} ${minute}`, 'scheduleDailyTask');

    function scheduleNext() {
        task();
        const now = new Date();
        const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, hour, minute, 0);
        const delay = next.getTime() - now.getTime();
        setTimeout(scheduleNext, delay);
    }

    const now = new Date();
    const target = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0);
    if (now > target) {
        target.setDate(target.getDate() + 1);
    }

    const delay = target.getTime() - now.getTime();
    showMessage(`alist备份任务将在 ${hour}:${minute} 执行，距离下次执行还有 ${Math.round(delay / 1000)} 秒`);
    setTimeout(scheduleNext, delay);
}

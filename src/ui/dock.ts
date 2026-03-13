import { showMessage } from 'siyuan';
import { state } from '@/core/state';
import { getDockHTML } from './templates';

let resizeObserver: ResizeObserver | null = null;
let resizeTimeout = 0;

function attachResizeGuard(iframe: HTMLElement) {
    if (resizeObserver) {
        resizeObserver.disconnect();
    }
    resizeObserver = new ResizeObserver(() => {
        iframe.style.pointerEvents = 'none';
        clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(() => {
            iframe.style.pointerEvents = 'auto';
        }, 300);
    });
    resizeObserver.observe(iframe);
}

export function createDockConfig(alistdockRef: { current: any }, isclickRef: { current: boolean }) {
    return {
        config: {
            position: 'RightTop' as const,
            size: { width: 250, height: 0 },
            icon: 'iconAlist',
            title: 'alist网页',
        },
        data: null,
        type: 'alist-dock',
        resize() {
            if (this.element.clientWidth === 0) {
                isclickRef.current = true;
            } else {
                isclickRef.current = false;
                this.element.style.width = '200px';
            }
        },
        update() {
            this.element.innerHTML = getDockHTML(state.targetUrl || state.config.alistUrl);
            const iframe = this.element.querySelector('#alist-dock iframe') as HTMLElement;
            if (iframe) attachResizeGuard(iframe);
        },
        init: (dock: any) => {
            alistdockRef.current = dock;
            if (!state.config.alistUrl) {
                showMessage('请先配置alist网址...', -1, 'error');
            }
            dock.element.innerHTML = getDockHTML(state.config.alistUrl);
            const iframe = dock.element.querySelector('#alist-dock iframe') as HTMLElement;
            if (iframe) attachResizeGuard(iframe);
        },
        destroy() {
            if (resizeObserver) {
                resizeObserver.disconnect();
                resizeObserver = null;
            }
            clearTimeout(resizeTimeout);
        },
    };
}

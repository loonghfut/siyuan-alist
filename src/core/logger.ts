let enabled = false;

export function toggleLog(value: boolean) {
    enabled = value;
}

export function outLog(msg: any, tag = '') {
    if (enabled) {
        console.log(msg, tag);
    }
}

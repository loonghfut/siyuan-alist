export function isUrlContained(targetUrl: string, standardUrl: string): boolean {
    try {
        const target = new URL(targetUrl);
        const standard = new URL(standardUrl);
        return (
            target.protocol === standard.protocol &&
            target.hostname === standard.hostname &&
            target.pathname.startsWith(standard.pathname)
        );
    } catch {
        return false;
    }
}

export function getFileNameFromUrl(url: string, decode = false): string {
    const parsedUrl = new URL(url);
    const fileName = parsedUrl.pathname.split('/').pop() || '';
    return decode ? decodeURIComponent(fileName) : fileName;
}

export function getPathFromUrl(url: string): string {
    const parsedUrl = new URL(url);
    let pathname = decodeURIComponent(parsedUrl.pathname);
    if (pathname.startsWith('/d/')) {
        pathname = pathname.substring(2);
    }
    return pathname.substring(0, pathname.lastIndexOf('/'));
}

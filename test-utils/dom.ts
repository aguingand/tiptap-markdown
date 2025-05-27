

export function clipboardEvent(name: string) {
    const clipboardData = {
        data: {} as Record<string, string>,
        getData(format: string) { return this.data[format] },
        setData(format: string, content: string) { this.data[format] = content },
        clearData(format: string) { delete this.data[format] },
    };
    const event = new Event(name);
    (event as any).clipboardData = clipboardData;

    return event as ClipboardEvent;
}

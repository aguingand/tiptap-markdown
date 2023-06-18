

export function clipboardEvent(name) {
    const clipboardData = {
        data: {},
        getData(format) { return this.data[format] },
        setData(format, content) { return this.data[format] = content },
    };
    const event = new Event(name);
    event.clipboardData = clipboardData;

    return event;
}

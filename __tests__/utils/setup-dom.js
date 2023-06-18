
document.createRange = () => {
    return Object.assign(new Range(), {
        getClientRects: () => [],
        getBoundingClientRect: () => ({}),
    });
};

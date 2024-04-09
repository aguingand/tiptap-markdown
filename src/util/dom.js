

export function elementFromString(value) {
    // add a wrapper to preserve leading and trailing whitespace
    const wrappedValue = `<body>${value}</body>`

    return new window.DOMParser().parseFromString(wrappedValue, 'text/html').body
}

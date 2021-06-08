

export function elementFromString(value) {
    // add a wrapper to preserve leading and trailing whitespace
    const wrappedValue = `<body>${value}</body>`

    return new window.DOMParser().parseFromString(wrappedValue, 'text/html').body
}

export function extractElement(node) {
    const parent = node.parentElement;
    const prepend = parent.cloneNode();

    while(parent.firstChild && parent.firstChild !== node) {
        prepend.appendChild(parent.firstChild);
    }

    parent.parentElement.insertBefore(prepend, parent);
    parent.parentElement.insertBefore(node, parent);
}

export function isVoidElement(tagName) {
    if(!tagName) {
        return false;
    }
    return [
        'area',
        'base',
        'basefont',
        'bgsound',
        'br',
        'col',
        'command',
        'embed',
        'frame',
        'hr',
        'image',
        'img',
        'input',
        'isindex',
        'keygen',
        'link',
        'menuitem',
        'meta',
        'nextid',
        'param',
        'source',
        'track',
        'wbr'
    ].includes(tagName.toLowerCase());
}

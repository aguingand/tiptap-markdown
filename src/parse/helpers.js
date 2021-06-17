import { extractElement } from "../util/dom";

export function normalizeDOM(schema, node) {
    normalizeBlocks(schema, node);
    [...node.querySelectorAll('p')]
        .filter(p => !p.innerHTML.trim())
        .forEach(p => p.remove());
    return node;
}

function normalizeBlocks(schema, node) {
    const blocks = Object.values(schema.nodes)
        .filter(node => node.isBlock);

    const selector = blocks
        .map(block => block.spec.parseDOM?.map(spec => spec.tag))
        .flat()
        .filter(Boolean)
        .join(',');

    if(!selector) {
        return;
    }

    [...node.querySelectorAll(selector)].forEach(el => {
        if(el.parentElement.matches('p')) {
            extractElement(el);
        }
    });
}

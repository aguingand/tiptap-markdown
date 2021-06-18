import { extractElement, unwrapElement } from "../util/dom";

export function normalizeDOM(schema, node, { inline } = {}) {
    normalizeBlocks(schema, node);

    [...node.querySelectorAll('p')]
        .filter(p => !p.innerHTML.trim())
        .forEach(p => p.remove());

    if(inline
        && node.firstElementChild.matches('p')
        // && node.querySelectorAll(':scope > p').length === 1
    ) {
        unwrapElement(node.firstElementChild);
    }

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

import { extractElement, unwrapElement } from "../util/dom";

export function normalizeDOM(schema, node, { inline } = {}) {
    normalizeBlocks(schema, node);
    normalizeNewLines(node);

    if(inline && node.firstElementChild.matches('p')) {
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

function normalizeNewLines(node) {
    [...node.querySelectorAll('*')]
        .filter(node => {
            if(node.closest('pre') && !node.matches('pre')) {
                return false;
            }
            return true;
        })
        .forEach(node => {
            const { previousSibling, nextSibling } = node;
            if(previousSibling?.nodeType === Node.TEXT_NODE) {
                previousSibling.textContent = previousSibling.textContent.replace(/\n$/, '');
            }
            if(nextSibling?.nodeType === Node.TEXT_NODE) {
                nextSibling.textContent = nextSibling.textContent.replace(/^\n/, '');
            }
        });
}

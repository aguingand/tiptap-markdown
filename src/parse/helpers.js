import { extractElement, unwrapElement } from "../util/dom";

export function normalizeDOM(schema, node, { inline, content } = {}) {
    normalizeBlocks(schema, node);

    if(inline) {
        normalizeInline(node, content);
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

function normalizeInline(node, content) {
    if(node.firstElementChild.matches('p')) {
        const firstParagraph = node.firstElementChild;
        const { nextSibling, nextElementSibling } = firstParagraph;
        const startSpaces = content.match(/^\s+/)?.[0] ?? '';
        const endSpaces = !nextElementSibling
            ? content.match(/\s+$/)?.[0] ?? ''
            : '';

        if(nextSibling?.nodeType === Node.TEXT_NODE) {
            nextSibling.textContent = nextSibling.textContent.replace(/^\n/, '');
        }

        if(content.match(/^\n\n/)) {
            firstParagraph.innerHTML = `${firstParagraph.innerHTML}${endSpaces}`;
            return;
        }

        unwrapElement(firstParagraph);

        node.innerHTML = `${startSpaces}${node.innerHTML}${endSpaces}`;
    }
}

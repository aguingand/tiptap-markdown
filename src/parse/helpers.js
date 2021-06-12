import { extractElement } from "../util/dom";


export function setupTaskLists(node) {
    [...node.querySelectorAll('.contains-task-list')]
        .forEach(list => {
            list.setAttribute('data-type', 'taskList');
            [...list.children].forEach(item => {
                const input = item.querySelector('input');
                item.setAttribute('data-type', 'taskItem');
                if(input) {
                    item.setAttribute('data-checked', input.checked);
                    input.remove();
                }
            });
        });
}

export function normalizeHTML(html) {
    html = html.replace(/\n<\/code>/g, '</code>');
    return html;
}

export function normalizeBlocks(schema, node) {
    const blocks = Object.values(schema.nodes)
        .filter(node => node.spec.group === 'block');

    const selector = blocks
        .map(block => block.spec.parseDOM?.map(spec => spec.tag))
        .flat()
        .filter(Boolean)
        .join(',');

    [...node.querySelectorAll(selector)].forEach(el => {
        if(el.parentElement.matches('p')) {
            extractElement(el);
        }
    });
}

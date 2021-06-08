import markdownit from "markdown-it";
import markPlugin from "markdown-it-mark";
import taskListPlugin from "markdown-it-task-lists";
import { DOMParser } from "prosemirror-model";
import { elementFromString } from "../util/dom";

function normalizeHTML(schema, html) {
    html = html.replace(/\n<\/code>/g, '</code>');
    if(schema.nodes.image?.spec.group === 'block') {
        html = html.replace(/(<img.*?>)/g, '</p>$1<p>');
    }
    html = html.replace(/<p><\/p>/g, '');
    return html;
}

function updateDOM(node) {
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
    return node;
}

export function parse(schema, content, { html }) {
    if(typeof content === 'string') {
        const renderer = markdownit({ html })
            .use(markPlugin)
            .use(taskListPlugin);
        const renderedHTML = normalizeHTML(schema, renderer.render(content));
        const element = updateDOM(elementFromString(renderedHTML));
        return DOMParser.fromSchema(schema)
            .parse(element)
            .toJSON();
    }
    return content;
}

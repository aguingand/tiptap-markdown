import markdownit from "markdown-it";
import markPlugin from "markdown-it-mark";
import taskListPlugin from "markdown-it-task-lists";
import { DOMParser } from "prosemirror-model";
import { elementFromString } from "../util/dom";
import { normalizeHTML, normalizeBlocks, setupTaskLists } from "./helpers";

function setupDOM(schema, node) {
    node.innerHTML = normalizeHTML(schema, node.innerHTML);
    setupTaskLists(node);
    normalizeBlocks(schema, node);
    [...node.querySelectorAll('p')]
        .filter(p => !p.innerHTML.trim())
        .forEach(p => p.remove());
    return node;
}

export function parse(schema, content, { html }) {
    if(typeof content === 'string') {
        const renderer = markdownit({ html })
            .use(markPlugin)
            .use(taskListPlugin);
        const renderedHTML = renderer.render(content);
        const element = setupDOM(schema, elementFromString(renderedHTML));
        return DOMParser.fromSchema(schema)
            .parse(element)
            .toJSON();
    }
    return content;
}

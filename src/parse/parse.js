import markdownit from "markdown-it";
import { DOMParser } from "prosemirror-model";
import { elementFromString } from "../util/dom";
import { normalizeBlocks } from "./helpers";

function normalizeDOM(schema, node) {
    normalizeBlocks(schema, node);
    [...node.querySelectorAll('p')]
        .filter(p => !p.innerHTML.trim())
        .forEach(p => p.remove());
    return node;
}

export function parse(schema, content, { extensions, ...options }) {
    const {
        html,
        linkify,
        languageClassPrefix,
    } = options;

    if(typeof content === 'string') {
        const renderer = markdownit({
            html,
            linkify,
        });
        extensions.forEach(extension => extension.parse?.setup?.call({ schema, options }, renderer));

        const renderedHTML = renderer.render(content);
        const element = elementFromString(renderedHTML);

        extensions.forEach(extension => extension.parse?.updateDOM?.call({ schema, options }, element));
        normalizeDOM(schema, element);

        return DOMParser.fromSchema(schema)
            .parse(element)
            .toJSON();
    }
    return content;
}

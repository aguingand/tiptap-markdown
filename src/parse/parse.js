import markdownit from "markdown-it";
import { DOMParser } from "prosemirror-model";
import { elementFromString } from "../util/dom";
import { normalizeDOM } from "./helpers";

export function parse(schema, content, { extensions, ...options }) {
    const {
        html,
        linkify,
        languageClassPrefix,
        inline,
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

        normalizeDOM(schema, element, { inline });

        return element.innerHTML;
    }
    return content;
}

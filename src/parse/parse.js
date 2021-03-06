import markdownit from "markdown-it";
import { elementFromString } from "../util/dom";
import { normalizeDOM } from "./helpers";

export function parse(schema, content, { extensions, ...options }) {
    const {
        html,
        linkify,
        inline,
        breaks,
    } = options;

    if(typeof content === 'string') {
        const renderer = markdownit({
            html,
            linkify,
            breaks,
        });

        extensions.forEach(extension => extension.parse?.setup?.call({ schema, options }, renderer));

        const renderedHTML = renderer.render(content);
        const element = elementFromString(renderedHTML);

        extensions.forEach(extension => extension.parse?.updateDOM?.call({ schema, options }, element));

        normalizeDOM(schema, element, { inline, content });

        return element.innerHTML;
    }
    return content;
}

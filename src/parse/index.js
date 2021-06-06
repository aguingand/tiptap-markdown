import markdownit from "markdown-it";
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

export function parse(schema, content, { html }) {
    if(typeof content === 'string') {
        const renderer = markdownit({ html });
        const renderedHTML = normalizeHTML(schema, renderer.render(content));
        return DOMParser.fromSchema(schema)
            .parse(elementFromString(renderedHTML))
            .toJSON();
    }
    return content;
}

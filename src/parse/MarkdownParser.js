import markdownit from "markdown-it";
import { elementFromString } from "../util/dom";
import { normalizeDOM } from "./helpers";


export class MarkdownParser {
    editor = null;

    constructor(editor) {
        this.editor = editor;
    }

    parse(content, { inline } = {}) {
        const {
            html,
            linkify,
            breaks,
        } = this.editor.options.markdown;

        if(typeof content === 'string') {
            const renderer = markdownit({
                html,
                linkify,
                breaks,
            });

            this.editor.markdownExtensions.forEach(extension => extension.parse.setup?.(renderer));

            const renderedHTML = renderer.render(content);
            const element = elementFromString(renderedHTML);

            this.editor.markdownExtensions.forEach(extension => extension.parse.updateDOM?.(element));

            normalizeDOM(this.editor.schema, element, { inline, content });

            return element.innerHTML;
        }

        return content;
    }
}


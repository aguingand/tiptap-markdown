import markdownit from "markdown-it";
import { elementFromString, extractElement, unwrapElement } from "../util/dom";


export class MarkdownParser {
    /**
     * @type {MarkdownEditor}
     */
    editor = null;

    constructor(editor) {
        this.editor = editor;
    }

    parse(content, { inline } = {}) {
        const {
            html,
            linkify,
            breaks,
        } = this.editor.storage.markdown.options;

        if(typeof content === 'string') {
            const renderer = markdownit({
                html,
                linkify,
                breaks,
            });

            const markdownExtensions = this.editor.storage.markdown.getExtensions();

            markdownExtensions.forEach(extension => extension.parse.setup?.(renderer));

            const renderedHTML = renderer.render(content);
            const element = elementFromString(renderedHTML);

            markdownExtensions.forEach(extension => extension.parse.updateDOM?.(element));

            this.normalizeDOM(element, { inline, content });

            return element.innerHTML;
        }

        return content;
    }

    normalizeDOM(node, { inline, content } = {}) {
        this.normalizeBlocks(node);

        if(inline) {
            this.normalizeInline(node, content);
        }

        return node;
    }

    normalizeBlocks(node) {
        const blocks = Object.values(this.editor.schema.nodes)
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

    normalizeInline(node, content) {
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
}


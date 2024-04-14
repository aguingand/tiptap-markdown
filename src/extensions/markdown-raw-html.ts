import { createNodeFromContent, Extension, elementFromString } from "@tiptap/core";
import { MarkdownOptions, MarkdownStorage } from "../Markdown";
import rehypeRaw from "rehype-raw";
import remarkRehype from "remark-rehype";
import rehypeRemark from "rehype-remark";
import { defaultHandlers as rehypeRemarkDefaultHandlers, Handle } from "hast-util-to-mdast";
import { Html } from "mdast";
import { toHtml } from "hast-util-to-html";
import { DOMParser, DOMSerializer, NodeType, MarkType  } from '@tiptap/pm/model';


export const MarkdownRawHTML = Extension.create({
    name: 'markdownRawHTML',
    priority: 2000, // must run before every other extensions that will override handlers
    parseMarkdown({ toHTML }) {
        toHTML.use(remarkRehype, { allowDangerousHtml: true });
        // if((this.editor.storage.markdown as MarkdownStorage).options.html) {
            toHTML.use(rehypeRaw);
        // }
    },
    renderMarkdown({ toMarkdown }) {
        const passthroughElements: Array<keyof typeof rehypeRemarkDefaultHandlers> = [
            'a',
            'blockquote',
            'br',
            'code',
            'em',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'hr',
            'img',
            'li',
            'ol',
            'p',
            's',
            'strong',
            'table',
            'td',
            'th',
            'tr',
        ];
        const handleHTML: (tagName: string, nodeOrMarkType?: NodeType | MarkType) => Handle =
            (tagName, nodeOrMarkType) => (state, node, parent) => {
                if((this.editor.storage.markdown as MarkdownStorage).options.html) {
                    const html = toHtml(node);
                    if(nodeOrMarkType instanceof NodeType) {
                        if(nodeOrMarkType.isBlock) {
                            const result: Html = {
                                type: 'html',
                                value: html
                                    .replace(/^(<[^>]+>)/, '$1\n')
                                    .replace(/(<\/[^>]+>)$/, '\n$1')
                                    .replace('\n\n', '\n')
                            };
                            state.patch(node, result);
                            return result;
                        }
                    }
                    const result: Html = { type: 'html', value: html };
                    state.patch(node, result);
                    return result;
                }
                console.warn('Tiptap Markdown: the following element will not be serialized to HTML because the `html` option is disabled: ', toHtml(node));
                const defaultHandler = (rehypeRemarkDefaultHandlers as any)[tagName];
                return defaultHandler
                    ? defaultHandler(state, node, parent)
                    : state.all(node);
            };
        const handlersFromDefaults = Object.fromEntries(
            Object.entries(rehypeRemarkDefaultHandlers).map(([name, handler]) => {
                if(passthroughElements.includes(name as any)) {
                    return [name, handler];
                }
                return [
                    name,
                    handleHTML(name),
                ];
            })
        );
        const handlersFromSchema = Object.fromEntries([
            ...Object.entries(this.editor.schema.nodes)
                .map<[string | null, NodeType]>(([name, nodeType]) => [getTagNameFromNodeType(nodeType), nodeType])
                .filter(([tagName, nodeType]) => !!tagName)
                .map(([tagName, nodeType]) => [
                    tagName,
                    handleHTML(tagName as string, nodeType)
                ]),
            ...Object.entries(this.editor.schema.marks)
                .map<[string | null, MarkType]>(([name, markType]) => [getTagNameFromMarkType(markType), markType])
                .filter(([tagName, markType]) => !!tagName)
                .map(([tagName, markType]) => [
                    tagName,
                    handleHTML(tagName as string, markType)
                ]),
        ]);

        toMarkdown.use(rehypeRemark, {
            handlers: {
                ...handlersFromDefaults,
                ...handlersFromSchema,
            },
        });
    },
});


function getTagNameFromNodeType(nodeType: NodeType) {
    const attrs = Object.fromEntries(Object.entries(nodeType.spec.attrs ?? {}).map(([name]) => [name, null]));
    const output = nodeType.spec.toDOM?.(nodeType.create(attrs));
    const fixedOutput = Array.isArray(output)
        ? output.filter(spec => spec != null) as [string, ...any[]]
        : output;
    const spec = fixedOutput ? DOMSerializer.renderSpec(document, fixedOutput) : null;
    return spec?.dom instanceof HTMLElement ? spec.dom.tagName.toLowerCase() : null;
}

function getTagNameFromMarkType(markType: MarkType) {
    const attrs = Object.fromEntries(Object.entries(markType.spec.attrs ?? {}).map(([name]) => [name, null]));
    const output = markType.spec.toDOM?.(markType.create(attrs), false);
    const fixedOutput = Array.isArray(output)
        ? output.filter(spec => spec != null) as [string, ...any[]]
        : output;
    const spec = fixedOutput ? DOMSerializer.renderSpec(document, fixedOutput) : null;
    return spec?.dom instanceof HTMLElement ? spec.dom.tagName.toLowerCase() : null;
}

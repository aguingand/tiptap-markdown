import { Extension } from "@tiptap/core";
import { MarkdownStorage } from "../Markdown";
import rehypeRaw from "rehype-raw";
import remarkRehype from "remark-rehype";
import rehypeRemark from "rehype-remark";
import { defaultHandlers as rehypeRemarkDefaultHandlers, defaultNodeHandlers as rehypeRemarkDefaultNodeHandlers } from "hast-util-to-mdast";
import { Html } from "mdast";
import { toHtml } from "hast-util-to-html";
import { visit } from "unist-util-visit";


export const MarkdownRawHTML = Extension.create({
    name: 'markdownRawHTML',
    priority: 2000, // must run before every other extensions that will override handlers
    parseMarkdown({ toHTML }) {
        toHTML.use(remarkRehype, { allowDangerousHtml: true });
        if((this.editor.storage.markdown as MarkdownStorage).options.html) {
            toHTML.use(rehypeRaw);
        }
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
        toMarkdown.use(rehypeRemark, {
            nodeHandlers: {
                root: (state, node) => {
                    const initialState = { ...state };
                    state.one = (node, parent) => {
                        if(node.type === 'element' && !passthroughElements.includes(node.tagName as any)) {
                            const cleanedNode = structuredClone(node);
                            visit(cleanedNode, (childNode) => {
                                if(childNode.type === 'element') {
                                    delete childNode.properties.dataNode;
                                    delete childNode.properties.dataMark;
                                }
                            });
                            const html = toHtml(cleanedNode);
                            if((this.editor.storage.markdown as MarkdownStorage).options.html) {
                                if(this.editor.schema.nodes[node.properties.dataNode as string]?.isBlock) {
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
                                const result: Html = { type: 'html', value: html };
                                state.patch(node, result);
                                return result;
                            }
                            console.warn('Tiptap Markdown: the following element will not be serialized to HTML because the `html` option is disabled: ', html);
                            const defaultHandler = (rehypeRemarkDefaultHandlers as any)[node.tagName];
                            return defaultHandler
                                ? defaultHandler(state, node, parent)
                                : state.all(node);
                        }
                        return initialState.one.call(state, node, parent);
                    }
                    state.all = initialState.all.bind(state);
                    state.toFlow = initialState.toFlow.bind(state);
                    return rehypeRemarkDefaultNodeHandlers.root(state, node);
                },
            },
        });
    },
});

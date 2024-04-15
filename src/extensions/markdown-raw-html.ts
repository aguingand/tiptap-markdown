import { createNodeFromContent, Extension, elementFromString } from "@tiptap/core";
import { MarkdownOptions, MarkdownStorage } from "../Markdown";
import rehypeRaw from "rehype-raw";
import remarkRehype from "remark-rehype";
import rehypeRemark from "rehype-remark";
import { defaultHandlers as rehypeRemarkDefaultHandlers, defaultNodeHandlers as rehypeRemarkDefaultNodeHandlers, Handle } from "hast-util-to-mdast";
import { Html } from "mdast";
import { toHtml } from "hast-util-to-html";
import { DOMParser, DOMSerializer, NodeType, MarkType  } from '@tiptap/pm/model';
import editor from "../../example-legacy/src/components/Editor.vue";


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
        // const handlersFromDefaults = Object.fromEntries(
        //     Object.entries(rehypeRemarkDefaultHandlers).map(([name, handler]) => {
        //         if(passthroughElements.includes(name as any)) {
        //             return [name, handler];
        //         }
        //         return [
        //             name,
        //             handleHTML(name),
        //         ];
        //     })
        // );
        // const handlersFromSchema = Object.fromEntries([
        //     ...Object.entries(this.editor.schema.nodes)
        //         .map<[string | null, NodeType]>(([name, nodeType]) => [getTagNameFromNodeType(nodeType), nodeType])
        //         .filter(([tagName, nodeType]) => !!tagName)
        //         .map(([tagName, nodeType]) => [
        //             tagName,
        //             handleHTML(tagName as string, nodeType)
        //         ]),
        //     ...Object.entries(this.editor.schema.marks)
        //         .map<[string | null, MarkType]>(([name, markType]) => [getTagNameFromMarkType(markType), markType])
        //         .filter(([tagName, markType]) => !!tagName)
        //         .map(([tagName, markType]) => [
        //             tagName,
        //             handleHTML(tagName as string, markType)
        //         ]),
        // ]);
        const editor = this.editor;
        toMarkdown.use(rehypeRemark, {
            nodeHandlers: {
                root: (state, node) => {
                    const initialState = { ...state };
                    state.one = (node, parent) => {
                        if(node.type === 'element' && !passthroughElements.includes(node.tagName)) {
                            if(node.properties.dataMark) {
                                const prosemirrorMarkName = node.properties.dataMark;
                                delete node.properties.dataMark;
                                return handleHTML(node.tagName, editor.schema.marks[prosemirrorMarkName])(state, node, parent);
                            } else if(node.properties.dataNode) {
                                const prosemirrorNodeName = node.properties.dataNode;
                                delete node.properties.dataNode;
                                return handleHTML(node.tagName, editor.schema.nodes[prosemirrorNodeName])(state, node, parent);
                            }
                            return handleHTML(node.tagName)(state, node, parent);
                        }
                        return initialState.one.call(state, node, parent);
                    }
                    state.all = initialState.all.bind(state);
                    return rehypeRemarkDefaultNodeHandlers.root(state, node);
                },
            },
            // handlers: {
            //     ...handlersFromDefaults,
            //     ...handlersFromSchema,
            // },
        });
    },
});

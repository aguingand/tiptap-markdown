import { Mark } from "@tiptap/core";
import { Emphasis, Strong } from "mdast";
import { remarkMarker, stringifyMarker } from "../../remark-plugins/markers";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import rehypeRemark from "rehype-remark";
import { defaultHandlers as remarkRehypeDefaultHandlers } from "mdast-util-to-hast";
import { defaultHandlers as remarkStringifyDefaultHandlers, Handle, Options } from "mdast-util-to-markdown";
import { defaultHandlers as rehypeRemarkDefaultHandlers } from "hast-util-to-mdast";

const Bold = Mark.create({
    name: 'bold',
});

export default Bold.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            'data-markdown-marker': {
                default: '*'
            },
        }
    },
    parseMarkdown({ fromMarkdown, toHTML }) {
        fromMarkdown.use(remarkMarker);
        toHTML.use(remarkRehype, {
            handlers: {
                strong: (state, node: Strong) => {
                    const element = remarkRehypeDefaultHandlers.strong(state, node);
                    element.properties.dataMarkdownMarker = node.data!.marker;
                    return element;
                }
            }
        });
    },
    renderMarkdown({ toMarkdown }) {
        toMarkdown
            .use(rehypeRemark, {
                handlers: {
                    strong(state, element) {
                        const node = rehypeRemarkDefaultHandlers.strong(state, element);
                        (node.data ??= {}).marker = element.properties.dataMarkdownMarker as any;
                        return node;
                    }
                }
            })
            .use(remarkStringify, {
                handlers: {
                    strong: stringifyMarker(remarkStringifyDefaultHandlers.strong, (node) => ({
                        marker: node.data!.marker ?? '*',
                        options: {
                            strong: node.data!.marker ?? '*',
                        },
                    })),
                }
            });
    }
});

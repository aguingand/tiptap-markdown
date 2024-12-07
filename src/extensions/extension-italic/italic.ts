import { Mark } from "@tiptap/core";
import { Emphasis } from "mdast";
import { remarkMarker, stringifyMarker } from "../../remark-plugins/markers";
import remarkRehype from "remark-rehype";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import { defaultHandlers as remarkRehypeDefaultHandlers } from "mdast-util-to-hast";
import { defaultHandlers as rehypeRemarkDefaultHandlers } from "hast-util-to-mdast";
import { defaultHandlers as remarkStringifyDefaultHandlers } from "mdast-util-to-markdown";


const Italic = Mark.create({
    name: 'italic',
});

export default Italic.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            'data-markdown-marker': {
                default: '*',
            },
        }
    },
    parseMarkdown({ fromMarkdown, toHTML }) {
        fromMarkdown.use(remarkMarker)
        toHTML.use(remarkRehype, {
            handlers: {
                emphasis: (state, node: Emphasis) => {
                    const element = remarkRehypeDefaultHandlers.emphasis(state, node);
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
                    em(state, element) {
                        const node = rehypeRemarkDefaultHandlers.em(state, element);
                        (node.data ??= {}).marker = element.properties.dataMarkdownMarker as any;
                        return node;
                    }
                }
            })
            .use(remarkStringify, {
                handlers: {
                    emphasis: stringifyMarker(remarkStringifyDefaultHandlers.emphasis, (node) => ({
                        marker: node.data!.marker ?? '*',
                        options: {
                            emphasis: node.data!.marker ?? '*',
                        },
                    })),
                }
            });
    }
})


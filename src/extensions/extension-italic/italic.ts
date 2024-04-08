import { Mark } from "@tiptap/core";
import { Emphasis } from "mdast";
import { remarkMarker } from "../../remark-plugins/remark-marker-plugin";
import { withOptions } from "../../util/state";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import rehypeRemark from "rehype-remark";
import { defaultHandlers as remarkRehypeDefaultHandlers } from "mdast-util-to-hast";
import { defaultHandlers as remarkStringifyDefaultHandlers } from "mdast-util-to-markdown";
import { defaultHandlers as rehypeRemarkDefaultHandlers } from "hast-util-to-mdast";


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
    fromMarkdown({ remark }) {
        remark
            .use(remarkMarker)
            .use(remarkRehype, {
                handlers: {
                    emphasis(state, node: Emphasis) {
                        const element = remarkRehypeDefaultHandlers.emphasis(state, node);
                        element.properties.dataMarkdownMarker = node.marker;
                        return element;
                    }
                }
            });
    },
    toMarkdown({ remark }) {
        remark
            .use(rehypeRemark, {
                handlers: {
                    em(state, element) {
                        const node = rehypeRemarkDefaultHandlers.em(state, element);
                        node.marker = element.properties.dataMarkdownMarker as string;
                        return node;
                    }
                }
            })
            .use(remarkStringify, {
                handlers: {
                    emphasis(node: Emphasis, parent, state, info) {
                        return withOptions(state, { emphasis: node.marker as any }, (state) =>
                            remarkStringifyDefaultHandlers.emphasis(node, parent, state, info)
                        );
                    }
                }
            })
    }
})


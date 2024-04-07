import { Mark } from "@tiptap/core";
import { Strong } from "mdast";
import { remarkMarker } from "../../remark-plugins/remark-marker-plugin";
import { withOptions } from "../../util/state";

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
    fromMarkdown({ remark, remarkRehype, remarkRehypeDefaultHandlers }) {
        remark
            .use(remarkMarker)
            .use(remarkRehype, {
                handlers: {
                    strong(state, node: Strong) {
                        console.log(node);
                        const element = remarkRehypeDefaultHandlers.strong(state, node);
                        element.properties.dataMarkdownMarker = node.marker;
                        return element;
                    }
                }
            });
    },
    toMarkdown({ remark, rehypeRemark, rehypeRemarkDefaultHandlers, remarkStringify, remarkStringifyDefaultHandlers }) {
        remark
            .use(rehypeRemark, {
                handlers: {
                    strong(state, element) {
                        const node = rehypeRemarkDefaultHandlers.strong(state, element);
                        node.marker = element.properties.markdownMarker as string;
                        return node;
                    }
                }
            })
            .use(remarkStringify, {
                handlers: {
                    strong(node: Strong, parent, state, info) {
                       return withOptions(state, { strong: node.marker as any }, (state) =>
                           remarkStringifyDefaultHandlers.strong(node, parent, state, info)
                       )
                    }
                }
            })
    }
});

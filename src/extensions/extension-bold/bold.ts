import { Mark } from "@tiptap/core";
import { Strong } from "mdast";
import { remarkMarker } from "../../remark-plugins/remark-marker-plugin";
import { withOptions } from "../../util/state";
import remarkRehype from "remark-rehype";
import remarkStringify from "remark-stringify";
import rehypeRemark from "rehype-remark";
import { defaultHandlers as remarkRehypeDefaultHandlers } from "mdast-util-to-hast";
import { defaultHandlers as remarkStringifyDefaultHandlers } from "mdast-util-to-markdown";
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
                    element.properties.dataMarkdownMarker = node.marker;
                    return element;
                }
            }
        });
    },
    renderMarkdown({ fromHTML, toMarkdown }) {
        fromHTML.use(rehypeRemark, {
            handlers: {
                strong(state, element) {
                    const node = rehypeRemarkDefaultHandlers.strong(state, element);
                    node.marker = element.properties.dataMarkdownMarker as string;
                    return node;
                }
            }
        });
        toMarkdown.use(remarkStringify, {
            handlers: {
                strong(node: Strong, parent, state, info) {
                   return withOptions(state, { strong: node.marker as any }, (state) =>
                       remarkStringifyDefaultHandlers.strong(node, parent, state, info)
                   )
                }
            }
        });
    }
});

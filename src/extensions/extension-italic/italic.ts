import { Mark } from "@tiptap/core";
import { Emphasis } from "mdast";
import { remarkMarker } from "../../remark-plugins/remark-marker-plugin";
import { withOptions } from "../../util/state";
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
                    element.properties.dataMarkdownMarker = node.marker;
                    return element;
                }
            }
        });
    },
    renderMarkdown({ fromHTML, toMarkdown }) {
        fromHTML.use(rehypeRemark, {
            handlers: {
                em(state, element) {
                    const node = rehypeRemarkDefaultHandlers.em(state, element);
                    node.marker = element.properties.dataMarkdownMarker as string;
                    return node;
                }
            }
        });
        toMarkdown.use(remarkStringify, {
            handlers: {
                emphasis(node: Emphasis, parent, state, info) {
                    return withOptions(state, { emphasis: node.marker as any }, (state) =>
                        remarkStringifyDefaultHandlers.emphasis(node, parent, state, info)
                    );
                }
            }
        });
    }
})


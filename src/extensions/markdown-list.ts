import { Node } from "@tiptap/core";
import { Element } from "hast";
import { List } from "mdast";
import remarkRehype, { Options as RemarkRehypeOptions } from "remark-rehype";
import { defaultHandlers as remarkRehypeDefaultHandlers } from "mdast-util-to-hast";
import rehypeRemark from "rehype-remark";
import { defaultHandlers as rehypeRemarkDefaultHandlers } from "hast-util-to-mdast";
import { WithMarkdownStorage } from "../types";


export const MarkdownList = Node.create<any, WithMarkdownStorage>({
    name: '', // take parent name
    defaultOptions: null,
    addAttributes() {
        return {
            ...this.parent?.(),
            tight: {
                default: this.storage.markdown.options.tightLists,
                parseHTML: element =>
                    element.getAttribute('data-tight') === 'true' || !element.querySelector('p'),
                renderHTML: attributes => ({
                    class: attributes.tight ? this.storage.markdown.options.tightListClass : null,
                    'data-tight': attributes.tight ? 'true' : null,
                }),
            },
        };
    },
    parseMarkdown({ toHTML }) {
        const remarkRehypeOptions: RemarkRehypeOptions = {
            handlers: {
                list(state, node) {
                    const element = remarkRehypeDefaultHandlers.list(state, node);

                    if((element.properties.className as string[])?.[0] === 'contains-task-list') {
                        element.properties.dataType = 'taskList';
                    }

                    return element;
                }
            },
        };
        toHTML.use(remarkRehype, remarkRehypeOptions);
        return { remarkRehypeOptions };
    },
    renderMarkdown({ toMarkdown }) {
        function handleTight(element: Element, markdownNode: List) {
            if(element.properties.dataTight === 'true') {
                markdownNode.spread = false;
                markdownNode.children.forEach(listItem => {
                    listItem.spread = false;
                });
            }
            return markdownNode;
        }

        toMarkdown.use(rehypeRemark, {
            handlers: {
                ul(state, element) {
                    return handleTight(element, rehypeRemarkDefaultHandlers.ul(state, element));
                },
                ol(state, element) {
                    return handleTight(element, rehypeRemarkDefaultHandlers.ol(state, element));
                },
            }
        })
    }
});
MarkdownList.config.defaultOptions = null;

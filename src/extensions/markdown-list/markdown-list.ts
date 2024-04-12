import { Node } from "@tiptap/core";
import { Element } from "hast";
import { List } from "mdast";
import { MarkdownStorage } from "../../Markdown";
import remarkRehype from "remark-rehype";
import { defaultHandlers as remarkRehypeDefaultHandlers } from "mdast-util-to-hast";
import rehypeRemark from "rehype-remark/lib";
import { defaultHandlers as rehypeRemarkDefaultHandlers } from "hast-util-to-mdast";

export const MarkdownList = Node.create({
    addAttributes() {
        return {
            tight: {
                default: (this.editor!.storage.markdown as MarkdownStorage).options.tightLists,
                parseHTML: element =>
                    element.getAttribute('data-tight') === 'true' || !element.querySelector('p'),
                renderHTML: attributes => ({
                    class: attributes.tight ? (this.editor!.storage.markdown as MarkdownStorage).options.tightListClass : null,
                    'data-tight': attributes.tight ? 'true' : null,
                }),
            },
        };
    },
    parseMarkdown({ toHTML }) {
        toHTML.use(remarkRehype, {
            handlers: {
                list(state, node) {
                    const element = remarkRehypeDefaultHandlers.list(state, node);

                    if((element.properties.className as string[])?.[0] === 'contains-task-list') {
                        element.properties.dataType = 'taskList';
                    }

                    return element;
                }
            },
        });
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


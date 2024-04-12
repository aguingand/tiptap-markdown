import { Node } from "@tiptap/core";
import remarkRehype from "remark-rehype";
import { ListItem } from "mdast";
import { defaultHandlers as remarkRehypeDefaultHandlers } from "mdast-util-to-hast";
import rehypeRemark from "rehype-remark";
import { defaultHandlers as rehypeRemarkDefaultHandlers } from "hast-util-to-mdast";


export const MarkdownListItem = Node.create({
    parseMarkdown({ toHTML }) {
        toHTML.use(remarkRehype, {
            handlers: {
                listItem(state, node: ListItem, parent) {
                    const element = remarkRehypeDefaultHandlers.listItem(state, node, parent);

                    if(typeof node.checked === 'boolean') {
                        element.properties.dataType = 'taskItem';
                        element.properties.dataChecked = node.checked ? 'true' : 'false';
                    }

                    return element;
                }
            },
        });
    },
    renderMarkdown({ toMarkdown }) {
        toMarkdown.use(rehypeRemark, {
            handlers: {
                li(state, element) {
                    const item = rehypeRemarkDefaultHandlers.li(state, {
                        ...element,
                        children: element.properties.dataType === 'taskItem'
                            ? element.children.slice(1) // remove checkbox input
                            : element.children,
                    });

                    if(element.properties.dataType === 'taskItem') {
                        item.checked = element.properties.dataChecked === 'true';
                    }

                    return item;
                },
            }
        });
    }
});

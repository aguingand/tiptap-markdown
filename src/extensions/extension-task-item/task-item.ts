import { Node } from "@tiptap/core";
import remarkRehype from "remark-rehype";
import { listItemRemarkRehypeHandlers } from "../extension-list-item/list-item";
import { ListItem } from "mdast";
import { gfmTaskListItemFromMarkdown } from "mdast-util-gfm-task-list-item";
import { gfmTaskListItem } from 'micromark-extension-gfm-task-list-item';

const TaskItem = Node.create({
    name: 'taskItem',
});

export default TaskItem.extend({
    parseMarkdown({ fromMarkdown, toHTML }) {
        (fromMarkdown.data().micromarkExtensions ??= []).push(gfmTaskListItem());
        (fromMarkdown.data().fromMarkdownExtensions ??= []).push(gfmTaskListItemFromMarkdown());

        toHTML.use(remarkRehype, {
            handlers: {
                listItem(state, node: ListItem, parent) {
                    const element = listItemRemarkRehypeHandlers.listItem(state, node, parent);

                    if(typeof node.checked === 'boolean') {
                        element.properties.dataType = 'taskItem';
                        element.properties.dataChecked = node.checked;
                    }

                    return element;
                }
            }
        });
    },
    renderMarkdown() {
        // handled by remark ?
    },
});

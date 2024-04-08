import { Node } from "@tiptap/core";
import remarkRehype from "remark-rehype";
import { gfmTaskListItemFromMarkdown } from "mdast-util-gfm-task-list-item";
import { gfmTaskListItem } from 'micromark-extension-gfm-task-list-item';
import { remarkRehypeListItemHandlers } from "../../remark-plugins/lists";

const TaskItem = Node.create({
    name: 'taskItem',
});

export default TaskItem.extend({
    parseMarkdown({ fromMarkdown, toHTML }) {
        (fromMarkdown.data().micromarkExtensions ??= []).push(gfmTaskListItem());
        (fromMarkdown.data().fromMarkdownExtensions ??= []).push(gfmTaskListItemFromMarkdown());

        toHTML.use(remarkRehype, {
            handlers: remarkRehypeListItemHandlers,
        });
    },
    renderMarkdown() {
        // handled by remark ?
    },
});

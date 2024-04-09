import { Node } from "@tiptap/core";
import remarkRehype from "remark-rehype";
import rehypeRemark from "rehype-remark";
import { gfmTaskListItemFromMarkdown, gfmTaskListItemToMarkdown } from "mdast-util-gfm-task-list-item";
import { gfmTaskListItem } from 'micromark-extension-gfm-task-list-item';
import { rehypeRemarkListItemHandlers, remarkRehypeListItemHandlers } from "../../remark-plugins/lists";

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
    renderMarkdown({ toMarkdown }) {
        (toMarkdown.data().toMarkdownExtensions ??= []).push(gfmTaskListItemToMarkdown());

        toMarkdown.use(rehypeRemark, {
            handlers: rehypeRemarkListItemHandlers,
        });
    },
});

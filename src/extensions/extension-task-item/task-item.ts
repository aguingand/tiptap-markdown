import { gfmTaskListItemFromMarkdown, gfmTaskListItemToMarkdown } from "mdast-util-gfm-task-list-item";
import { gfmTaskListItem } from 'micromark-extension-gfm-task-list-item';
import { MarkdownListItem } from "../markdown-list-item/markdown-list-item";

const TaskItem = MarkdownListItem.extend({
    name: 'taskItem',
});

export default TaskItem.extend({
    parseMarkdown({ fromMarkdown, toHTML }) {
        (fromMarkdown.data().micromarkExtensions ??= []).push(gfmTaskListItem());
        (fromMarkdown.data().fromMarkdownExtensions ??= []).push(gfmTaskListItemFromMarkdown());

        this.parent!({ fromMarkdown, toHTML });
    },
    renderMarkdown({ fromHTML, toMarkdown }) {
        (toMarkdown.data().toMarkdownExtensions ??= []).push(gfmTaskListItemToMarkdown());

        this.parent!({ fromHTML, toMarkdown });
    },
});

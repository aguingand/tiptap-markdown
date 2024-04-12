import { MarkdownList } from "../markdown-list/markdown-list";


const TaskList = MarkdownList.extend({
    name: 'taskList',
});

export default TaskList.extend({
    parseMarkdown({ fromMarkdown, toHTML }) {
        this.parent!({ fromMarkdown, toHTML });
    },
    renderMarkdown({ fromHTML, toMarkdown }) {
        this.parent!({ fromHTML, toMarkdown });
    },
});

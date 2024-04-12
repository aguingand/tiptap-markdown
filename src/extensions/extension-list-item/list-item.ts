import { MarkdownListItem } from "../markdown-list-item/markdown-list-item";

const ListItem = MarkdownListItem.extend({
    name: 'listItem',
});

export default ListItem.extend({
    parseMarkdown({ fromMarkdown, toHTML }) {
        this.parent!({ fromMarkdown, toHTML });
    },
    renderMarkdown({ fromHTML, toMarkdown }) {
        this.parent!({ fromHTML, toMarkdown });
    },
});

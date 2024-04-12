import { MarkdownList } from "../markdown-list/markdown-list";


const OrderedList = MarkdownList.extend({
    name: 'orderedList',
});

export default OrderedList.extend({
    parseMarkdown({ fromMarkdown, toHTML }) {
        this.parent!({ fromMarkdown, toHTML });
    },
    renderMarkdown({ fromHTML, toMarkdown }) {
        this.parent!({ fromHTML, toMarkdown });
    },
});

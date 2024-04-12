import remarkStringify from "remark-stringify";
import { MarkdownStorage } from "../../Markdown";
import { MarkdownList } from "../markdown-list/markdown-list";



const BulletList = MarkdownList.extend({
    name: 'bulletList',
});

export default BulletList.extend({
    parseMarkdown({ fromMarkdown, toHTML }) {
        this.parent!({ fromMarkdown, toHTML });
    },
    renderMarkdown({ fromHTML, toMarkdown }) {
        const bulletListMarker = (this.editor.storage.markdown as MarkdownStorage).options.bulletListMarker;
        this.parent!({ fromHTML, toMarkdown });
        toMarkdown.use(remarkStringify, {
            bullet: bulletListMarker,
            bulletOther: bulletListMarker === '-' ? '*' : '-',
        });
    },
});

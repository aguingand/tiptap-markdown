import { Node } from "@tiptap/core";
import type { Root as MarkdownRoot } from 'mdast';

const Document = Node.create({ name: 'doc' });

export default Document.extend({
    parseMarkdown() {
        // handled by remark
    },
    renderMarkdown() {
        // handled by remark
    },
});

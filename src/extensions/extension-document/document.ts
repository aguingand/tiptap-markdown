import { Node } from "@tiptap/core";
import type { Root as MarkdownRoot } from 'mdast';

const Document = Node.create({ name: 'doc' });

export default Document.extend({
    fromMarkdown() {
        // handled by remark
    },
    toMarkdown() {
        // handled by remark
    },
});

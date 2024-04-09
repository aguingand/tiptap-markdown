import { Node } from "@tiptap/core";
import type { Paragraph as MarkdownParagraph } from 'mdast';

const Paragraph = Node.create({
    name: 'paragraph',
});

export default Paragraph.extend({
    parseMarkdown() {
        // handled by remark
    },
    renderMarkdown() {
        // handled by remark
    },
});

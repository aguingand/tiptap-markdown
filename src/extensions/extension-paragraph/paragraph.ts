import { Node } from "@tiptap/core";
import type { Paragraph as MarkdownParagraph } from 'mdast';

const Paragraph = Node.create({
    name: 'paragraph',
});

export default Paragraph.extend({
    fromMarkdown() {
        // handled by remark
    },
    toMarkdown() {
        // handled by remark
    },
});

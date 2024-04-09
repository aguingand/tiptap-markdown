import { Node } from "@tiptap/core";
import type { Text as MarkdownText } from 'mdast';

const Text = Node.create({
    name: 'text',
});

export default Text.extend({
    parseMarkdown() {
        // handled by remark
    },
    renderMarkdown() {
        // handled by remark
    },
});

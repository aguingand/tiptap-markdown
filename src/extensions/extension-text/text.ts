import { Node } from "@tiptap/core";
import type { Text as MarkdownText } from 'mdast';

const Text = Node.create({
    name: 'text',
});

export default Text.extend({
    fromMarkdown() {
        // handled by remark
    },
    toMarkdown() {
        // handled by remark
    },
});

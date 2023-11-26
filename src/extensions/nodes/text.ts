import { Node } from "@tiptap/core";
import type { Text as MarkdownText } from 'mdast';

const Text = Node.create({
    name: 'text',
});

export default Text.extend({
    parseMarkdown: {
        match: node => node.type === 'text',
        handle(state, node: MarkdownText) {
            state.addText(node.value)
        },
    },
    toMarkdown(state, node) {
        state.addNode('text', undefined, node.text)
    }
});

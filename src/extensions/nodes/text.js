import { Node } from "@tiptap/core";
import { MarkdownNode } from "../../util/extensions";
import { escapeHTML } from "../../util/dom";


const Text = Node.create({
    name: 'text',
});

export default MarkdownNode.create(Text, {
    serialize(state, node) {
        state.text(escapeHTML(node.text));
    },
    parse: {
        // handled by markdown-it
    },
});

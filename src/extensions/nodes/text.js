import { Node } from "@tiptap/core";
import { createMarkdownExtension } from "../../util/extensions";
import { escapeHTML } from "../../util/dom";


const Text = Node.create({
    name: 'text',
});

export default createMarkdownExtension(Text, {
    serialize(state, node) {
        state.text(escapeHTML(node.text));
    },
    parse: {
        // handled by markdown-it
    },
});

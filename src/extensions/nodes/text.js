import { Node } from "@tiptap/core";
import { LazyNode } from "../../util/extensions";
import { escapeHTML } from "../../util/dom";


const Text = Node.create({
    name: 'text',
});

export default Text.extend({
    addStorage() {
        return {
            markdown: {
                serialize(state, node) {
                    state.text(escapeHTML(node.text));
                },
                parse: {
                    // handled by markdown-it
                },
            }
        }
    }
});

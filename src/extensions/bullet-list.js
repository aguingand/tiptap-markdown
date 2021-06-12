import { Node } from "@tiptap/core";
import { createMarkdownExtension } from "../util/extensions";

const BulletList = Node.create({
    name: 'bulletList',
});

export default createMarkdownExtension(BulletList, {
    serialize(state, node)  {
        const marker = null; // todo
        return state.renderList(node, "  ", () => (marker || "*") + " ");
    },
    parse: {
        // handled by markdown-it
    },
});

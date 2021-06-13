import { Node } from "@tiptap/core";
import { createMarkdownExtension } from "../../util/extensions";

const BulletList = Node.create({
    name: 'bulletList',
});

export default createMarkdownExtension(BulletList, {
    serialize(state, node)  {
        return state.renderList(node, "  ", () => (this.markdownOptions.bulletListMarker || "*") + " ");
    },
    parse: {
        // handled by markdown-it
    },
});

import { Node } from "@tiptap/core";
import { MarkdownNode } from "../../util/extensions";

const BulletList = Node.create({
    name: 'bulletList',
});

export default MarkdownNode.create(BulletList, {
    serialize(state, node)  {
        return state.renderList(node, "  ", () => (this.editor.storage.markdown.options.bulletListMarker || "-") + " ");
    },
    parse: {
        // handled by markdown-it
    },
});

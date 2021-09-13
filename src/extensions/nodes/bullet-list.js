import { Node } from "@tiptap/core";
import { createMarkdownExtension } from "../../util/extensions";
import { getTightListExtension } from "../tiptap/tight-lists";

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
    updateExtension(BulletList) {
        return BulletList.extend(
            getTightListExtension({ editor:this.editor })
        );
    },
});

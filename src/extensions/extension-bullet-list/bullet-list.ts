import { Node } from "@tiptap/core";
import remarkStringify from "remark-stringify";


const BulletList = Node.create({
    name: 'bulletList',
});

export default BulletList.extend({
    fromMarkdown() {
        // handled by remark
    },
    toMarkdown({ remark }) {
        this.editor
        remark
            .use(remarkStringify, {
                bullet: this.editor.storage.markdown.options.bulletListMarker ?? '-',
            });
    },
});

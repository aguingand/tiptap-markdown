import { Node } from "@tiptap/core";
import remarkStringify from "remark-stringify";
import remarkRehype from "remark-rehype";
import { remarkRehypeListHandlers } from "../../remark-plugins/lists";


const BulletList = Node.create({
    name: 'bulletList',
});

export default BulletList.extend({
    parseMarkdown({ toHTML }) {
        toHTML.use(remarkRehype, {
            handlers: remarkRehypeListHandlers,
        });
    },
    renderMarkdown({ toMarkdown }) {
        toMarkdown
            .use(remarkStringify, {
                bullet: this.editor.storage.markdown.options.bulletListMarker ?? '-',
            });
    },
});

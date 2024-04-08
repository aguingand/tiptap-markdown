import { Node } from "@tiptap/core";
import remarkStringify from "remark-stringify";
import { defaultHandlers as remarkRehypeDefaultHandlers } from "mdast-util-to-hast";
import { List } from 'mdast';
import remarkRehype from "remark-rehype";

export const bulletListRemarkRehypeHandlers: Pick<typeof remarkRehypeDefaultHandlers, 'list'> = {
    list(state, node: List) {
        return remarkRehypeDefaultHandlers.list(state, node);
    }
}

const BulletList = Node.create({
    name: 'bulletList',
});

export default BulletList.extend({
    parseMarkdown({ toHTML }) {

    },
    renderMarkdown({ toMarkdown }) {
        toMarkdown
            .use(remarkStringify, {
                bullet: this.editor.storage.markdown.options.bulletListMarker ?? '-',
            });
    },
});

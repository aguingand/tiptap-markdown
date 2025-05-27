import { Node } from "@tiptap/core";
import remarkStringify from "remark-stringify";
import remarkRehype from "remark-rehype";
import rehypeRemark from "rehype-remark";
import { rehypeRemarkBulletListHandlers, remarkRehypeListHandlers } from "../../remark-plugins/lists";
import { MarkdownStorage } from "../../Markdown";


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
        const bulletListMarker = (this.editor.storage.markdown as MarkdownStorage).options.bulletListMarker;
        toMarkdown
            .use(rehypeRemark, {
                handlers: rehypeRemarkBulletListHandlers,
            })
            .use(remarkStringify, {
                bullet: bulletListMarker,
                bulletOther: bulletListMarker === '-' ? '*' : '-',
            });
    },
});

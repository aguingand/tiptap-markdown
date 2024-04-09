import { Node } from "@tiptap/core";
import remarkStringify from "remark-stringify";
import remarkRehype from "remark-rehype";
import rehypeRemark from "rehype-remark";
import { rehypeRemarkBulletListHandlers, remarkRehypeListHandlers } from "../../remark-plugins/lists";
import { MarkdownOptions } from "../../../index";



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
        const bulletListMarker = (this.editor.storage.markdown.options as MarkdownOptions).bulletListMarker;
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

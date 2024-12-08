import { Mark } from '@tiptap/core';
import { gfmAutolinkLiteral } from 'micromark-extension-gfm-autolink-literal';
import { gfmAutolinkLiteralFromMarkdown } from 'mdast-util-gfm-autolink-literal';
import { MarkdownStorage } from "../../Markdown";

const Link = Mark.create({
    name: 'link',
});

export default Link.extend({
    parseMarkdown({ fromMarkdown }) {
        if((this.editor.storage.markdown as MarkdownStorage).options.linkify) {
            (fromMarkdown.data().fromMarkdownExtensions ??= []).push(gfmAutolinkLiteralFromMarkdown());
            (fromMarkdown.data().micromarkExtensions ??= []).push(gfmAutolinkLiteral());
        }
    },
    renderMarkdown() {
        // handled by remark
    },
})

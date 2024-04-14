import { gfmAutolinkLiteral } from 'micromark-extension-gfm-autolink-literal';
import { gfmAutolinkLiteralFromMarkdown } from 'mdast-util-gfm-autolink-literal';
import type { Link } from '@tiptap/extension-link';
import { MarkMixin } from "../types";

export const link: MarkMixin<typeof Link> = (Link) => (
    Link.extend({
        parseMarkdown({ fromMarkdown }) {
            if(this.storage.markdown.options.linkify) {
                (fromMarkdown.data().fromMarkdownExtensions ??= []).push(gfmAutolinkLiteralFromMarkdown());
                (fromMarkdown.data().micromarkExtensions ??= []).push(gfmAutolinkLiteral());
            }
        },
        renderMarkdown() {
            // handled by remark
        },
    })
);

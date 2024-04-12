import remarkStringify from "remark-stringify";
import { MarkdownList } from "../markdown-list/markdown-list";
import type { BulletList as TiptapBulletList, BulletListOptions } from '@tiptap/extension-bullet-list';
import { WithMarkdownStorage } from "../../types";


export default function bulletList(BulletList: typeof TiptapBulletList) {
    return BulletList
        .extend(MarkdownList.config)
        .extend<BulletListOptions, WithMarkdownStorage>({
            parseMarkdown({ fromMarkdown, toHTML }) {
                this.parent!({ fromMarkdown, toHTML });
            },
            renderMarkdown({ fromHTML, toMarkdown }) {
                const bulletListMarker = this.storage.markdown.options.bulletListMarker;
                toMarkdown.use(remarkStringify, {
                    bullet: bulletListMarker,
                    bulletOther: bulletListMarker === '-' ? '*' : '-',
                });

                this.parent!({ fromHTML, toMarkdown });
            },
        })
}

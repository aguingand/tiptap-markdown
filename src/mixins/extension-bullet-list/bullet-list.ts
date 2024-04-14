import remarkStringify from "remark-stringify";
import { MarkdownList } from "../../extensions/markdown-list/markdown-list";
import type { BulletList, BulletListOptions } from '@tiptap/extension-bullet-list';
import { WithMarkdownStorage } from "../../types";
import { NodeMixin } from "../../types";


export const bulletList: NodeMixin<typeof BulletList> = (BulletList) => (
    BulletList
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
);

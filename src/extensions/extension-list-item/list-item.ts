import { NodeMixin } from "../load-mixins/types";
import { MarkdownListItem } from "../markdown-list-item/markdown-list-item";
import type { ListItem } from "@tiptap/extension-list-item";

export const listItem: NodeMixin<typeof ListItem> = (ListItem) => (
    ListItem
        .extend(MarkdownListItem.config)
        .extend({
            parseMarkdown({ fromMarkdown, toHTML }) {
                this.parent!({ fromMarkdown, toHTML });
            },
            renderMarkdown({ fromHTML, toMarkdown }) {
                this.parent!({ fromHTML, toMarkdown });
            },
        })
);

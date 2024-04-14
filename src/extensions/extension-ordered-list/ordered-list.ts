import { MarkdownList } from "../markdown-list/markdown-list";
import type { OrderedList } from "@tiptap/extension-ordered-list";
import { NodeMixin } from "../load-mixins/types";

export const orderedList: NodeMixin<typeof OrderedList> = (OrderedList) => (
    OrderedList.extend(MarkdownList.config)
);

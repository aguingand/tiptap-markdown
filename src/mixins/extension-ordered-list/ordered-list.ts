import { MarkdownList } from "../../extensions/markdown-list/markdown-list";
import type { OrderedList } from "@tiptap/extension-ordered-list";
import { NodeMixin } from "../../types";

export const orderedList: NodeMixin<typeof OrderedList> = (OrderedList) => (
    OrderedList.extend(MarkdownList.config)
);

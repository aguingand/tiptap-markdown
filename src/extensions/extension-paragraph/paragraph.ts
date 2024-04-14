import type { Paragraph } from "@tiptap/extension-paragraph";
import { NodeMixin } from "../load-mixins/types";

export const paragraph: NodeMixin<typeof Paragraph> = (Paragraph) => (
    Paragraph.extend({
        parseMarkdown() {
            // handled by remark
        },
        renderMarkdown() {
            // handled by remark
        },
    })
);

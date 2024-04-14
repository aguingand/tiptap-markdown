import type Code from '@tiptap/extension-code';
import { MarkMixin } from "../../types";

export const code: MarkMixin<typeof Code> = (Code) => (
    Code.extend({
        parseMarkdown() {
            // handled by remark
        },
        renderMarkdown() {
            // handled by remark
        },
    })
);

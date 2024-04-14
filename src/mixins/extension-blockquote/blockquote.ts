import { NodeMixin } from "../../extensions/load-mixins/types";
import type Blockquote from '@tiptap/extension-blockquote';


export const blockquote: NodeMixin<typeof Blockquote> = (Blockquote) => (
    Blockquote.extend({
        parseMarkdown() {
            // handled by remark
        },
        renderMarkdown() {
            // handled by remark
        },
    })
);

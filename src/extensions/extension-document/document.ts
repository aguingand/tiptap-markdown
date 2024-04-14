import { NodeMixin } from "../load-mixins/types";
import type { Document } from '@tiptap/extension-document';


export const doc: NodeMixin<typeof Document> = (Document) => (
    Document.extend({
        parseMarkdown() {
            // handled by remark
        },
        renderMarkdown() {
            // handled by remark
        },
    })
);

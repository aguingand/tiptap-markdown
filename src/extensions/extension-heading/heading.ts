import { NodeMixin } from "../load-mixins/types";
import type { Heading } from '@tiptap/extension-heading';


export const heading: NodeMixin<typeof Heading> = (Heading) => (
    Heading.extend({
        parseMarkdown() {
            // handled by remark
        },
        renderMarkdown() {
            // handled by remark
        },
    })
);

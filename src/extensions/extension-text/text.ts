import { Node } from "@tiptap/core";
import type { Text } from "@tiptap/extension-text";
import { NodeMixin } from "../load-mixins/types";

export const text: NodeMixin<typeof Text> = (Text) => (
    Text.extend({
        parseMarkdown() {
            // handled by remark
        },
        renderMarkdown() {
            // handled by remark
        },
    })
);

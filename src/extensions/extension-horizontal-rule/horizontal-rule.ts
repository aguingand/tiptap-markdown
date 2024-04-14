import remarkStringify from "remark-stringify";
import { NodeMixin } from "../load-mixins/types";
import type { HorizontalRule } from "@tiptap/extension-horizontal-rule";


export const horizontalRule: NodeMixin<typeof HorizontalRule> = (HorizontalRule) => (
    HorizontalRule.extend({
        parseMarkdown() {
            // handled by remark
        },
        renderMarkdown({ toMarkdown }) {
            toMarkdown.use(remarkStringify, {
                rule: this.storage.markdown.options.horizontalRuleMarker,
            });
        },
    })
);

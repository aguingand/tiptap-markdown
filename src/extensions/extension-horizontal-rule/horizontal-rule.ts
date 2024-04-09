import { Node } from "@tiptap/core";
import remarkStringify, { Options } from "remark-stringify";
import { MarkdownOptions } from "../../../index";


const HorizontalRule = Node.create({
    name: 'horizontalRule',
});

export default HorizontalRule.extend({
    parseMarkdown() {
        // handled by remark
    },
    renderMarkdown({ toMarkdown }) {
        toMarkdown.use(remarkStringify, {
            rule: (this.editor.storage.markdown.options as MarkdownOptions).horizontalRuleMarker,
        });
    },
});

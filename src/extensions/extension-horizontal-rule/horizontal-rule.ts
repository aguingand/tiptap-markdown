import { Node } from "@tiptap/core";
import remarkStringify from "remark-stringify";
import { MarkdownStorage } from "../../Markdown";


const HorizontalRule = Node.create({
    name: 'horizontalRule',
});

export default HorizontalRule.extend({
    parseMarkdown() {
        // handled by remark
    },
    renderMarkdown({ toMarkdown }) {
        toMarkdown.use(remarkStringify, {
            rule: (this.editor.storage.markdown as MarkdownStorage).options.horizontalRuleMarker,
        });
    },
});

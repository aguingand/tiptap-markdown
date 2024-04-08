import { Node } from "@tiptap/core";
import { MarkdownOptions } from "../../../index";
import remarkBreaks from "remark-breaks";

const HardBreak = Node.create({
    name: 'hardBreak',
});

export default HardBreak.extend({
    parseMarkdown({ fromMarkdown }) {
       if((this.editor.storage.markdown.options as MarkdownOptions).breaks) {
           fromMarkdown.use(remarkBreaks);
       }
    },
    renderMarkdown() {
        // handled by remark
    },
});

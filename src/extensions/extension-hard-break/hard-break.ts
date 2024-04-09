import { Node } from "@tiptap/core";
import { MarkdownOptions } from "../../../index";
import remarkBreaks from "remark-breaks";
import { defaultHandlers as rehypeRemarkDefaultHandlers } from "hast-util-to-mdast";
import rehypeRemark from "rehype-remark";

const HardBreak = Node.create({
    name: 'hardBreak',
});

export const rehypeRemarkHardBreakHandlers: Pick<typeof rehypeRemarkDefaultHandlers, 'br'> = {
    br: rehypeRemarkDefaultHandlers.br,
};

export default HardBreak.extend({
    parseMarkdown({ fromMarkdown }) {
       if((this.editor.storage.markdown.options as MarkdownOptions).breaks) {
           fromMarkdown.use(remarkBreaks);
       }
    },
    renderMarkdown({ toMarkdown }) {
        toMarkdown.use(rehypeRemark, {
            handlers: rehypeRemarkHardBreakHandlers,
        });
    },
});

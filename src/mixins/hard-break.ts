import remarkBreaks from "remark-breaks";
import { defaultHandlers as rehypeRemarkDefaultHandlers } from "hast-util-to-mdast";
import rehypeRemark from "rehype-remark";
import { NodeMixin } from "../types";
import type { HardBreak } from "@tiptap/extension-hard-break";


export const rehypeRemarkHardBreakHandlers: Pick<typeof rehypeRemarkDefaultHandlers, 'br'> = {
    br: rehypeRemarkDefaultHandlers.br,
};

export const hardBreak: NodeMixin<typeof HardBreak> = (HardBreak) => (
    HardBreak.extend({
        parseMarkdown({ fromMarkdown }) {
            if(this.storage.markdown.options.breaks) {
                fromMarkdown.use(remarkBreaks);
            }
        },
        renderMarkdown({ toMarkdown }) {
            toMarkdown.use(rehypeRemark, {
                handlers: rehypeRemarkHardBreakHandlers,
            });
        },
    })
);

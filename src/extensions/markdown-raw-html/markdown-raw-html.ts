import { Extension } from "@tiptap/core";
import { MarkdownOptions } from "../../../index";
import rehypeRaw from "rehype-raw";
import remarkRehype from "remark-rehype";


export const MarkdownRawHTML = Extension.create({
    name: 'markdownRawHTML',
    parseMarkdown({ toHTML }) {
        // always keep html, and as text if not enabled
        toHTML.use(remarkRehype, { allowDangerousHtml: true });
        if((this.editor.storage.markdown.options as MarkdownOptions).html) {
            toHTML.use(rehypeRaw);
        }
    }
});

import { Extension } from "@tiptap/core";
import { MarkdownOptions, MarkdownStorage } from "../../Markdown";
import rehypeRaw from "rehype-raw";
import remarkRehype from "remark-rehype";


export const MarkdownRawHTML = Extension.create({
    name: 'markdownRawHTML',
    parseMarkdown({ toHTML }) {
        // always keep html, and as text if not enabled
        toHTML.use(remarkRehype, { allowDangerousHtml: true });
        if((this.editor.storage.markdown as MarkdownStorage).options.html) {
            toHTML.use(rehypeRaw);
        }
    }
});

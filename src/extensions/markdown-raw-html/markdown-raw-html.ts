import { Extension } from "@tiptap/core";
import rehypeRaw from "rehype-raw";
import remarkRehype from "remark-rehype";
import { MarkdownStorage } from "../../Markdown";

export const MarkdownRawHTML = Extension.create({
    name: 'markdownRawHTML',
    parseMarkdown({ toHTML }) {
        if((this.editor.storage.markdown as MarkdownStorage).options.html) {
            toHTML.use(remarkRehype, { allowDangerousHtml: true });
            toHTML.use(rehypeRaw);
        }
    }
});

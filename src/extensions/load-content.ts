import { Extension } from "@tiptap/core";
import { MarkdownStorage } from "../Markdown";


export const LoadContent = Extension.create({
    name: 'loadContent',
    onBeforeCreate() {
        (this.editor.storage.markdown as MarkdownStorage).initialContent = this.editor.options.content;
        if (this.editor.options.content) {
            this.editor.options.content = (this.editor.storage.markdown as MarkdownStorage)
                .parser
                .parse(this.editor.options.content);
        }
    },
    onCreate() {
        this.editor.options.content = (this.editor.storage.markdown as MarkdownStorage).initialContent!;
        delete this.editor.storage.markdown.initialContent;
    },
});

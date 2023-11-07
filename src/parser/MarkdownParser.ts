import { Content, Editor } from "@tiptap/core";
import { unified } from "unified";
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { ParserState } from "./ParserState";

export class MarkdownParser {
    editor: Editor;

    constructor(editor: Editor, { html, linkify, breaks }) {
        this.editor = editor;
    }

    async parse(content: Content) {
        if(typeof content === 'string') {
            const remark = unified().use(remarkParse).use(remarkStringify);
            const state = new ParserState(this.editor.schema);
            state.run(remark, content);
            return state.toDoc();
        }

        return content;
    }
}

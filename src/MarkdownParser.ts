import { Content, Editor } from "@tiptap/core";
import { unified } from "unified";
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { State } from "./transformer/parser/state";
import {remarkMarker} from "./remark-plugins/remark-marker-plugin";

type ParserOptions = {
    html: boolean,
    linkify: boolean,
    breaks: boolean,
}

export class MarkdownParser {
    editor: Editor;
    options: ParserOptions;

    constructor(editor: Editor, options: ParserOptions) {
        this.editor = editor;
        this.options = options;
    }

    parse(content: Content): Content {
        if(typeof content === 'string') {
            // todo handle options
            const remark = unified()
                .use(remarkParse)
                .use(remarkStringify)
                .use(remarkMarker)
            const state = new State(this.editor);
            const parsed = state.run(remark, content).toDoc().toJSON();
            return parsed;
        }

        return content;
    }
}

import { createEditor, TestEditorOptions } from "./editor.js";
import { getHTMLFromFragment, createNodeFromContent } from "@tiptap/core";
import { Fragment } from "@tiptap/pm/model";
import { MarkdownStorage } from "../../index";

export function parse(content: string, options: TestEditorOptions = {}, asHTML = false) {
    const editor = createEditor(options);
    const parsed = (editor.storage.markdown as MarkdownStorage).parser.parse(content);
    const fragment = createNodeFromContent(parsed, editor.schema, {
        slice: true,
    }) as Fragment;

    if(asHTML) {
        return getHTMLFromFragment(fragment, editor.schema);
    }

    return fragment.toJSON();
}

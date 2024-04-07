import { createEditor, TestEditorOptions } from "./editor.js";
import { DOMParser } from "prosemirror-model";
import { elementFromString } from "../../src/util/dom";
import { getHTMLFromFragment } from "@tiptap/core";

export function parse(content: string, options: TestEditorOptions & { inline?: true } = {}, asHTML = false) {
    const editor = createEditor(options);
    const parsed = editor.storage.markdown.parser.parse(content, { inline: options.inline });
    const fragment = DOMParser.fromSchema(editor.schema)
        .parseSlice(elementFromString(parsed), {
            preserveWhitespace: options.inline ? 'full' : false,
        })
        .content;

    if(asHTML) {
        return getHTMLFromFragment(fragment, editor.schema);
    }

    return fragment.toJSON();
}

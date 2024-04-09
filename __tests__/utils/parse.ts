import { createEditor, TestEditorOptions } from "./editor.js";
import { getHTMLFromFragment, createNodeFromContent } from "@tiptap/core";
import { Fragment } from "@tiptap/pm/model";

export function parse(content: string, options: TestEditorOptions & { inline?: true } = {}, asHTML = false) {
    const editor = createEditor(options);
    const parsed = editor.storage.markdown.parser.parse(content, { inline: options.inline });
    const fragment = createNodeFromContent(parsed, editor.schema, {
        slice: true,
        parseOptions: {
            preserveWhitespace: options.inline ? 'full' : false,
        }
    }) as Fragment;

    if(asHTML) {
        return getHTMLFromFragment(fragment, editor.schema);
    }

    return fragment.toJSON();
}

import { createEditor } from "./editor";
import { DOMParser } from "prosemirror-model";
import { elementFromString } from "../../src/util/dom";
import { getHTMLFromFragment } from "@tiptap/core";

export function parse(content, options = {}, asHTML = false) {
    const {
        inline,
        image,
        codeBlock,
        htmlNode,
        ...markdownOptions
    } = options;

    const editor = createEditor({
        image,
        htmlNode,
        codeBlock,
        markdownOptions,
    });

    const parsed = editor.storage.markdown.parser.parse(content, { inline });

    return parsed.content;
    // const fragment = DOMParser.fromSchema(editor.schema)
    //     .parseSlice(elementFromString(parsed), {
    //         preserveWhitespace: inline ? 'full' : false,
    //     })
    //     .content;
    //
    // if(asHTML) {
    //     return getHTMLFromFragment(fragment, editor.schema);
    // }
    //
    // return fragment.toJSON();
}

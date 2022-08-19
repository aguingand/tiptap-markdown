import { createEditor } from "./index";
import { parse as baseParse } from "../../src";
import { DOMParser } from "prosemirror-model";
import { elementFromString } from "../../src/util/dom";

export function parse(content, options = {}) {
    const {
        html = true,
        linkify,
        breaks,
        inline,
        image,
        codeBlock,
        htmlNode,
    } = options;

    const editor = createEditor({
        image,
        htmlNode,
        codeBlock,
        markdown: {
            html,
        },
    });

    const parsed = baseParse(editor.schema, content, {
        extensions: editor.markdownExtensions,
        html,
        linkify,
        breaks,
        inline,
    });

    return DOMParser.fromSchema(editor.schema)
        .parseSlice(elementFromString(parsed), {
            preserveWhitespace: inline ? 'full' : false,
        })
        .content.toJSON();
}

import { createEditor } from "./index";
import { parse as baseParse } from "../../src";
import extensions from "../../src/extensions";
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
    });

    const parsed = baseParse(editor.schema, content, {
        extensions,
        html,
        linkify,
        breaks,
        languageClassPrefix: codeBlock?.languageClassPrefix,
        inline,
    });

    return DOMParser.fromSchema(editor.schema)
        .parseSlice(elementFromString(parsed), {
            preserveWhitespace: inline ? 'full' : false,
        })
        .content.toJSON();
}

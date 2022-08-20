import { createEditor } from "./editor";
import { DOMParser } from "prosemirror-model";
import { elementFromString } from "../../src/util/dom";

export function parse(content, options = {}) {
    const {
        inline,
        image,
        codeBlock,
        htmlNode,
        ...markdown
    } = options;

    const editor = createEditor({
        image,
        htmlNode,
        codeBlock,
        markdown,
    });

    const parsed = editor.markdownParser.parse(content, { inline });

    return DOMParser.fromSchema(editor.schema)
        .parseSlice(elementFromString(parsed), {
            preserveWhitespace: inline ? 'full' : false,
        })
        .content.toJSON();
}

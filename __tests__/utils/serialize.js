import { DOMParser } from "prosemirror-model";
import { createEditor } from "./editor";
import { elementFromString } from "../../src/util/dom";

export function serialize(content, { htmlNode, htmlMark, ...options } = {}) {
    const editor = createEditor({
        htmlNode,
        htmlMark,
        markdown: options,
    });
    const doc = DOMParser.fromSchema(editor.schema)
        .parse(elementFromString(content));

    return editor.markdownSerializer.serialize(doc);
}

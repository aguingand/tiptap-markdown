import { DOMParser } from "prosemirror-model";
import { createEditor } from "./editor";
import { elementFromString } from "../../src/util/dom";

export function serialize(content, { htmlNode, htmlMark, ...markdownOptions } = {}) {
    const editor = createEditor({
        htmlNode,
        htmlMark,
        markdownOptions,
    });
    const doc = DOMParser.fromSchema(editor.schema)
        .parse(elementFromString(content));

    return editor.storage.markdown.options.serializer.serialize(doc);
}

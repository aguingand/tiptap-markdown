import { DOMParser } from "prosemirror-model";
import { createEditor, TestEditorOptions } from "./editor";
import { elementFromString } from "../../src/util/dom";

export function serialize(content: string, options: TestEditorOptions = {}) {
    const editor = createEditor(options);
    const doc = DOMParser.fromSchema(editor.schema)
        .parse(elementFromString(content), {
            preserveWhitespace: true, // to ensure whitespaces handling
        });

    return editor.storage.markdown.serializer.serialize(doc);
}

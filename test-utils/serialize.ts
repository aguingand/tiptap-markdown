import { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { Content, getHTMLFromFragment, createNodeFromContent } from "@tiptap/core";
import { createEditor, TestEditorOptions } from "./editor";

export function serialize(content: Content, options: TestEditorOptions = {}) {
    const editor = createEditor(options);
    const doc = createNodeFromContent(content, editor.schema, {
        parseOptions: {
            preserveWhitespace: true,
        }
    }) as ProseMirrorNode;
    const html = getHTMLFromFragment(doc.content, editor.schema);

    return editor.storage.markdown.serializer.serialize(html);
}

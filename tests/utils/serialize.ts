import { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { Content, getHTMLFromFragment, createNodeFromContent } from "@tiptap/core";
import { createEditor, TestEditorOptions } from "./editor";
import { MarkdownStorage } from "../../src/Markdown";

export function serialize(content: Content, options: TestEditorOptions = {}) {
    const editor = createEditor(options);
    const doc = createNodeFromContent(content, editor.schema, {
        parseOptions: {
            preserveWhitespace: true,
        }
    }) as ProseMirrorNode;

    return (editor.storage.markdown as MarkdownStorage).serializer.serialize(doc);
}

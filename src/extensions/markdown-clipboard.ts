import { elementFromString, Extension } from "@tiptap/core";
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { DOMParser } from '@tiptap/pm/model';
import { MarkdownStorage } from "../Markdown";

export const MarkdownClipboard = Extension.create({
    name: 'markdownClipboard',
    addProseMirrorPlugins: function() {
        return [
            new Plugin({
                key: new PluginKey('markdownClipboard'),
                props: {
                    clipboardTextParser: (text, context, plainText, view) => {
                        if(plainText || !(this.editor.storage.markdown as MarkdownStorage).options.transformPastedText) {
                            return null as any; // pasting with shift key prevents formatting
                        }
                        const html = (this.editor.storage.markdown as MarkdownStorage).parser.parse(text);

                        return DOMParser.fromSchema(this.editor.schema)
                            .parseSlice(elementFromString(html), {
                                preserveWhitespace: true,
                                context,
                            });
                    },
                    clipboardTextSerializer: (slice) => {
                        if(!(this.editor.storage.markdown as MarkdownStorage).options.transformPastedText) {
                            return '';
                        }
                        return (this.editor.storage.markdown as MarkdownStorage).serializer.serialize(slice.content);
                    },
                },
            })
        ]
    }
})

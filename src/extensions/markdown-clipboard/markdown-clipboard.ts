import { createNodeFromContent, Extension, getHTMLFromFragment } from "@tiptap/core";
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { MarkdownStorage } from "../../Markdown";

export const MarkdownClipboard = Extension.create({
    name: 'markdownClipboard',
    addOptions() {
        return {
            transformPastedText: false,
            transformCopiedText: false,
        }
    },
    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('markdownClipboard'),
                props: {
                    // @ts-ignore
                    clipboardTextParser: (text, context, plainText) => {
                        if(plainText || !this.options.transformPastedText) {
                            return null; // pasting with shift key prevents formatting
                        }
                        const parsed = (this.editor.storage.markdown as MarkdownStorage).parser.parse(text);
                        return createNodeFromContent(parsed, this.editor.schema, {
                            parseOptions: {
                                preserveWhitespace: true,
                                context,
                            }
                        });
                    },
                    clipboardTextSerializer: (slice) => {
                        if(!this.options.transformCopiedText) {
                            return '';
                        }
                        return (this.editor.storage.markdown as MarkdownStorage).serializer.serialize(
                            getHTMLFromFragment(slice.content, this.editor.schema)
                        );
                    },
                },
            })
        ]
    }
})

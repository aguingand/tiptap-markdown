import { Extension } from '@tiptap/core';
import { MarkdownTightLists } from "./extensions/tiptap/tight-lists";
import { MarkdownSerializer } from "./serialize/MarkdownSerializer";
import { MarkdownParser } from "./parse/MarkdownParser";
import { extensions } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

export const Markdown = Extension.create({
    name: 'markdown',
    priority: 50,
    addOptions() {
        return {
            content: null,
            html: true,
            tightLists: true,
            tightListClass: 'tight',
            bulletListMarker: '-',
            linkify: false,
            breaks: false,
        }
    },
    addCommands() {
        const commands = extensions.Commands.config.addCommands();
        return {
            setContent: (content, emitUpdate, parseOptions) => (props) => {
                return commands.setContent(
                    props.editor.storage.markdown.parser.parse(content),
                    emitUpdate,
                    parseOptions
                )(props);
            },
            insertContentAt: (range, content, options) => (props) => {
                return commands.insertContentAt(
                    range,
                    props.editor.storage.markdown.parser.parse(content, { inline: true }),
                    options
                )(props);
            },
        }
    },
    onBeforeCreate() {
        this.editor.storage.markdown = {
            options: { ...this.options },
            parser: new MarkdownParser(this.editor),
            serializer: new MarkdownSerializer(this.editor),
            getMarkdown: () => {
                return this.editor.storage.markdown.serializer.serialize(this.editor.state.doc);
            },
        }
        this.editor.options.initialContent = this.editor.options.content;
        this.editor.options.content = this.editor.storage.markdown.parser.parse(this.editor.options.content);
    },
    onCreate() {
        this.editor.options.content = this.editor.options.initialContent;
        delete this.editor.options.initialContent;
    },
    addStorage() {
        return {
            /// storage will be defined in onBeforeCreate() to prevent initial object overriding
        }
    },
    addExtensions() {
        return [
            MarkdownTightLists.configure({
                tight: this.options.tightLists,
                tightClass: this.options.tightListClass,
            }),
        ]
    },
    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('markdown-paste'),
                props: {
                    handlePaste: (view, event) => {
                        if (view.props.editable && !view.props.editable(view.state)) {
                            return false;
                        }
                        if (!event.clipboardData) return false;

                        const text = event.clipboardData.getData('text/plain');
                        const html = event.clipboardData.getData('text/html');
                        if (text.length === 0 || html.length !== 0) return false;

                        if (this.editor.getText()) {
                            this.editor.commands.insertContentAt(view.state.selection, text, { updateSelection: true });
                        } else {
                            this.editor.commands.setContent(text, true);
                        }

                        return true;
                    },
                },
            }),
        ];
    }
});

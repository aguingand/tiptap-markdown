import { Extension } from '@tiptap/core';
import { MarkdownTightLists } from "./extensions/tiptap/tight-lists";
import { MarkdownSerializer } from "./serialize/MarkdownSerializer";
import { MarkdownParser } from "./parse/MarkdownParser";
import { extensions } from '@tiptap/core';

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
    addStorage() {
        return {
            options: this.options,
            getMarkdown() {
                return this.options.serializer.serialize(this.editor.state.doc);
            }
        }
    },
    addCommands() {
        const commands = extensions.Commands.config.@addCommands();
        return {
            setContent: (content, emitUpdate, parseOptions) => (props) => {
                return commands.setContent(this.options.parser.parse(content), emitUpdate, parseOptions)(props);
            },
            insertContentAt: (range, content, options) => (props) => {
                return commands.insertContentAt(range, this.options.parser.parse(content, { inline: true }), options)(props);
            },
        }
    },
    onBeforeCreate() {
        this.options.parser ??= new MarkdownParser(this.editor);
        this.options.serializer ??= new MarkdownSerializer(this.editor);
        this.storage.getMarkdown = this.storage.getMarkdown.bind(this);
        this.editor.options.initialContent = this.editor.options.content;
        this.editor.options.content = this.options.parser.parse(this.editor.options.content);
    },
    onCreate() {
        this.editor.options.content = this.editor.options.initialContent;
        delete this.editor.options.initialContent;
    },
    addExtensions() {
        return [
            MarkdownTightLists.configure({
                tight: this.options.tightLists,
                tightClass: this.options.tightListClass,
            }),
        ]
    }
});

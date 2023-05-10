import { Extension } from '@tiptap/core';
import {MarkdownTightLists} from "./extensions/tiptap/tight-lists";
import {MarkdownSerializer} from "./serialize/MarkdownSerializer";
import {MarkdownParser} from "./parse/MarkdownParser";
import defaultExtensions from "./extensions";

export const Markdown = Extension.create({
    name: 'markdown',
    addOptions: () => ({
        html: true,
        tightLists: true,
        tightListClass: 'tight',
        bulletListMarker: '-',
        linkify: false,
        breaks: false,
        parser: null,
        serializer: null,
        extensions: [],
    }),
    addStorage() {
        return {
            options: this.options,
            getContent: () => {},
            getExtensions: () => {},
        }
    },
    onCreate() {
        this.options.serializer ??= new MarkdownSerializer(this.editor);
        this.options.parser ??= new MarkdownParser(this.editor);
        this.storage.getContent = () => {
            return this.options.serializer.serialize(this.editor.state.doc);
        }
        this.storage.getExtensions = () => {
            const extensions = [
                ...defaultExtensions,
                ...(this.options.extensions ?? []),
            ];
            return extensions.map(extension => extension.forEditor(this.editor));
        }
    },
    addCommands() {
        return {
            setMarkdownContent: (content) => ({ commands }) => {
                return commands.setContent(this.options.parser.parse(content));
            },
            insertMarkdownContentAt: (range, content, options) => ({ commands }) => {
                return commands.insertContentAt(range, this.options.parser.parse(content, { inline: true }), options);
            },
        }
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

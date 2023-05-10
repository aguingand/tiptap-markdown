import { Extension } from '@tiptap/core';
import {MarkdownTightLists} from "./extensions/tiptap/tight-lists";
import {MarkdownSerializer} from "./serialize/MarkdownSerializer";
import {MarkdownParser} from "./parse/MarkdownParser";
import defaultExtensions from "./extensions";
import { extensions } from '@tiptap/core';
import markdownExtensions from './extensions';
import Bold from "./extensions/marks/bold";
import HTMLMark from "./extensions/marks/html";
import HTMLNode from "./extensions/nodes/html";

export const Markdown = Extension.create({
    name: 'markdown',
    priority: 50,
    addOptions: () => ({
        content: null,
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
            // getExtensions: () => {},
        }
    },
    onBeforeCreate() {
        this.options.serializer ??= new MarkdownSerializer(this.editor);
        this.options.parser ??= new MarkdownParser(this.editor);
        this.storage.getContent = () => {
            return this.options.serializer.serialize(this.editor.state.doc);
        }
        // this.storage.getExtensions = () => {
        //     const extensions = [
        //         ...defaultExtensions,
        //         ...(this.options.extensions ?? []),
        //     ];
        //     return extensions.map(extension => extension.forEditor(this.editor));
        // }
        this.editor.options.initialContent = this.editor.options.content;
        this.editor.options.content = this.options.parser.parse(this.editor.options.content);
    },
    onCreate() {
        this.editor.options.content = this.editor.options.initialContent;
        delete this.editor.options.initialContent;
    },
    addCommands() {
        const commands = extensions.Commands.config.addCommands();
        return {
            setContent: (content, emitUpdate, parseOptions) => (props) => {
                return commands.setContent(this.options.parser.parse(content), emitUpdate, parseOptions)(props);
            },
            insertContentAt: (range, content, options) => (props) => {
                return commands.insertContentAt(range, this.options.parser.parse(content, { inline: true }), options)(props);
            },
        }
    },
    addExtensions() {
        return [
            ...markdownExtensions,
            MarkdownTightLists.configure({
                tight: this.options.tightLists,
                tightClass: this.options.tightListClass,
            }),
        ]
    }
});

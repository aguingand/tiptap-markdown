import {Extension, extensions, getSchemaByResolvedExtensions, Mark, Node, NodeConfig} from '@tiptap/core';
import { MarkdownTightLists } from "./extensions/tiptap/tight-lists";
import { MarkdownSerializer } from "./serializer/MarkdownSerializer";
import { MarkdownParser } from "./parser/MarkdownParser";
import { MarkdownClipboard } from "./extensions/tiptap/clipboard";
import type { RawCommands } from "@tiptap/core";
import markdownExtensions from "./extensions";
import {HtmlNode} from "./extensions/nodes/html";

export const Markdown = Extension.create({
    name: 'markdown',
    priority: 50,
    addOptions() {
        return {
            html: true,
            tightLists: true,
            tightListClass: 'tight',
            bulletListMarker: '-',
            linkify: false,
            breaks: false,
            transformPastedText: false,
            transformCopiedText: false,
        }
    },
    addCommands() {
        const commands = extensions.Commands.config.addCommands?.() as RawCommands;
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
        this.editor.extensionManager.extensions = this.editor.extensionManager.extensions.map(extension => {
            const markdownExtension = markdownExtensions.find(e => e.name === extension.name);
            if(markdownExtension) {
                const { name, defaultOptions, ...config } = markdownExtension.config;
                return extension.extend(config as any);
            }
            return extension;
        });
        this.editor.extensionManager.schema = getSchemaByResolvedExtensions(
            this.editor.extensionManager.extensions,
            this.editor
        );
        this.editor.schema = this.editor.extensionManager.schema;

        this.editor.storage.markdown = {
            options: { ...this.options },
            parser: new MarkdownParser(this.editor, this.options),
            serializer: new MarkdownSerializer(this.editor),
            getMarkdown: () => {
                return this.editor.storage.markdown.serializer.serialize(this.editor.state.doc);
            },
            initialContent: this.editor.options.content,
        }
        this.editor.options.content = this.editor.storage.markdown.parser.parse(this.editor.options.content);
    },
    onCreate() {
        this.editor.options.content = this.editor.storage.markdown.initialContent;
        delete this.editor.storage.markdown.initialContent;
    },
    addStorage() {
        return {
            /// storage will be defined in onBeforeCreate() to prevent initial object overriding
        }
    },
    addExtensions() {
        return [
            HtmlNode,
            MarkdownTightLists.configure({
                tight: this.options.tightLists,
                tightClass: this.options.tightListClass,
            }),
            MarkdownClipboard.configure({
                transformPastedText: this.options.transformPastedText,
                transformCopiedText: this.options.transformCopiedText,
            }),
        ]
    },
});

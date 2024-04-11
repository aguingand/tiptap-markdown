import { Content, Editor, Extension, extensions, getExtensionField, getSchemaByResolvedExtensions } from '@tiptap/core';
import { MarkdownTightLists } from "./extensions/markdown-tight-lists/markdown-tight-lists";
import { MarkdownParser } from "./MarkdownParser";
import { MarkdownClipboard } from "./extensions/markdown-clipboard/markdown-clipboard";
import markdownExtensions from "./extensions";
import { MarkdownRawHTML } from "./extensions/markdown-raw-html/markdown-raw-html";
import { MarkdownSerializer } from "./MarkdownSerializer";

export interface MarkdownOptions  {
    html: boolean,
    tightLists: boolean,
    tightListClass: string,
    bulletListMarker: '-' | '*' | '+',
    horizontalRuleMarker: '-' | '_' | '*',
    linkify: boolean,
    breaks: boolean,
    transformPastedText: boolean,
    transformCopiedText: boolean,
}

export interface MarkdownStorage {
    options: MarkdownOptions,
    parser: MarkdownParser,
    serializer: MarkdownSerializer,
    getMarkdown: () => string,
    initialContent?: Content,
}

export const Markdown = Extension.create<MarkdownOptions, MarkdownStorage>({
    name: 'markdown',
    priority: 50,
    addOptions() {
        return {
            html: true,
            tightLists: true,
            tightListClass: 'tight',
            bulletListMarker: '-',
            horizontalRuleMarker: '-',
            linkify: false,
            breaks: false,
            transformPastedText: false,
            transformCopiedText: false,
        }
    },
    addCommands() {
        const commands = getExtensionField(extensions.Commands, 'addCommands')();
        return {
            setContent: (content, emitUpdate, parseOptions) => (props) => {
                return commands.setContent(
                    (props.editor.storage.markdown as MarkdownStorage).parser.parse(content),
                    emitUpdate,
                    parseOptions
                )(props);
            },
            insertContentAt: (range, content, options) => (props) => {
                return commands.insertContentAt(
                    range,
                    (props.editor.storage.markdown as MarkdownStorage).parser.parse(content),
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
                return extension
                    .extend({
                        ...config,
                        addOptions() {
                            return {
                                ...extension.options,
                                ...markdownExtension.options,
                            };
                        },
                    } as any);
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
            parser: new MarkdownParser(this.editor),
            serializer: new MarkdownSerializer(this.editor),
            getMarkdown: () => {
                return (this.editor.storage.markdown as MarkdownStorage)
                    .serializer
                    .serialize(this.editor.state.doc.content);
            },
            initialContent: this.editor.options.content,
        }
        if(this.editor.options.content) {
            this.editor.options.content = (this.editor.storage.markdown as MarkdownStorage)
                .parser
                .parse(this.editor.options.content);
        }
    },
    onCreate() {
        this.editor.options.content = (this.editor.storage.markdown as MarkdownStorage).initialContent!;
        delete this.editor.storage.markdown.initialContent;
    },
    addStorage() {
        return {
            /// storage will be defined in onBeforeCreate() to prevent initial object overriding
        } as MarkdownStorage
    },
    addExtensions() {
        return [
            MarkdownRawHTML,
            MarkdownTightLists,
            MarkdownClipboard,
        ]
    },
});

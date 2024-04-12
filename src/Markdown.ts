import {
    Content,
    Extension,
    ExtensionConfig,
    extensions,
    getExtensionField,
    getSchemaByResolvedExtensions, MarkConfig, NodeConfig
} from '@tiptap/core';
import { MarkdownParser } from "./MarkdownParser";
import { MarkdownClipboard } from "./extensions/markdown-clipboard/markdown-clipboard";
import markdownExtensions from "./extensions";
import { MarkdownRawHTML } from "./extensions/markdown-raw-html/markdown-raw-html";
import { MarkdownSerializer } from "./MarkdownSerializer";
import { ParseMarkdownProps } from "./types";

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
        const editor = this.editor;
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
        this.editor.extensionManager.extensions = this.editor.extensionManager.extensions.map(extension => {
            let markdownExtension = markdownExtensions.find(e => e.name === extension.name);
            if(typeof markdownExtension === 'function') {
                return markdownExtension(extension).extend({
                    addStorage() {
                        return {
                            ...this.parent?.(),
                            markdown: editor.storage.markdown,
                        }
                    },
                });
            }
            if(markdownExtension) {
                return extension
                    .extend({
                        ...markdownExtension.config,
                        defaultOptions: null,
                        parseMarkdown(props) {
                            const parse = this.parent ?? getExtensionField(markdownExtension, 'parseMarkdown', this);
                            parse!(props);
                        },
                        renderMarkdown(props) {
                            const render = this.parent ?? getExtensionField(markdownExtension, 'renderMarkdown', this);
                            render!(props);
                        },
                        addStorage() {
                            return {
                                ...this.parent?.(),
                                markdown: editor.storage.markdown,
                            }
                        },
                        addOptions() {
                            return {
                                ...this.parent?.(),
                                ...markdownExtension.options,
                            }
                        },
                    } as Partial<ExtensionConfig> & Partial<NodeConfig> & Partial<MarkConfig>);
            }
            return extension;
        });
        this.editor.extensionManager.schema = getSchemaByResolvedExtensions(
            this.editor.extensionManager.extensions,
            this.editor
        );
        this.editor.schema = this.editor.extensionManager.schema;

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
            MarkdownClipboard,
        ]
    },
});

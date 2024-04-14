import {
    Content,
    Extension,
    extensions,
    getExtensionField,
} from '@tiptap/core';
import { MarkdownParser } from "./MarkdownParser";
import { MarkdownClipboard } from "./extensions/markdown-clipboard/markdown-clipboard";
import { MarkdownRawHTML } from "./extensions/markdown-raw-html/markdown-raw-html";
import { MarkdownSerializer } from "./MarkdownSerializer";
import { LoadMixins } from "./extensions/load-mixins/load-mixins";
import { bulletList } from "./extensions/extension-bullet-list/bullet-list";
import { blockquote } from "./extensions/extension-blockquote/blockquote";
import { bold } from "./extensions/extension-bold/bold";
import { code } from "./extensions/extension-code/code";
import { codeBlock } from "./extensions/extension-code-block/code-block";
import { doc } from "./extensions/extension-document/document";
import { hardBreak } from "./extensions/extension-hard-break/hard-break";
import { heading } from "./extensions/extension-heading/heading";
import { horizontalRule } from "./extensions/extension-horizontal-rule/horizontal-rule";
import { image } from "./extensions/extension-image/image";
import { italic } from "./extensions/extension-italic/italic";
import { link } from "./extensions/extension-link/link";
import { listItem } from "./extensions/extension-list-item/list-item";
import { orderedList } from "./extensions/extension-ordered-list/ordered-list";
import { strike } from "./extensions/extension-strike/strike";
import { table } from "./extensions/extension-table/table";
import { taskItem } from "./extensions/extension-task-item/task-item";
import { taskList } from "./extensions/extension-task-list/task-list";
import { paragraph } from "./extensions/extension-paragraph/paragraph";
import { text } from "./extensions/extension-text/text";
import { LoadContent } from "./extensions/load-content/load-content";

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
    priority: 1001,
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
    },
    addExtensions() {
        return [
            LoadMixins.configure({
                mixins: {
                    blockquote,
                    bold,
                    bulletList,
                    code,
                    codeBlock,
                    doc,
                    hardBreak,
                    heading,
                    horizontalRule,
                    image,
                    italic,
                    link,
                    listItem,
                    orderedList,
                    strike,
                    table,
                    taskItem,
                    taskList,
                    paragraph,
                    text,
                },
            }),
            LoadContent,
            MarkdownRawHTML,
            MarkdownClipboard,
        ]
    },
});

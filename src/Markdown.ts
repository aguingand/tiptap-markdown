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
import { LoadContent } from "./extensions/load-content/load-content";
import { bulletList } from "./mixins/extension-bullet-list/bullet-list";
import { blockquote } from "./mixins/extension-blockquote/blockquote";
import { bold } from "./mixins/extension-bold/bold";
import { code } from "./mixins/extension-code/code";
import { codeBlock } from "./mixins/extension-code-block/code-block";
import { doc } from "./mixins/extension-document/document";
import { hardBreak } from "./mixins/extension-hard-break/hard-break";
import { heading } from "./mixins/extension-heading/heading";
import { horizontalRule } from "./mixins/extension-horizontal-rule/horizontal-rule";
import { image } from "./mixins/extension-image/image";
import { italic } from "./mixins/extension-italic/italic";
import { link } from "./mixins/extension-link/link";
import { listItem } from "./mixins/extension-list-item/list-item";
import { orderedList } from "./mixins/extension-ordered-list/ordered-list";
import { strike } from "./mixins/extension-strike/strike";
import { table } from "./mixins/extension-table/table";
import { taskItem } from "./mixins/extension-task-item/task-item";
import { taskList } from "./mixins/extension-task-list/task-list";
import { paragraph } from "./mixins/extension-paragraph/paragraph";
import { text } from "./mixins/extension-text/text";

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

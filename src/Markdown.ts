import {
    Content,
    Extension,
    extensions,
    getExtensionField,
} from '@tiptap/core';
import { MarkdownParser } from "./MarkdownParser";
import { MarkdownClipboard } from "./extensions/markdown-clipboard";
import { MarkdownRawHTML } from "./extensions/markdown-raw-html";
import { MarkdownSerializer } from "./MarkdownSerializer";
import { LoadMixins } from "./extensions/load-mixins";
import { LoadContent } from "./extensions/load-content";
import { bulletList } from "./mixins/bullet-list";
import { blockquote } from "./mixins/blockquote";
import { bold } from "./mixins/bold";
import { code } from "./mixins/code";
import { codeBlock } from "./mixins/code-block";
import { doc } from "./mixins/document";
import { hardBreak } from "./mixins/hard-break";
import { heading } from "./mixins/heading";
import { horizontalRule } from "./mixins/horizontal-rule";
import { image } from "./mixins/image";
import { italic } from "./mixins/italic";
import { link } from "./mixins/link";
import { listItem } from "./mixins/list-item";
import { orderedList } from "./mixins/ordered-list";
import { strike } from "./mixins/strike";
import { table } from "./mixins/table";
import { taskItem } from "./mixins/task-item";
import { taskList } from "./mixins/task-list";
import { paragraph } from "./mixins/paragraph";
import { text } from "./mixins/text";

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

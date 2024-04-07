import { Editor, Node, Mark, NodeConfig, MarkConfig } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Link from '@tiptap/extension-link';
import Image, { ImageOptions } from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import CodeBlock, { CodeBlockOptions } from "@tiptap/extension-code-block";
import { Markdown } from "../../src/Markdown";
import { MarkdownOptions } from "../../index";

export type TestEditorOptions = {
    image?: ImageOptions,
    codeBlock?: CodeBlockOptions,
    htmlNode?: NodeConfig,
    htmlMark?: MarkConfig,
    markdown?: MarkdownOptions,
}

export function createEditor(options: TestEditorOptions) {
    return new Editor({
        extensions: [
            Markdown.configure({
                ...options.markdown,
            }),
            StarterKit.configure({
                codeBlock: false,
            }),
            Table,
            TableRow,
            TableHeader,
            TableCell,
            Link,
            Underline,
            CodeBlock.configure({
                ...options.codeBlock,
            }),
            Image.configure({
                ...options.image,
            }),
            Node.create({
                ...options.htmlNode,
                name: 'html-node',
            }),
            Mark.create({
                ...options.htmlMark,
                name: 'html-mark',
            }),
        ],
    });
}

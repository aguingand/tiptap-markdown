import { Editor, Node, Mark } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import CodeBlock from "@tiptap/extension-code-block";
import { createMarkdownEditor } from "../../src/MarkdownEditor";

const MarkdownEditor = createMarkdownEditor(Editor);

export function createEditor({
    image,
    codeBlock,
    htmlNode,
    htmlMark,
    ...options
} = {}) {
    return new MarkdownEditor({
        extensions: [
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
                ...codeBlock,
            }),
            Image.configure({
                ...image,
            }),
            Node.create({
                name: 'html-node',
                ...htmlNode,
            }),
            Mark.create({
                name: 'html-mark',
                ...htmlMark,
            }),
        ],
        ...options,
    });
}

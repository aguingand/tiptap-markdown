import { Editor, Node, Mark } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Table, TableRow, TableHeader, TableCell } from "@tiptap/extension-table";
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Underline } from '@tiptap/extension-underline';
import { CodeBlock } from "@tiptap/extension-code-block";
import { Markdown } from "../../src/Markdown";

export function createEditor({
    image,
    codeBlock,
    htmlNode,
    htmlMark,
    markdownOptions,
} = {}) {
    return new Editor({
        extensions: [
            Markdown.configure({
                ...markdownOptions,
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
    });
}

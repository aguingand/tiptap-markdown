import { createMarkdownEditor } from "../../src/MarkdownEditor";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

export function createEditor({ image, ...options } = {}) {
    return new Editor({
        extensions: [
            StarterKit,
            Table,
            TableRow,
            TableHeader,
            TableCell,
            Link,
            Image.configure({
                ...image,
            }),
        ],
        ...options,
    });
}

export function nodes(doc) {
    return doc.content;
}

export function node(doc) {
    return doc.content[0];
}

export function inlineNode(doc) {
    return doc.content[0].content[0];
}

export function dedent(str) {
    return str[0].replace(/^\s*/gm, '');
}

import { Editor, Node, } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';

export function createEditor({
    image,
    htmlNode,
    ...options
} = {}) {
    return new Editor({
        extensions: [
            StarterKit,
            Table,
            TableRow,
            TableHeader,
            TableCell,
            Link,
            Underline,
            Image.configure({
                ...image,
            }),
            Node.create({
                name: 'html',
                ...htmlNode,
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

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
    const MarkdownEditor = createMarkdownEditor(Editor);
    return new MarkdownEditor({
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

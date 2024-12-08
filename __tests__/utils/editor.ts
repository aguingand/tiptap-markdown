import { Editor, Node, Mark, NodeConfig, MarkConfig, EditorOptions } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Link from '@tiptap/extension-link';
import Image, { ImageOptions } from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import CodeBlock, { CodeBlockOptions } from "@tiptap/extension-code-block";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { Markdown, MarkdownOptions } from "../../src/Markdown";

export type TestEditorOptions = {
    editorOptions?: Partial<EditorOptions>,
    image?: Partial<ImageOptions>,
    codeBlock?: Partial<CodeBlockOptions>,
    htmlNode?: Partial<NodeConfig>,
    htmlMark?: Partial<MarkConfig>,
    markdown?: Partial<MarkdownOptions>,
}

export function createEditor(options: TestEditorOptions) {
    return new Editor({
        ...options.editorOptions,
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
            TaskList,
            TaskItem,
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

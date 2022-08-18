

import { Editor, EditorOptions, Node, Mark } from "@tiptap/core";
import { Node as ProseMirrorNode } from "prosemirror-model";
import { MarkdownSerializer, MarkdownSerializerState } from "prosemirror-markdown";
import * as MarkdownIt from "markdown-it";

export type MarkdownEditorOptions = EditorOptions & {
    markdown?: {
        html?: Boolean,
        tightLists?: Boolean,
        tightListClass?: String,
        bulletListMarker?: String,
        linkify?: String,
        breaks?: String,
        extensions?: MarkdownExtension[],
    }
}

export type MarkdownExtension = {};
export type MarkdownExtensionOptions = {
    parse?: {
        setup(markdownit: MarkdownIt): void;
        updateDOM(element: HTMLElement): void;
    },
    /**
     * @see MarkdownSerializer
     */
    serialize:
        (state: MarkdownSerializerState, node: ProseMirrorNode, parent: ProseMirrorNode, index: number) => void
        | {
            open: string | ((state: MarkdownSerializerState, mark: Mark, parent: ProseMirrorNode, index: number) => string),
            close: string | ((state: MarkdownSerializerState, mark: Mark, parent: ProseMirrorNode, index: number) => string),
            mixable?: boolean,
            expelEnclosingWhitespace?: boolean,
            escape?: boolean
        },
};

export type MarkdownEditor = Editor & {
    options: MarkdownEditorOptions
    /**
     * Get the document as markdown
     */
    getMarkdown(): string;
};

export function createMarkdownEditor(editor: typeof Editor): {
    new (options: Partial<MarkdownEditorOptions>): MarkdownEditor
};

export function createMarkdownExtension(type: Node | Mark, options: MarkdownExtensionOptions): MarkdownExtension

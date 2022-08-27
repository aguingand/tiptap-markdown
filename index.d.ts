

import { Editor, EditorOptions, Node, Mark } from "@tiptap/core";
import { MarkdownSerializerState } from "prosemirror-markdown";
import * as Prosemirror from "prosemirror-model";
import * as MarkdownIt from "markdown-it";

export interface MarkdownEditorOptions extends EditorOptions {
    markdown?: {
        html?: Boolean,
        tightLists?: Boolean,
        tightListClass?: String,
        bulletListMarker?: String,
        linkify?: Boolean,
        breaks?: Boolean,
        extensions?: (MarkdownMark|MarkdownNode)[]
    }
}

export class MarkdownEditor extends Editor {
    options: MarkdownEditorOptions;
    constructor(options?: Partial<MarkdownEditorOptions>);
    /**
     * Get the document as markdown
     */
    getMarkdown(): string;
}

export function createMarkdownEditor(editor: typeof Editor): typeof MarkdownEditor;


export type MarkdownNodeSpec<O = any> = {
    serialize(this: MarkdownNode<O>, state: MarkdownSerializerState, node: Prosemirror.Node, parent: Prosemirror.Node, index: number): void,
    parse?: {
        setup?(this: MarkdownNode<O>, markdownit: MarkdownIt): void,
        updateDOM?(this: MarkdownNode<O>, element: HTMLElement): void
    },
}

export type MarkdownMarkSpec<O = any> = {
    serialize: {
        open: string | ((this: MarkdownMark<O>, state: MarkdownSerializerState, mark: Prosemirror.Mark, parent: Prosemirror.Node, index: number) => string),
        close: string | ((this: MarkdownMark<O>, state: MarkdownSerializerState, mark: Prosemirror.Mark, parent: Prosemirror.Node, index: number) => string),
        mixable?: boolean,
        expelEnclosingWhitespace?: boolean,
        escape?: boolean
    },
    parse?: {
        setup?(this: MarkdownMark<O>, markdownit: MarkdownIt): void,
        updateDOM?(this: MarkdownMark<O>, element: HTMLElement): void
    },
}

declare class MarkdownExtension<Options = any> {
    get options(): Options
    get name(): string
    get schema(): Prosemirror.Schema
}

export class MarkdownNode<O = any> extends MarkdownExtension<O> {
    static create<O = any>(tiptapNode: Node<O>, spec: MarkdownNodeSpec<O>): MarkdownNode<O>
}

export class MarkdownMark<O = any> extends MarkdownExtension<O> {
    static create<O = any>(tiptapMark: Mark<O>, spec: MarkdownMarkSpec<O>): MarkdownMark<O>
}

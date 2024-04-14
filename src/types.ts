import { Editor, Mark, Node } from "@tiptap/core";
import { Processor } from "unified";
import { Options as RemarkRehypeOptions } from "remark-rehype";
import { ParentConfig } from "@tiptap/core/src/types";
import { MarkdownStorage } from "./Markdown";

type WithMarkdownStorageNode<N> =
    N extends Node<infer Options, infer Storage>
        ? Node<Options, { markdown: MarkdownStorage }>
        : never;

type WithMarkdownStorageMark<N> =
    N extends Mark<infer Options, infer Storage>
        ? Mark<Options, { markdown: MarkdownStorage }>
        : never;

export type NodeMixin<N extends Node = Node> = (node: N) => WithMarkdownStorageNode<N>;
export type MarkMixin<M extends Mark = Mark> = (mark: M) => WithMarkdownStorageMark<M>;


export interface ParseMarkdownProps {
    fromMarkdown: Processor<any,any,any,any,any>,
    toHTML: Processor<any,any,any,any,any>,
}

export interface ParseMarkdownReturn {
    remarkRehypeOptions?: RemarkRehypeOptions
}

export interface RenderMarkdownProps {
    fromHTML: Processor<any,any,any,any,any>,
    toMarkdown: Processor<any,any,any,any,any>,
}

export type MarkdownConfig<Options, Storage> = {
    parseMarkdown?(
        this: {
            name: string,
            options: Options,
            editor: Editor,
            storage: Storage,
            parent: ParentConfig<MarkdownConfig<Options, Storage>>['parseMarkdown']
        },
        { fromMarkdown, toHTML }: ParseMarkdownProps
    ): ParseMarkdownReturn | void,
    renderMarkdown?(
        this: {
            name: string,
            options: Options,
            editor: Editor,
            storage: Storage,
            parent: ParentConfig<MarkdownConfig<Options, Storage>>['renderMarkdown']
        },
        { fromHTML, toMarkdown }: RenderMarkdownProps
    ): void,
}

declare module '@tiptap/core' {
    interface NodeConfig<Options = any, Storage = any> extends MarkdownConfig<Options, Storage> {}
    interface MarkConfig<Options = any, Storage = any> extends MarkdownConfig<Options, Storage> {}
    interface ExtensionConfig<Options = any, Storage = any> extends MarkdownConfig<Options, Storage> {}
}
export type WithMarkdownStorage<Storage = {}> = Storage & { markdown: MarkdownStorage };

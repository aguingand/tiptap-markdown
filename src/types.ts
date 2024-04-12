import { Editor, NodeConfig } from "@tiptap/core";
import { Processor } from "unified";
import { defaultHandlers as remarkRehypeDefaultHandlers, Handlers as RemarkRehypeHandlers } from "mdast-util-to-hast";
import { Nodes } from 'mdast';
import { ParentConfig } from "@tiptap/core/src/types";

export interface ParseMarkdownProps {
    fromMarkdown: Processor<any,any,any,any,any>,
    toHTML: Processor<any,any,any,any,any>,
}

export interface RenderMarkdownProps {
    fromHTML: Processor<any,any,any,any,any>,
    toMarkdown: Processor<any,any,any,any,any>,
}

export type MarkdownConfig<Options> = {
    parseMarkdown(
        this: {
            name: string,
            options: Options,
            editor: Editor,
            parent: ParentConfig<MarkdownConfig<Options>>['parseMarkdown']
        },
        { fromMarkdown, toHTML }: ParseMarkdownProps
    ): void,
    renderMarkdown(
        this: {
            name: string,
            options: Options,
            editor: Editor,
            parent: ParentConfig<MarkdownConfig<Options>>['renderMarkdown']
        },
        { fromHTML, toMarkdown }: RenderMarkdownProps
    ): void,
}
declare module 'unified' {
    interface Data {
        withHandlers<
            N extends Nodes,
            Handlers = Pick<typeof remarkRehypeDefaultHandlers, N['type']>
        >(middleware: (handlers: Handlers) => Handlers): Handlers
    }
}

declare module '@tiptap/core' {
    interface NodeConfig<Options = any, Storage = any> extends MarkdownConfig<Options> {}
    interface MarkConfig<Options = any, Storage = any> extends MarkdownConfig<Options> {}
    interface ExtensionConfig<Options = any, Storage = any> extends MarkdownConfig<Options> {}
}

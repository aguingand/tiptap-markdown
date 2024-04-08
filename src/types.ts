import { Editor } from "@tiptap/core";
import { Processor } from "unified";

type Config<Options> = {
    parseMarkdown(
        this: { name: string, options: Options, editor: Editor },
        { fromMarkdown, toHTML }: {
            fromMarkdown: Processor<any,any,any,any,any>,
            toHTML: Processor<any,any,any,any,any>,
        }
    ): void,
    renderMarkdown(
        this: { name: string, editor: Editor, options: Options },
        { fromHTML, toMarkdown }: {
            fromHTML: Processor<any,any,any,any,any>,
            toMarkdown: Processor<any,any,any,any,any>,
        }
    ): void,
}

export type MarkdownNodeConfig<Options> = Config<Options>

export type MarkdownMarkConfig<Options> = Config<Options>

export type SpecContext<Options = any> = {
    options: Options,
    editor: Editor,
}

declare module '@tiptap/core' {
    interface NodeConfig<Options = any, Storage = any> extends MarkdownNodeConfig<Options> {}
    interface MarkConfig<Options = any, Storage = any> extends MarkdownMarkConfig<Options> {}
}

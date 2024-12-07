import { Editor } from "@tiptap/core";
import { Processor } from "unified";
import { MarkdownStorage } from "./Markdown";

export type ParseMarkdownProps = {
    fromMarkdown: Processor<any,any,any,any,any>,
    toHTML: Processor<any,any,any,any,any>,
}

export type RenderMarkdownProps = {
    fromHTML: Processor<any,any,any,any,any>,
    toMarkdown: Processor<any,any,any,any,any>,
}

export type MarkdownExtensionConfig<Options> = {
    parseMarkdown(
        this: { name: string, options: Options, editor: Editor },
        { fromMarkdown, toHTML }: ParseMarkdownProps
    ): void,
    renderMarkdown(
        this: { name: string, options: Options, editor: Editor },
        { fromHTML, toMarkdown }: RenderMarkdownProps
    ): void,
}

declare module '@tiptap/core' {
    interface NodeConfig<Options = any, Storage = any> extends MarkdownExtensionConfig<Options> {}
    interface MarkConfig<Options = any, Storage = any> extends MarkdownExtensionConfig<Options> {}
    interface ExtensionConfig<Options = any, Storage = any> extends MarkdownExtensionConfig<Options> {}
}

export { MarkdownStorage }

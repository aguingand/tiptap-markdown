import { Editor } from "@tiptap/core";
import { remark } from "remark";

type Config<Options> = {
    fromMarkdown(
        this: { name: string, options: Options, editor: Editor },
        context: {
            remark: typeof remark,
        }): void,
    toMarkdown(
        this: { name: string, editor: Editor, options: Options },
        context: {
            remark: typeof remark,
        }): void,
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

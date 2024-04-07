import { Editor } from "@tiptap/core";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";
import { defaultHandlers as remarkRehypeDefaultHandlers } from "mdast-util-to-hast";
import { defaultHandlers as remarkStringifyDefaultHandlers } from "mdast-util-to-markdown";
import { defaultHandlers as rehypeRemarkDefaultHandlers } from "hast-util-to-mdast";

type Config = {
    fromMarkdown(context: {
        remark: typeof remark,
        remarkParse: typeof remarkParse,
        remarkRehype: typeof remarkRehype,
        remarkRehypeDefaultHandlers: typeof remarkRehypeDefaultHandlers,
    }): void,
    toMarkdown(context: {
        remark: typeof remark,
        remarkStringify: typeof remarkStringify,
        remarkStringifyDefaultHandlers: typeof remarkStringifyDefaultHandlers,
        rehypeRemark: typeof rehypeRemark,
        rehypeRemarkDefaultHandlers: typeof rehypeRemarkDefaultHandlers,
    }): void,
}

export type MarkdownNodeConfig = Config

export type MarkdownMarkConfig = Config

export type SpecContext<Options = any> = {
    options: Options,
    editor: Editor,
}

declare module '@tiptap/core' {
    interface NodeConfig<Options = any, Storage = any> extends MarkdownNodeConfig {}
    interface MarkConfig<Options = any, Storage = any> extends MarkdownMarkConfig {}
}

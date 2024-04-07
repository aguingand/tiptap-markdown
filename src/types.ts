
import type { MarkParserSpec, NodeParserSpec } from './transformer/parser/types'
import type { MarkSerializerSpec, NodeSerializerSpec } from './transformer/serializer/types'
import {Editor} from "@tiptap/core";
// import type {  Nodes } from "mdast";



export type MarkdownNodeConfig = {
    /// To markdown serializer spec.
    readonly toMarkdown: NodeSerializerSpec
    /// Parse markdown serializer spec.
    readonly parseMarkdown: NodeParserSpec
}

export type MarkdownMarkConfig = {
    /// To markdown serializer spec.
    readonly toMarkdown: MarkSerializerSpec
    /// Parse markdown serializer spec.
    readonly parseMarkdown: MarkParserSpec
}

export type SpecContext<Options = any> = {
    options: Options,
    editor: Editor,
}

declare module '@tiptap/core' {
    interface NodeConfig<Options = any, Storage = any> extends MarkdownNodeConfig {}
    interface MarkConfig<Options = any, Storage = any> extends MarkdownMarkConfig {}
}

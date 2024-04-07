import type { MarkType, Node, NodeType } from '@tiptap/pm/model'
import type {MarkdownNode, SpecContext} from '../../types'
// import type { PhrasingContent, RootContent } from 'mdast';

import type { State } from './state'

/// The parser type which is used to transform markdown text into prosemirror node.
export type Parser = (text: string) => Node

/// The spec for node parser in schema.
export interface NodeParserSpec {
    /// The match function to check if the node is the target node.
    /// For example:
    ///
    /// ```typescript
    /// match: (node) => node.type === 'paragraph'
    /// ```
    match: (node: MarkdownNode) => boolean
    /// The runner function to transform the node into prosemirror node.
    /// Generally, you should call methods in `state` to add node to state.
    /// For example:
    ///
    /// ```typescript
    /// runner: (state, node, type) => {
    ///   state
    ///     .openNode(type)
    ///     .next(node.children)
    ///     .closeNode();
    /// }
    /// ```
    handle: (this: SpecContext, state: State, node: MarkdownNode, proseType: NodeType) => void
}

/// The spec for mark parser in schema.
export interface MarkParserSpec {
    /// The match function to check if the node is the target mark.
    /// For example:
    ///
    /// ```typescript
    /// match: (mark) => mark.type === 'emphasis'
    /// ```
    match: (node: MarkdownNode) => boolean
    /// The runner function to transform the node into prosemirror mark.
    /// Generally, you should call methods in `state` to add mark to state.
    /// For example:
    ///
    /// ```typescript
    /// runner: (state, node, type) => {
    ///   state
    ///     .openMark(type)
    ///     .next(node.children)
    ///     .closeMark(type)
    /// }
    /// ```
    handle: (this: SpecContext, state: State, node: MarkdownNode, proseType: MarkType) => void
}

import { Mark, Node } from "@tiptap/core";
import { WithMarkdownStorage } from "../../types";
import { MarkdownStorage } from "../../Markdown";


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

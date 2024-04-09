import { visit, BuildVisitor } from 'unist-util-visit';
import type { Node } from 'unist';
import { Plugin } from 'unified';
import { Emphasis, Strong } from "mdast";

export const remarkMarker: Plugin<[], undefined, undefined> = () => (tree, file) => {
    const getMarker = (node: Node) => {
        return (file.value as string).charAt(node.position!.start.offset!) as '*' | '_'
    }
    visit(tree, (node: Node) => ['strong', 'emphasis'].includes(node.type), ((node: Node) => {
        ((node as Emphasis | Strong).data ??= {}).marker = getMarker(node);
    }))
}

declare module 'mdast' {
    interface EmphasisData {
        marker?: '*' | '_'
    }
    interface StrongData {
        marker?: '*' | '_'
    }
}

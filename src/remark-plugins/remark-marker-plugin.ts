import { visit } from 'unist-util-visit';
import type { Node } from 'unist';
import { Plugin } from 'unified';

export const remarkMarker: Plugin<[], undefined, undefined> = () => (tree, file) => {
    const getMarker = (node: Node) => {
        return (file.value as string).charAt(node.position!.start.offset!)
    }
    visit(tree, (node: Node) => ['strong', 'emphasis'].includes(node.type), (node: Node) => {
        (node as Node & { marker: string }).marker = getMarker(node)
    })
}

declare module 'mdast' {
    interface Emphasis {
        marker: string
    }
    interface Strong {
        marker: string
    }
}

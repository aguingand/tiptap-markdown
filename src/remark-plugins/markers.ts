import { visit, BuildVisitor } from 'unist-util-visit';
import type { Node } from 'unist';
import { Plugin } from 'unified';
import { Emphasis, Strong } from "mdast";
import { Handle, Options } from "mdast-util-to-markdown";

export const remarkMarker: Plugin<[], undefined, undefined> = () => (tree, file) => {
    const getMarker = (node: Node) => {
        return (file.value as string).charAt(node.position!.start.offset!) as '*' | '_'
    }
    visit(tree, (node: Node) => ['strong', 'emphasis'].includes(node.type), ((node: Node) => {
        ((node as Emphasis | Strong).data ??= {}).marker = getMarker(node);
    }))
}

export function stringifyMarker(baseHandler: Handle, config: (node: Strong | Emphasis) => { marker: string, options: Options }): Handle {
    const handler: Handle & { peek?: Handle } = (node, parent, state, info) => {
        const previousOptions = { ...state.options };
        Object.assign(state.options, config(node).options);
        const result = baseHandler(node, parent, state, info);
        state.options = previousOptions;
        return result;
    }
    handler.peek = (node) => config(node).marker;
    return handler;
}

declare module 'mdast' {
    interface EmphasisData {
        marker?: '*' | '_'
    }
    interface StrongData {
        marker?: '*' | '_'
    }
}

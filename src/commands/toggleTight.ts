import { isList, NodeWithPos, RawCommands } from "@tiptap/core";

export const toggleTight: RawCommands['toggleTight'] = (tight) => ({ editor, state, dispatch, tr }) => {
    const nodes: NodeWithPos[] = []

    state.doc.nodesBetween(state.selection.from, state.selection.to, (node, pos) => {
        if(isList(node.type.name, editor.extensionManager.extensions)
            && typeof node.attrs.tight === 'boolean') {
            nodes.push({ node, pos });
        }
    });

    if(nodes.length > 0) {
        const lastNode = nodes.at(-1)!;
        if(dispatch) {
            tr.setNodeMarkup(lastNode.pos, undefined, {
                ...lastNode.node,
                tight: tight ?? !lastNode.node.attrs?.tight,
            })
        }
        return true;
    }

    return false;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        toggleTight: {
            toggleTight: (tight?: boolean) => ReturnType
        }
    }
}

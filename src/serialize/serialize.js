import { MarkdownSerializerState } from './state';


export function serialize(schema, content, {
    html,
    tightLists = false,
    bulletListMarker = '*',
    marks,
    nodes,
} = {}) {
    const resolvedNodes = {
        // ...getNodes(schema),
        ...nodes,
    }
    const resolvedMarks = {
        // ...getMarks(schema),
        ...marks,
    }
    const state = new MarkdownSerializerState(resolvedNodes, resolvedMarks, {
        tightLists,
    });

    state.renderContent(content);

    return state.out;
}


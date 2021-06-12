import { MarkdownSerializerState } from './state';
import { getMarks } from "./marks";
import { getNodes } from "./nodes";


export function serialize(schema, content, {
    html,
    tightLists = false,
    bulletListMarker = '*',
    marks,
    nodes,
} = {}) {
    const resolvedNodes = {
        ...getNodes(schema, {
            html,
            bulletListMarker,
        }),
        ...nodes,
    }
    const resolvedMarks = {
        ...getMarks(schema, {
            html,
        }),
        ...marks,
    }
    const state = new MarkdownSerializerState(resolvedNodes, resolvedMarks, {
        tightLists,
    });

    state.renderContent(content);

    return state.out;
}


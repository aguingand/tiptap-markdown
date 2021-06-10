import { MarkdownSerializerState } from './state';
import { getMarks } from "./marks";
import { getNodes } from "./nodes";

export function serialize(schema, content, {
    html,
    tightLists = false,
    bulletListMarker = '*',
} = {}) {
    const nodes = getNodes(schema, {
        html,
        bulletListMarker,
    });
    const marks = getMarks(schema, {
        html,
    });
    const state = new MarkdownSerializerState(nodes, marks, {
        tightLists,
    });

    state.renderContent(content);

    return state.out;
}


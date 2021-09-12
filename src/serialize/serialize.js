import { MarkdownSerializerState } from './state';
import { getMarks } from "./marks";
import { getNodes } from "./nodes";


export function serialize(schema, content, {
    extensions,
    html,
    bulletListMarker = '*',
} = {}) {
    const nodes = getNodes(schema, extensions, {
        html,
        bulletListMarker,
    });
    const marks = getMarks(schema, extensions, {
        html,
    });
    const state = new MarkdownSerializerState(nodes, marks);

    state.renderContent(content);

    return state.out;
}


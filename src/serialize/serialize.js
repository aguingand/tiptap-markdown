import { MarkdownSerializerState } from './state';
import { getMarks } from "./marks";
import { getNodes } from "./nodes";
import HardBreak from "../extensions/nodes/hard-break";


export function serialize(schema, content, {
    extensions,
    html,
    tightLists = false,
    bulletListMarker = '*',
} = {}) {
    const nodes = getNodes(schema, extensions, {
        html,
        bulletListMarker,
    });
    const marks = getMarks(schema, extensions, {
        html,
    });
    const state = new MarkdownSerializerState(nodes, marks, {
        tightLists,
        hardBreakNodeName: HardBreak.type.name,
    });

    state.renderContent(content);

    return state.out;
}


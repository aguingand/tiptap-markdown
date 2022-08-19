import { MarkdownSerializerState } from './state';
import { getMarks } from "./marks";
import { getNodes } from "./nodes";


export function serialize(schema, content, {
    extensions,
} = {}) {
    const nodes = getNodes(schema, extensions);
    const marks = getMarks(schema, extensions);
    const state = new MarkdownSerializerState(nodes, marks);

    state.renderContent(content);

    return state.out;
}


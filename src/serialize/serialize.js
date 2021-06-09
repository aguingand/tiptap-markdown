import { MarkdownSerializer } from 'prosemirror-markdown/src/to_markdown';
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

    return new MarkdownSerializer(nodes, marks)
        .serialize(content, {
            tightLists,
        });
}


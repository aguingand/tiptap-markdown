import HardBreak from "../extensions/nodes/hard-break";

/**
 * Prosemirror-markdown check for specific hard_break node name
 * https://github.com/ProseMirror/prosemirror-markdown/blob/5e454a9b4d59c14a5826e112813e78b6b7325668/src/to_markdown.ts#L280
 */
export function withSchemaHardBreakFix(schema, render) {
    const { hardBreak } = schema.nodes;

    if(hardBreak) {
        hardBreak.name = 'hard_break';
    }

    const result = render(schema);

    if(hardBreak) {
        hardBreak.name = HardBreak.type.name;
    }

    return result;
}

export function withInitialSchema(schema, render) {
    const { hardBreak } = schema.nodes;
    const hardBreakNodeName = hardBreak?.name;

    if(hardBreak) {
        hardBreak.name = HardBreak.type.name;
    }

    const result = render(schema);

    if(hardBreak) {
        hardBreak.name = hardBreakNodeName;
    }

    return result;
}

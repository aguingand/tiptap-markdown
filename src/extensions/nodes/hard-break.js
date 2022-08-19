import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { MarkdownNode } from "../../util/extensions";


const HardBreak = Node.create({
    name: 'hardBreak',
});

export default MarkdownNode.create(HardBreak, {
    serialize: defaultMarkdownSerializer.nodes.hard_break,
    parse: {
        // handled by markdown-it
    },
});

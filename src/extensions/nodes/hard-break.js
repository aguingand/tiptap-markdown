import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { createMarkdownExtension } from "../../util/extensions";


const HardBreak = Node.create({
    name: 'hardBreak',
});

export default createMarkdownExtension(HardBreak, {
    serialize: defaultMarkdownSerializer.nodes.hard_break,
    parse: {
        // handled by markdown-it
    },
});

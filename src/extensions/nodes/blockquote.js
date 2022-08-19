import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { MarkdownNode } from "../../util/extensions";


const Blockquote = Node.create({
    name: 'blockquote',
});

export default MarkdownNode.create(Blockquote, {
    serialize: defaultMarkdownSerializer.nodes.blockquote,
    parse: {
        // handled by markdown-it
    },
});

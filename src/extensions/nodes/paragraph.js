import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { MarkdownNode } from "../../util/extensions";


const Paragraph = Node.create({
    name: 'paragraph',
});

export default MarkdownNode.create(Paragraph, {
    serialize: defaultMarkdownSerializer.nodes.paragraph,
    parse: {
        // handled by markdown-it
    },
});

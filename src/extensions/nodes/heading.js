import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { MarkdownNode } from "../../util/extensions";


const Heading = Node.create({
    name: 'heading',
});

export default MarkdownNode.create(Heading, {
    serialize: defaultMarkdownSerializer.nodes.heading,
    parse: {
        // handled by markdown-it
    },
});

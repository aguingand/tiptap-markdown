import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { MarkdownNode } from "../../util/extensions";


const Image = Node.create({
    name: 'image',
});

export default MarkdownNode.create(Image, {
    serialize: defaultMarkdownSerializer.nodes.image,
    parse: {
        // handled by markdown-it
    },
});

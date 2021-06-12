import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { createMarkdownExtension } from "../../util/extensions";


const Image = Node.create({
    name: 'image',
});

export default createMarkdownExtension(Image, {
    serialize: defaultMarkdownSerializer.nodes.image,
    parse: {
        // handled by markdown-it
    },
});

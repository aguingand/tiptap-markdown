import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { createMarkdownExtension } from "../../util/extensions";


const Heading = Node.create({
    name: 'heading',
});

export default createMarkdownExtension(Heading, {
    serialize: defaultMarkdownSerializer.nodes.heading,
    parse: {
        // handled by markdown-it
    },
});

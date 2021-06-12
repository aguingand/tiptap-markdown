import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { createMarkdownExtension } from "../../util/extensions";


const Paragraph = Node.create({
    name: 'paragraph',
});

export default createMarkdownExtension(Paragraph, {
    serialize: defaultMarkdownSerializer.nodes.paragraph,
    parse: {
        // handled by markdown-it
    },
});

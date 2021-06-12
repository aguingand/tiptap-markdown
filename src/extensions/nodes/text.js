import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { createMarkdownExtension } from "../../util/extensions";


const Text = Node.create({
    name: 'text',
});

export default createMarkdownExtension(Text, {
    serialize: defaultMarkdownSerializer.nodes.text,
    parse: {
        // handled by markdown-it
    },
});

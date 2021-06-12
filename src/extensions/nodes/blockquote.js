import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { createMarkdownExtension } from "../../util/extensions";


const Blockquote = Node.create({
    name: 'blockquote',
});

export default createMarkdownExtension(Blockquote, {
    serialize: defaultMarkdownSerializer.nodes.blockquote,
    parse: {
        // handled by markdown-it
    },
});

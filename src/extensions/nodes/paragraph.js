import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";


const Paragraph = Node.create({
    name: 'paragraph',
});

export default Paragraph.extend({
    addStorage() {
        return {
            markdown: {
                serialize: defaultMarkdownSerializer.nodes.paragraph,
                parse: {
                    // handled by markdown-it
                },
            },
        }
    }
});

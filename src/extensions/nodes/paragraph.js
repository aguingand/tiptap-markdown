import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { LazyNode } from "../../util/extensions";
import {Node} from "@tiptap/core";


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

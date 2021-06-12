import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { createMarkdownExtension } from "../../util/extensions";


const ListItem = Node.create({
    name: 'listItem',
});

export default createMarkdownExtension(ListItem, {
    serialize: defaultMarkdownSerializer.nodes.list_item,
    parse: {
        // handled by markdown-it
    },
});

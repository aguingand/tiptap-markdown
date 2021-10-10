import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { createMarkdownExtension } from "../../util/extensions";

const OrderedList = Node.create({
    name: 'orderedList',
});


export default createMarkdownExtension(OrderedList, {
    serialize: defaultMarkdownSerializer.nodes.ordered_list,
    parse: {
        // handled by markdown-it
    },
});

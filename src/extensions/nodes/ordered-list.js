import { Node } from "@tiptap/core";
import { createMarkdownExtension } from "../../util/extensions";
import { defaultMarkdownSerializer } from "prosemirror-markdown";

const OrderedList = Node.create({
    name: 'orderedList',
});


export default createMarkdownExtension(OrderedList, {
    serialize: defaultMarkdownSerializer.nodes.ordered_list,
    parse: {
        // handled by markdown-it
    },
});

import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { MarkdownNode } from "../../util/extensions";


const OrderedList = Node.create({
    name: 'orderedList',
});

export default MarkdownNode.create(OrderedList, {
    serialize: defaultMarkdownSerializer.nodes.ordered_list,
    parse: {
        // handled by markdown-it
    },
});

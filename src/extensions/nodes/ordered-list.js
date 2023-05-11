import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";


const OrderedList = Node.create({
    name: 'orderedList',
});

export default OrderedList.extend({
    addStorage() {
        return {
            markdown: {
                serialize: defaultMarkdownSerializer.nodes.ordered_list,
                parse: {
                    // handled by markdown-it
                },
            }
        }
    }
});

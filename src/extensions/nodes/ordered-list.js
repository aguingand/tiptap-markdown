import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { createMarkdownExtension } from "../../util/extensions";
import { getTightListExtension } from "../tiptap/tight-lists";

const OrderedList = Node.create({
    name: 'orderedList',
});


export default createMarkdownExtension(OrderedList, {
    serialize: defaultMarkdownSerializer.nodes.ordered_list,
    parse: {
        // handled by markdown-it
    },
    updateExtension(OrderedList) {
        return OrderedList.extend(
            getTightListExtension({ editor: this.editor })
        );
    },
});

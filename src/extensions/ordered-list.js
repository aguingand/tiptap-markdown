import { Node } from "@tiptap/core";
import { createMarkdownExtension } from "../util/extensions";

const OrderedList = Node.create({
    name: 'orderedList',
});


export default createMarkdownExtension();

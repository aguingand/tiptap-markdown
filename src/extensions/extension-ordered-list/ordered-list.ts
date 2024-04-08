import { Node } from "@tiptap/core";
import remarkRehype from "remark-rehype";
import { remarkRehypeListHandlers } from "../../remark-plugins/lists";


const OrderedList = Node.create({
    name: 'orderedList',
});


export default OrderedList.extend({
    parseMarkdown({ toHTML }) {
        toHTML.use(remarkRehype, {
            handlers: remarkRehypeListHandlers,
        });
    },
    renderMarkdown() {
        // handled by remark
    },
});

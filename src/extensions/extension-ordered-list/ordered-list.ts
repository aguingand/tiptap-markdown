import { Node } from "@tiptap/core";


const OrderedList = Node.create({
    name: 'orderedList',
});


export default OrderedList.extend({
    parseMarkdown() {
        // handled by remark
    },
    renderMarkdown() {
        // handled by remark
    },
});

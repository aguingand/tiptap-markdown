import { Node } from "@tiptap/core";

const ListItem = Node.create({
    name: 'listItem',
});


export default ListItem.extend({
    parseMarkdown() {
        // handled by remark
    },
    renderMarkdown() {
        // handled by remark
    },
});

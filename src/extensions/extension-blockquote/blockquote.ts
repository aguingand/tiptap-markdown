import { Node } from "@tiptap/core";


const Blockquote = Node.create({
    name: 'blockquote',
});

export default Blockquote.extend({
    parseMarkdown() {
        // handled by remark
    },
    renderMarkdown() {
        // handled by remark
    },
});

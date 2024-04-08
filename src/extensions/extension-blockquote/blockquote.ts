import { Node } from "@tiptap/core";


const Blockquote = Node.create({
    name: 'blockquote',
});

export default Blockquote.extend({
    fromMarkdown() {
        // handled by remark
    },
    toMarkdown() {
        // handled by remark
    },
});

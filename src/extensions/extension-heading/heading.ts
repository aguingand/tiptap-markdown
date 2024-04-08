import { Node } from "@tiptap/core";

const Heading = Node.create({
    name: 'heading',
});

export default Heading.extend({
    parseMarkdown() {
        // handled by remark
    },
    renderMarkdown() {
        // handled by remark
    },
});

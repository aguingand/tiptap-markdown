import { Node } from "@tiptap/core";


const HorizontalRule = Node.create({
    name: 'horizontalRule',
});

export default HorizontalRule.extend({
    parseMarkdown() {
        // handled by remark
    },
    renderMarkdown() {
        // handled by remark
    },
});

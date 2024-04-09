import { Mark } from "@tiptap/core";


const Code = Mark.create({
    name: 'code',
});

export default Code.extend({
    parseMarkdown() {
        // handled by remark
    },
    renderMarkdown() {
        // handled by remark
    },
})

import { Mark } from "@tiptap/core";


const Code = Mark.create({
    name: 'code',
});

export default Code.extend({
    fromMarkdown() {
        // handled by remark
    },
    toMarkdown() {
        // handled by remark
    },
})

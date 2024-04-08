import { Mark } from "@tiptap/core";


const Link = Mark.create({
    name: 'link',
});

export default Link.extend({
    fromMarkdown() {
        // handled by remark
    },
    toMarkdown() {
        // handled by remark
    },
})

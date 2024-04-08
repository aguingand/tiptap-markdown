import { Mark } from "@tiptap/core";


const Strike = Mark.create({
    name: 'strike',
});

export default Strike.extend({
    fromMarkdown() {
        // handled by remark-gfm
    },
    toMarkdown() {
        // handled by remark-gfm
    },
});

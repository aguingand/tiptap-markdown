import { Mark } from "@tiptap/core";
import { createMarkdownExtension } from "../../util/extensions";


const Strike = Mark.create({
    name: 'strike',
});

export default createMarkdownExtension(Strike, {
    serialize: {open:'~~', close:'~~', expelEnclosingWhitespace: true},
    parse: {
        // handled by markdown-it
    },
})

import { Mark } from "@tiptap/core";
import { MarkdownMark } from "../../util/extensions";


const Strike = Mark.create({
    name: 'strike',
});

export default MarkdownMark.create(Strike, {
    serialize: {open:'~~', close:'~~', expelEnclosingWhitespace: true},
    parse: {
        // handled by markdown-it
    },
})

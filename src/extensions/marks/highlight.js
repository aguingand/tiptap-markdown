import markPlugin from "markdown-it-mark";
import { createMarkdownExtension } from "../../util/extensions";
import { Mark } from "@tiptap/core";


const Highlight = Mark.create({
    name: 'highlight',
});

export default createMarkdownExtension(Highlight, {
    serialize: {
        open:'==', close:'==', expelEnclosingWhitespace: true
    },
    parse: {
        setup(markdownit) {
            markdownit.use(markPlugin);
        },
    },
})

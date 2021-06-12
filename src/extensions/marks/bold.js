import { Mark } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { createMarkdownExtension } from "../../util/extensions";


const Bold = Mark.create({
    name: 'bold',
});

export default createMarkdownExtension(Bold, {
    serialize: defaultMarkdownSerializer.marks.strong,
    parse: {
        // handled by markdown-it
    }
})

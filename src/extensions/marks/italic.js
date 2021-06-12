import { Mark } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { createMarkdownExtension } from "../../util/extensions";


const Italic = Mark.create({
    name: 'italic',
});

export default createMarkdownExtension(Italic, {
    serialize: defaultMarkdownSerializer.marks.em,
    parse: {
        // handled by markdown-it
    }
})

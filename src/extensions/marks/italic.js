import { Mark } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { MarkdownMark } from "../../util/extensions";


const Italic = Mark.create({
    name: 'italic',
});

export default MarkdownMark.create(Italic, {
    serialize: defaultMarkdownSerializer.marks.em,
    parse: {
        // handled by markdown-it
    }
})

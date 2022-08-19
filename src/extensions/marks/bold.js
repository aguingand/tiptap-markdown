import { Mark } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { MarkdownMark } from "../../util/extensions";


const Bold = Mark.create({
    name: 'bold',
});

export default MarkdownMark.create(Bold, {
    serialize: defaultMarkdownSerializer.marks.strong,
    parse: {
        // handled by markdown-it
    }
})

import { Mark } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { MarkdownMark } from "../../util/extensions";


const Code = Mark.create({
    name: 'code',
});

export default MarkdownMark.create(Code, {
    serialize: defaultMarkdownSerializer.marks.code,
    parse: {
        // handled by markdown-it
    }
})

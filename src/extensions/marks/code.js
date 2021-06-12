import { Mark } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { createMarkdownExtension } from "../../util/extensions";


const Code = Mark.create({
    name: 'code',
});

export default createMarkdownExtension(Code, {
    serialize: defaultMarkdownSerializer.marks.code,
    parse: {
        // handled by markdown-it
    }
})

import { Mark } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { createMarkdownExtension } from "../../util/extensions";


const Link = Mark.create({
    name: 'link',
});

export default createMarkdownExtension(Link, {
    serialize: defaultMarkdownSerializer.marks.link,
    parse: {
        // handled by markdown-it
    }
})

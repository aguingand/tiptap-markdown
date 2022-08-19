import { Mark } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { MarkdownMark } from "../../util/extensions";


const Link = Mark.create({
    name: 'link',
});

export default MarkdownMark.create(Link, {
    serialize: defaultMarkdownSerializer.marks.link,
    parse: {
        // handled by markdown-it
    }
})

import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { createMarkdownExtension } from "../../util/extensions";


const HorizontalRule = Node.create({
    name: 'horizontalRule',
});

export default createMarkdownExtension(HorizontalRule, {
    serialize: defaultMarkdownSerializer.nodes.horizontal_rule,
    parse: {
        // handled by markdown-it
    },
});

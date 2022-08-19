import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { MarkdownNode } from "../../util/extensions";


const HorizontalRule = Node.create({
    name: 'horizontalRule',
});

export default MarkdownNode.create(HorizontalRule, {
    serialize: defaultMarkdownSerializer.nodes.horizontal_rule,
    parse: {
        // handled by markdown-it
    },
});

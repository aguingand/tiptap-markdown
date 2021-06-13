import { getHTMLFromFragment, Node } from "@tiptap/core";
import { createMarkdownExtension } from "../../util/extensions";
import { Fragment } from "prosemirror-model";

const HTML = Node.create({
    name: 'html',
});

export default createMarkdownExtension(HTML, {
    serialize(state, node) {
        if(this.markdownOptions.html) {
            const rendered = getHTMLFromFragment(Fragment.from(node), node.type.schema);
            state.write(rendered);
        } else {
            console.warn(`Tiptap Markdown: "${node.type.name}" node is only available in html mode`);
            state.write(`[${node.type.name}]`);
        }
    },
    parse: {
        // handled by markdown-it
    },
});

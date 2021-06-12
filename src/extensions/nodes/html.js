import { getHTMLFromFragment } from "@tiptap/core";
import { createMarkdownExtension } from "../../util/extensions";
import { Fragment } from "prosemirror-model";


export default createMarkdownExtension({
    serialize(state, node) {
        const html = false;
        if(html) {
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

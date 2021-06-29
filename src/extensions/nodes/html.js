import { getHTMLFromFragment, Node } from "@tiptap/core";
import { createMarkdownExtension } from "../../util/extensions";
import { elementFromString } from "../../util/dom";
import { Fragment } from "prosemirror-model";

const HTML = Node.create({
    name: 'html',
});

export default createMarkdownExtension(HTML, {
    serialize(state, node) {
        if(this.markdownOptions.html) {
            const rendered = getHTMLFromFragment(Fragment.from(node), node.type.schema);
            const dom = elementFromString(rendered);
            const element = dom.firstElementChild;
            element.innerHTML = '\n' + (element.innerHTML || '\n') + '\n';
            state.write(dom.innerHTML);
        } else {
            console.warn(`Tiptap Markdown: "${node.type.name}" node is only available in html mode`);
            state.write(`[${node.type.name}]`);
        }
        if(node.isBlock) {
            state.closeBlock(node);
        }
    },
    parse: {
        // handled by markdown-it
    },
});

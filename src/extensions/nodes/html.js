import { getHTMLFromFragment, Node } from "@tiptap/core";
import { createMarkdownExtension } from "../../util/extensions";
import { elementFromString } from "../../util/dom";
import { Fragment } from "prosemirror-model";

const HTML = Node.create({
    name: 'html',
});

export default createMarkdownExtension(HTML, {
    serialize(state, node, parent) {
        if(this.markdownOptions.html) {
            state.write(serializeHTML(node, parent));
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

function serializeHTML(node, parent) {
    const schema = node.type.schema;
    const html = getHTMLFromFragment(Fragment.from(node), schema);

    if(node.isBlock && parent.type.name === schema.topNodeType.name) {
        return formatBlock(html);
    }

    return html;
}

/**
 * format html block as per the commonmark spec
 */
function formatBlock(html) {
    const dom = elementFromString(html);
    const element = dom.firstElementChild;

    element.innerHTML = `\n${element.innerHTML}\n`;

    return element.outerHTML;
}

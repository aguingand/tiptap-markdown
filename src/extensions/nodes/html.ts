import {DOMParser, Fragment} from "@tiptap/pm/model";
import { getHTMLFromFragment, Node } from "@tiptap/core";
import { elementFromString } from "../../util/dom";
import { Html } from "mdast";


export const HtmlNode = Node.create({
    name: 'htmlNode',
    parseMarkdown: {
        match: node => node.type === 'html',
        handle(state, node: Html, type) {
            DOMParser.fromSchema(this.editor.schema).parseSlice(elementFromString(node.value));
            state.addNode(type, { value: node.value as string });
        },
    },
    toMarkdown(state, node) {
        if(this.editor.storage.markdown.options.html) {
            state.addNode('html', undefined, node.attrs.value)
        } else {
            console.warn(`Tiptap Markdown: "${node.type.name}" node is only available in html mode`);
        }
    }
});

function serializeHTML(node, parent) {
    const schema = node.type.schema;
    const html = getHTMLFromFragment(Fragment.from(node), schema);

    if(node.isBlock && (parent instanceof Fragment || parent.type.name === schema.topNodeType.name)) {
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

    element.innerHTML = element.innerHTML.trim()
        ? `\n${element.innerHTML}\n`
        : `\n`;

    return element.outerHTML;
}

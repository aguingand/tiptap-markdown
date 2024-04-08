import { DOMParser, Node as ProsemirrorNode } from "@tiptap/pm/model";
import { Node } from "@tiptap/core";
import { elementFromString } from "../../../src/util/dom";
import { Html } from "mdast";

export const HtmlNode = Node.create({
    name: 'htmlNode',
    // parseMarkdown: {
    //     match: node => node.type === 'html',
    //     handle(state, node: Html) {
    //         // const el = elementFromString(node.value);
    //         // if(el.firstElementChild && !el.firstElementChild.innerHTML) {
    //         //     el.firstElementChild.innerHTML = 'temp';
    //         //     const slice = DOMParser.fromSchema(this.editor.schema).parseSlice(el);
    //         //     if(slice.content.firstChild?.isText) {
    //         //
    //         //     }
    //         // }
    //         state.top()?.content
    //         const slice = DOMParser.fromSchema(this.editor.schema).parseSlice(el);
    //         slice.content
    //             .forEach((node) => {
    //                 const childNodes: ProsemirrorNode[] = [];
    //                 node.content.forEach((childNode) => {
    //                     childNodes.push(childNode);
    //                 });
    //                 state.addNode(node.type, node.attrs, childNodes);
    //             });
    //     },
    // },
    // toMarkdown(state, node) {
    //     if(this.editor.storage.markdown.options.html) {
    //         state.addNode('html', undefined, node.attrs.value)
    //     } else {
    //         console.warn(`Tiptap Markdown: "${node.type.name}" node is only available in html mode`);
    //     }
    // }
});

// function serializeHTML(node, parent) {
//     const schema = node.type.schema;
//     const html = getHTMLFromFragment(Fragment.from(node), schema);
//
//     if(node.isBlock && (parent instanceof Fragment || parent.type.name === schema.topNodeType.name)) {
//         return formatBlock(html);
//     }
//
//     return html;
// }
//
// /**
//  * format html block as per the commonmark spec
//  */
// function formatBlock(html) {
//     const dom = elementFromString(html);
//     const element = dom.firstElementChild;
//
//     element.innerHTML = element.innerHTML.trim()
//         ? `\n${element.innerHTML}\n`
//         : `\n`;
//
//     return element.outerHTML;
// }

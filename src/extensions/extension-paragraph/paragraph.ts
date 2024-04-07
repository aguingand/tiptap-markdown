import { Node } from "@tiptap/core";
import { serializeText } from "../../util/serialize-text";
import type { Paragraph as MarkdownParagraph } from 'mdast';

const Paragraph = Node.create({
    name: 'paragraph',
});

export default Paragraph.extend({
    // parseMarkdown: {
    //     match: node => node.type === 'paragraph',
    //     handle(state, node: MarkdownParagraph, type) {
    //         state.openNode(type)
    //         if (node.children)
    //             state.next(node.children)
    //         //
    //         // else
    //         //     state.addText((node.value || '') as string)
    //
    //         state.closeNode()
    //     },
    // },
    // toMarkdown(state, node) {
    //     state.openNode('paragraph')
    //     serializeText(state, node)
    //     state.closeNode()
    // },
});

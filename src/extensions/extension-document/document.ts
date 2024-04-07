import { Node } from "@tiptap/core";
import type { Root as MarkdownRoot } from 'mdast';

const Document = Node.create({ name: 'doc' });

export default Document.extend({
    // parseMarkdown: {
    //     match: node => node.type === 'root',
    //     handle(state, node: MarkdownRoot, type) {
    //         state.injectRoot(node, type)
    //     },
    // },
    // toMarkdown(state, node)  {
    //     state.openNode('root')
    //     state.next(node.content)
    // },
})

import { Node } from "@tiptap/core";
import { NodeSchema } from "../../types";


const Document = Node.create({ name: 'document' });

export default Document.extend({
    extendNodeSchema(): NodeSchema {
        return {
            parseMarkdown: {
                match: ({ type }) => type === 'root',
                runner: (state, node, type) => {
                    state.injectRoot(node, type)
                },
            },
            toMarkdown: {
                match: node => node.type.name === 'document',
                runner: (state, node) => {
                    state.openNode('root')
                    state.next(node.content)
                },
            },
        }
    },
})

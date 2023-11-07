import { Node } from "@tiptap/core";
import { NodeSchema } from "../../types";
import { serializeText } from "../../serializer/serialize-text";

const Paragraph = Node.create({
    name: 'paragraph',
});

export default Paragraph.extend({
    extendNodeSchema(): NodeSchema {
        return {
            parseMarkdown: {
                match: node => node.type === 'paragraph',
                runner: (state, node, type) => {
                    state.openNode(type)
                    if (node.children)
                        state.next(node.children)

                    else
                        state.addText((node.value || '') as string)

                    state.closeNode()
                },
            },
            toMarkdown: {
                match: node => node.type.name === 'paragraph',
                runner: (state, node) => {
                    state.openNode('paragraph')
                    serializeText(state, node)
                    state.closeNode()
                },
            },
        }
    }
});

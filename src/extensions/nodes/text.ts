import { Node } from "@tiptap/core";
import { NodeSchema } from "../../types";

const Text = Node.create({
    name: 'text',
});

export default Text.extend({
    extendNodeSchema(): NodeSchema {
        return {
            parseMarkdown: {
                match: ({ type }) => type === 'text',
                runner: (state, node) => {
                    state.addText(node.value as string)
                },
            },
            toMarkdown: {
                match: node => node.type.name === 'text',
                runner: (state, node) => {
                    state.addNode('text', undefined, node.text as string)
                },
            },
        }
    }
});

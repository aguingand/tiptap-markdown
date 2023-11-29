import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";


const OrderedList = Node.create({
    name: 'orderedList',
});

export default OrderedList.extend({
    /**
     * @return {{markdown: MarkdownNodeSpec}}
     */
    addStorage() {
        return {
            markdown: {
                serialize(state,node) {
                    const start = node.attrs.start || 1
                    const maxW = String(start + node.childCount - 1).length
                    const space = state.repeat(" ", maxW + 2)
                    state.renderList(node, space, i => {
                        const nStr = String(start + i)
                        return state.repeat(" ", maxW - nStr.length) + nStr + ". "
                    })
                },
                parse: {
                    // handled by markdown-it
                },
            }
        }
    }
});

import { Mark } from "@tiptap/core";
import { Strong } from "mdast";

const Bold = Mark.create({
    name: 'bold',
});

export default Bold.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            marker: {
                default: '*',
                rendered: false,
            },
        }
    },
    parseMarkdown: {
        match: node => node.type === 'strong',
        handle(state, node: Strong, markType) {
            state.openMark(markType, { marker: node.marker })
            state.next(node.children)
            state.closeMark(markType)
        },
    },
    toMarkdown(state, mark)  {
        state.withMark(mark, 'strong', undefined, {
            marker: mark.attrs.marker,
        })
    },
});

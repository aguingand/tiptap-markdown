import { Mark } from "@tiptap/core";
import { Emphasis } from "mdast";

const Italic = Mark.create({
    name: 'italic',
});

export default Italic.extend({
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
        match: node => node.type === 'emphasis',
        handle(state, node: Emphasis, markType) {
            state.openMark(markType, { marker: node.marker })
            state.next(node.children)
            state.closeMark(markType)
        },
    },
    toMarkdown(state, mark)  {
        state.withMark(mark, 'emphasis', undefined, {
            marker: mark.attrs.marker,
        })
    },
})

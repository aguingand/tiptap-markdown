import { Node } from "@tiptap/core";
import { createMarkdownExtension } from "../../util/extensions";

const Table = Node.create({
    name: 'table',
});

export default createMarkdownExtension(Table, {
    serialize(state, node) {
        node.content.content.forEach((row, i) => {
            row.content.content.forEach((col, j, nodes) => {
                if(j) {
                    state.write(' | ');
                }
                const cellContent = col.content.content[0];
                if(cellContent.textContent.trim()) {
                    state.renderInline(cellContent);
                } else {
                    if(!j) {
                        state.write('| ');
                    } else if(j === nodes.length - 1) {
                        state.write(' |')
                    }
                }
            });
            state.ensureNewLine();
            if(!i) {
                const delimiterRow = row.content.content.map(() => '---').join(' | ');
                state.write(delimiterRow);
                state.ensureNewLine();
            }
        });
        state.closeBlock(node);
    },
    parse: {
        // handled by markdown-it
    },
})

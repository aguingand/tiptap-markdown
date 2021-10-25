import { getHTMLFromFragment, Node } from "@tiptap/core";
import { Fragment } from "prosemirror-model";
import { createMarkdownExtension } from "../../util/extensions";
import { elementFromString } from "../../util/dom";
import Html from './html';

const Table = Node.create({
    name: 'table',
});

export default createMarkdownExtension(Table, {
    serialize(state, node, parent) {
        if(!isMarkdownSerializable(node)) {
            Html.serialize.call(this, state, node, parent);
            return;
        }
        node.forEach((row, p, i) => {
            state.write('| ');
            row.forEach((col, p, j) => {
                if(j) {
                    state.write(' | ');
                }
                const cellContent = col.firstChild;
                if(cellContent.textContent.trim()) {
                    state.renderInline(cellContent);
                }
            });
            state.write(' |')
            state.ensureNewLine();
            if(!i) {
                const delimiterRow = Array.from({ length:row.childCount }).map(() => '---').join(' | ');
                state.write(`| ${delimiterRow} |`);
                state.ensureNewLine();
            }
        });
        state.closeBlock(node);
    },
    parse: {
        // handled by markdown-it
    },
})


function isMarkdownSerializable(node) {
    const html = getHTMLFromFragment(Fragment.from(node), node.type.schema);
    const dom = elementFromString(html);
    const rows = [...dom.querySelectorAll('tr')];

    if(dom.querySelector('[colspan]:not([colspan="1"]), [rowspan]:not([rowspan="1"])')) {
        return false;
    }

    if(rows[0]?.querySelector('td')) {
        return false;
    }

    if(rows.slice(1).some(row => row.querySelector('th'))) {
        return false;
    }

    return true;
}

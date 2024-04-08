import { Node } from "@tiptap/core";
import { gfmTable } from 'micromark-extension-gfm-table'
import { gfmTableFromMarkdown, gfmTableToMarkdown } from "mdast-util-gfm-table";
// import { childNodes } from "../../util/prosemirror.js";

const Table = Node.create({
    name: 'table',
});

export default Table.extend({
    parseMarkdown({ fromMarkdown }) {
        (fromMarkdown.data().micromarkExtensions ??= []).push(gfmTable());
        (fromMarkdown.data().fromMarkdownExtensions ??= []).push(gfmTableFromMarkdown());
    },
    renderMarkdown({ toMarkdown }) {
        (toMarkdown.data().toMarkdownExtensions ??= []).push(gfmTableToMarkdown());
    },
})


// function hasSpan(node) {
//     return node.attrs.colspan > 1 || node.attrs.rowspan > 1;
// }
//
// function isMarkdownSerializable(node) {
//     const rows = childNodes(node);
//     const firstRow = rows[0];
//     const bodyRows = rows.slice(1);
//
//     if(childNodes(firstRow).some(cell => cell.type.name !== 'tableHeader' || hasSpan(cell) || cell.childCount > 1)) {
//         return false;
//     }
//
//     if(bodyRows.some(row =>
//         childNodes(row).some(cell => cell.type.name === 'tableHeader' || hasSpan(cell) || cell.childCount > 1)
//     )) {
//         return false;
//     }
//
//     return true;
// }

import { getHTMLFromFragment } from "@tiptap/core";
import { Fragment } from "prosemirror-model";
import { defaultMarkdownSerializer } from "prosemirror-markdown";


function getHTMLSerializer() {
    return (state, node) => {
        const html = getHTMLFromFragment(Fragment.from(node), node.type.schema);
        state.write(html);
    }
}

function getHTMLFallbackSerializer() {
    return (state, node) => {
        state.write(`[${node.type.name}]`)
    }
}

function getBulletListSerializer({ marker }) {
    return (state, node) => {
        return state.renderList(node, "  ", () => (marker || "*") + " ");
    }
}

function getCodeBlockSerializer() {
    return (state, node) => {
        state.write("```" + (node.attrs.language || "") + "\n");
        state.text(node.textContent, false);
        state.ensureNewLine();
        state.write("```");
        state.closeBlock(node);
    }
}

function getTaskItemSerializer() {
    return (state, node) => {
        const check = node.attrs.checked ? '[x]' : '[ ]';
        state.write(`${check} `);
        state.renderContent(node);
    }
}

function getTableSerializer() {
    return (state, node) => {
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
    }
}

export function getNodes(schema, { html, bulletListMarker = '*' }) {
    const { nodes } = defaultMarkdownSerializer;
    return {
        ...Object.fromEntries(
            Object.entries(schema.nodes).map(([name, node]) => [
                name,
                html ? getHTMLSerializer() : getHTMLFallbackSerializer()
            ])
        ),
        blockquote: nodes.blockquote,
        codeBlock: getCodeBlockSerializer(),
        heading: nodes.heading,
        horizontalRule: nodes.horizontal_rule,
        bulletList: getBulletListSerializer({ marker:bulletListMarker }),
        orderedList: nodes.ordered_list,
        listItem: nodes.list_item,
        taskList: getBulletListSerializer({ marker:bulletListMarker }),
        taskItem: getTaskItemSerializer(),
        paragraph: nodes.paragraph,
        image: nodes.image,
        hardBreak: nodes.hard_break,
        text: nodes.text,
        table: getTableSerializer(),
    }
}

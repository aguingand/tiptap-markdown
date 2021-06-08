import { getHTMLFromFragment } from '@tiptap/core';
import { defaultMarkdownSerializer, MarkdownSerializer } from 'prosemirror-markdown';
import { Fragment } from 'prosemirror-model';


function getHTMLSerializer(schema) {
    return (state, node) => {
        const html = getHTMLFromFragment(Fragment.from(node), schema);
        state.write(html);
    }
}

function getBulletListSerializer(marker) {
    return (state, node) => {
        return state.renderList(node, "  ", () => (marker || "*") + " ");
    }
}

function getNodes(schema, { html, bulletListMarker = '*' }) {
    const { nodes } = defaultMarkdownSerializer;
    return {
        ...Object.fromEntries(
            Object.entries(schema.nodes).map(([name, node]) => [
                name,
                html ? getHTMLSerializer(schema) : (state) => state.write(`[${name}]`)
            ])
        ),
        blockquote: nodes.blockquote,
        codeBlock(state, node) {
            state.write("```" + (node.attrs.language || "") + "\n");
            state.text(node.textContent, false);
            state.ensureNewLine();
            state.write("```");
            state.closeBlock(node);
        },
        heading: nodes.heading,
        horizontalRule: nodes.horizontal_rule,
        bulletList: getBulletListSerializer(bulletListMarker),
        orderedList: nodes.ordered_list,
        listItem: nodes.list_item,
        taskList: getBulletListSerializer(bulletListMarker),
        taskItem(state, node) {
            const check = node.attrs.checked ? '[x]' : '[ ]';
            state.write(`${check} `);
            state.renderContent(node)
        },
        paragraph: nodes.paragraph,
        image: nodes.image,
        hardBreak: nodes.hard_break,
        text: nodes.text,
        table(state, node) {
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
    }
}

function getMarks() {
    const { marks } = defaultMarkdownSerializer;
    return {
        bold: marks.strong,
        italic: marks.em,
        underline: {open:'<u>', close:'</u>'},
        strike: {open:'~~', close:'~~'},
        code: marks.code,
        link: marks.link,
        highlight: {open:'==', close:'=='},
    }
}

export function serialize(schema, content, {
    html,
    tightLists = false,
    bulletListMarker = '*',
} = {}) {
    const nodes = getNodes(schema, {
        html,
        bulletListMarker,
    });
    const marks = getMarks();

    return new MarkdownSerializer(nodes, marks)
        .serialize(content, {
            tightLists,
        });
}


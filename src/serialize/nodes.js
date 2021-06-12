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
        console.warn(`Tiptap Markdown: "${node.type.name}" node is only available in html mode`);
        state.write(`[${node.type.name}]`);
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
        heading: nodes.heading,
        horizontalRule: nodes.horizontal_rule,
        bulletList: getBulletListSerializer({ marker:bulletListMarker }),
        orderedList: nodes.ordered_list,
        listItem: nodes.list_item,
        paragraph: nodes.paragraph,
        image: nodes.image,
        hardBreak: nodes.hard_break,
        text: nodes.text,
    }
}

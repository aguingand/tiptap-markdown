import markdownit from "markdown-it";
import { MarkdownParser, defaultMarkdownParser } from "prosemirror-markdown";


const tokenToNode = {
    blockquote: "blockquote",
    paragraph: "paragraph",
    list_item: "listItem",
    bullet_list: "bulletList",
    ordered_list: "orderedList",
    heading: "heading",
    code_block: "codeBlock",
    fence: "codeBlock",
    hr: "horizontalRule",
    image: "image",
    hardbreak: "hardBreak",
}

const tokenToMark = {
    em: "italic",
    strong: "bold",
    link: "link",
    code_inline: "code",
}

function getTokens(schema) {
    return Object.fromEntries(
        Object.entries(defaultMarkdownParser.tokens)
            .map(([name, definition]) => {
                if(definition.block) {
                    return [name, {
                        ...definition,
                        block: tokenToNode[name]
                    }]
                }
                if(definition.node) {
                    return [name, {
                        ...definition,
                        node: tokenToNode[name]
                    }]
                }
                if(definition.mark) {
                    return [name, {
                        ...definition,
                        mark: tokenToMark[name]
                    }]
                }
            })
            .filter(([name, definition]) => {
                if(definition.block) {
                    return schema.nodes[definition.block];
                }
                if(definition.node) {
                    return schema.nodes[definition.node];
                }
                if(definition.mark) {
                    return schema.marks[definition.mark];
                }
            })
    )
}

export function parse(schema, content) {
    if(typeof content === 'string') {
        const parser = new MarkdownParser(schema, markdownit("commonmark", { html: false }), {
            ...getTokens(schema)
        });
        return parser.parse(content).toJSON();
    }
    return content;
}

import markdownit from "markdown-it";
import { MarkdownParser, defaultMarkdownParser } from "prosemirror-markdown";
import { DOMParser } from "prosemirror-model";

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
    table: "table",
    tr: "tableRow",
    th: "tableHeader",
    td: "tableCell",
}

const tokenToMark = {
    em: "italic",
    strong: "bold",
    s: "strike",
    link: "link",
    code_inline: "code",
}

function getTokens(schema) {
    const defaultTokens = Object.fromEntries(
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

    );
    const tokens = {
        ...defaultTokens,
        s: { mark:tokenToMark.s },
        html_inline: {
            getAttrs: (tok) => {
                console.log(tok);
            }
        }
    };

    return Object.fromEntries(
        Object.entries(tokens).filter(([name, definition]) => {
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
    );
}

function elementFromString(value) {
    // add a wrapper to preserve leading and trailing whitespace
    const wrappedValue = `<body>${value}</body>`

    return new window.DOMParser().parseFromString(wrappedValue, 'text/html').body
}

export function parse(schema, content) {
    if(typeof content === 'string') {
        const parser = new MarkdownParser(schema, markdownit("commonmark", { html: true }), {
            ...getTokens(schema)
        });
        const htmlParser = DOMParser.fromSchema(schema);
        parser.tokenHandlers.inline = (state, token, tokens) => {
            const toks = token.children;
            for (let i = 0; i < toks.length; i++) {
                let tok = toks[i]
                let htmlContent = '';
                if(tok.type === 'html_inline') {
                    htmlContent += tok.content;
                    do {
                        tok = toks[++i];
                        htmlContent += tok.content;
                    } while (tok.type !== 'html_inline');
                    const doc = htmlParser.parse(elementFromString(htmlContent));
                    const node = doc.content.content[0].content.content[0];
                    state.push(node);
                    continue;
                }
                let handler = state.tokenHandlers[tok.type]
                if (!handler)
                    throw new Error("Token type `" + tok.type + "` not supported by Markdown parser")
                handler(state, tok, toks, i);
            }
        }
        parser.tokenHandlers.html_inline = () => {}
        return parser.parse(content).toJSON();
    }
    return content;
}

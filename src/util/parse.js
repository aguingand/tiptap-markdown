import markdownit from "markdown-it";
import { MarkdownParser, defaultMarkdownParser } from "prosemirror-markdown";
import { DOMParser } from "prosemirror-model";
import { isVoidElement } from "./dom";

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
        fence: {
            ...defaultTokens.fence,
            getAttrs: tok => ({ language: tok.info || null }),
        },
        s: { mark:tokenToMark.s },
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

function handleHtmlInline(state, tokens, index) {
    const htmlParser = DOMParser.fromSchema(state.schema);
    const elementStack = [];
    let htmlContent = '';
    let i = index;

    for (; i < tokens.length; i++) {
        let tok = tokens[i];
        htmlContent += tok.content;

        if(tok.type === 'html_inline') {
            const match = tok.content.match(/<([^\/\s>]+)/);
            if(match) {
                const tagName = match[1];
                if(!isVoidElement(tagName)) {
                    elementStack.push(tagName);
                }
            } else {
                elementStack.pop();
            }
        }

        if(!elementStack.length) {
            break;
        }
    }

    const doc = htmlParser.parse(elementFromString(htmlContent));
    const nodes = doc.content.content[0];

    nodes.forEach(node => {
        state.push(node);
    });

    return i;
}


function handleInline(state, token, tokens) {
    const toks = token.children;

    for (let i = 0; i < toks.length; i++) {
        let tok = toks[i]

        if(tok.type === 'html_inline') {
            i = handleHtmlInline(state, toks, i);
            continue;
        }

        const handler = state.tokenHandlers[tok.type]
        if (!handler)
            throw new Error("Token type `" + tok.type + "` not supported by Markdown parser")
        handler(state, tok, toks, i);
    }
}

function parseDOMNode(parser, domNode) {
    const htmlParser = DOMParser.fromSchema(parser.schema);

    const parts = [...domNode.childNodes]
        .map(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                return {
                    type: 'inline',
                    content: node.textContent,
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const tokens = parser.tokenizer.parse(node.outerHTML, {});
                if (tokens[0].type === 'paragraph_open') {
                    return {
                        type: 'inline',
                        content: node.outerHTML,
                        node,
                    }
                } else if (tokens[0].type === 'html_block') {
                    return {
                        type: 'block',
                        content: node.outerHTML,
                        node,
                    }
                }
            }
        })
        .reduce((res, part) => {
            const lastPart = res[res.length - 1];
            if(lastPart?.type === 'inline' && part.type === 'inline') {
                lastPart.content += part.content;
                return res;
            }
            return [...res, {...part}];
        }, []);

    const parsed = parts
        .reduce((res, part) => {
            const doc = part.type === 'block'
                ? htmlParser.parse(part.node)
                : parser.parse(part.content);
            if(!res) {
                return doc;
            }
            res.content.content.push(...doc.content.content);
            return res;
        }, null);

    return parsed;
}

export function parse(schema, content, { html }) {
    if(typeof content === 'string') {
        const tokenizer = markdownit({ html });
        const parser = new MarkdownParser(schema, tokenizer, {
            ...getTokens(schema)
        });
        parser.tokenHandlers.inline = handleInline;
        parser.tokenHandlers.html_inline = () => {}; // handle in inline
        parser.tokenHandlers.html_block = () => {};

        return parseDOMNode(parser, elementFromString(content)).toJSON();
    }
    return content;
}

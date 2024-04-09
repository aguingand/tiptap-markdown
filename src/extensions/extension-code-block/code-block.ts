import { Node } from "@tiptap/core";
import { CodeBlockOptions } from "@tiptap/extension-code-block";
import remarkRehype from "remark-rehype";
import rehypeRemark from "rehype-remark";
import { defaultHandlers as remarkRehypeDefaultHandlers } from "mdast-util-to-hast";
import { defaultHandlers as rehypeRemarkDefaultHandlers } from "hast-util-to-mdast";
import { Element } from "hast";
import { Code } from "mdast";

const CodeBlock = Node.create<CodeBlockOptions>({
    name: 'codeBlock',
});

export default CodeBlock.extend({
    parseMarkdown({ toHTML }) {
        toHTML.use(remarkRehype, {
            handlers: {
                code: (state, node) => {
                    const element = remarkRehypeDefaultHandlers.code(state, node);
                    if(node.lang) {
                        (element.children[0] as Element).properties.className = [this.options.languageClassPrefix + node.lang];
                    }
                    return element;
                }
            }
        });
    },
    renderMarkdown({ toMarkdown }) {
        toMarkdown.use(rehypeRemark, {
            handlers: {
                pre: (state, element) => {
                    const node: Code = rehypeRemarkDefaultHandlers.pre(state, element);
                    if(!node.lang) {

                    }
                    return node;
                }
            }
        })
    },
});

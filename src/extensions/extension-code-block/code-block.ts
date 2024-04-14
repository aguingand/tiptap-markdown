import type { CodeBlock } from "@tiptap/extension-code-block";
import remarkRehype from "remark-rehype";
import rehypeRemark from "rehype-remark";
import { defaultHandlers as remarkRehypeDefaultHandlers } from "mdast-util-to-hast";
import { defaultHandlers as rehypeRemarkDefaultHandlers } from "hast-util-to-mdast";
import { Element } from "hast";
import { Code } from "mdast";
import { NodeMixin } from "../load-mixins/types";

export const codeBlock: NodeMixin<typeof CodeBlock> = (CodeBlock) => (
    CodeBlock.extend({
        parseMarkdown({ toHTML }) {
            toHTML.use(remarkRehype, {
                handlers: {
                    code: (state, node: Code) => {
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
                        node.lang ??= ((element.children.find(child => child.type === 'element' && child.tagName === 'code') as Element)
                            ?.properties
                            ?.className as string[])
                            ?.find(c => c.startsWith(this.options.languageClassPrefix))
                            ?.replace(this.options.languageClassPrefix, '');
                        return node;
                    }
                }
            })
        },
    })
);

import { Node } from "@tiptap/core";
import { MarkdownNode } from "../../util/extensions";

const CodeBlock = Node.create({
    name: 'codeBlock',
});

export default MarkdownNode.create(CodeBlock, {
    serialize(state, node) {
        state.write("```" + (node.attrs.language || "") + "\n");
        state.text(node.textContent, false);
        state.ensureNewLine();
        state.write("```");
        state.closeBlock(node);
    },
    parse: {
        setup(markdownit) {
            markdownit.set({
                langPrefix: this.options?.languageClassPrefix ?? 'language-',
            });
        },
        updateDOM(element) {
            element.innerHTML = element.innerHTML.replace(/\n<\/code><\/pre>/g, '</code></pre>')
        },
    },
});

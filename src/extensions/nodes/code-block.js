import { Node } from "@tiptap/core";
import { createMarkdownExtension } from "../../util/extensions";

const CodeBlock = Node.create({
    name: 'codeBlock',
});

export default createMarkdownExtension(CodeBlock, {
    serialize(state, node) {
        state.write("```" + (node.attrs.language || "") + "\n");
        state.text(node.textContent, false);
        state.ensureNewLine();
        state.write("```");
        state.closeBlock(node);
    },
    parse: {
        // handled by markdown-it
    },
});

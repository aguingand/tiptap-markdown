import { MarkdownNode } from "tiptap-markdown";
import markdownitContainer from "markdown-it-container";
import { Container } from "./container";

export const MarkdownContainer = MarkdownNode.create(Container, {
    serialize(state, node) {
        state.write("::: " + (node.attrs.containerClass || "") + "\n");
        state.renderContent(node);
        state.flushClose(1);
        state.write(":::");
        state.closeBlock(node);
    },
    parse: {
        setup(markdownit) {
            this.options.classes.forEach(className => {
                markdownit.use(markdownitContainer, className);
            });
        },
    }
});

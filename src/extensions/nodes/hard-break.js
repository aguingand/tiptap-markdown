import { Node } from "@tiptap/core";
import { defaultMarkdownSerializer } from "prosemirror-markdown";


const HardBreak = Node.create({
    name: 'hardBreak',
});

export default HardBreak.extend({
    /**
     * @return {{markdown: MarkdownNodeSpec}}
     */
    addStorage() {
        return {
            markdown: {
                serialize: defaultMarkdownSerializer.nodes.hard_break,
                parse: {
                    updateDOM(element) {
                        // remove extra \n inserted by markdown-it as it add space in some cases
                        // (https://github.com/aguingand/tiptap-markdown/issues/28)
                        element.innerHTML = element.innerHTML.replace(/<br>\n/g, '<br>');
                    }
                },
            }
        }
    }
});

import { Node } from "@tiptap/core";
import remarkRehype from "remark-rehype";
import { remarkRehypeListItemHandlers } from "../../remark-plugins/lists";

const ListItem = Node.create({
    name: 'listItem',
});


export default ListItem.extend({
    parseMarkdown({ toHTML }) {
        toHTML.use(remarkRehype, {
            handlers: remarkRehypeListItemHandlers,
        });
    },
    renderMarkdown() {
        // handled by remark
    },
});

import { Node } from "@tiptap/core";
import remarkRehype from "remark-rehype";
import { rehypeRemarkListItemHandlers, remarkRehypeListItemHandlers } from "../../remark-plugins/lists";
import rehypeRemark from "rehype-remark";

const ListItem = Node.create({
    name: 'listItem',
});


export default ListItem.extend({
    parseMarkdown({ toHTML }) {
        toHTML.use(remarkRehype, {
            handlers: remarkRehypeListItemHandlers,
        });
    },
    renderMarkdown({ toMarkdown }) {
        // toMarkdown.use(rehypeRemark, {
        //     handlers: rehypeRemarkListItemHandlers,
        // });
    },
});

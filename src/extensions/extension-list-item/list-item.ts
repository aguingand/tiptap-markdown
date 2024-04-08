import { Node } from "@tiptap/core";
import remarkRehype from "remark-rehype";
import rehypeRemark from "rehype-remark";
import { defaultHandlers as remarkRehypeDefaultHandlers } from "mdast-util-to-hast";
import { defaultHandlers as rehypeRemarkDefaultHandlers } from "hast-util-to-mdast";
import { ListItem } from 'mdast';

const ListItem = Node.create({
    name: 'listItem',
});

// used by task item
export const listItemRemarkRehypeHandlers: Pick<typeof remarkRehypeDefaultHandlers, 'listItem'> = {
    listItem(state, node: ListItem, parent) {
        return remarkRehypeDefaultHandlers.listItem(state, node, parent);
    }
}

export default ListItem.extend({
    parseMarkdown({ toHTML }) {
        toHTML.use(remarkRehype, {
            handlers: listItemRemarkRehypeHandlers,
        })
    },
    renderMarkdown() {
        // handled by remark
    },
});

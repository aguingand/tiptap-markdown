import { Node } from "@tiptap/core";
import remarkRehype from "remark-rehype";
import rehypeRemark from "rehype-remark";
import { remarkRehypeListHandlers } from "../../remark-plugins/lists";
import { defaultHandlers as rehypeRemarkDefaultHandlers } from "hast-util-to-mdast";
import { maybeTightList } from "../markdown-tight-lists/markdown-tight-lists";


const OrderedList = Node.create({
    name: 'orderedList',
});


export default OrderedList.extend({
    parseMarkdown({ toHTML }) {
        toHTML.use(remarkRehype, {
            handlers: remarkRehypeListHandlers,
        });
    },
    renderMarkdown({ toMarkdown }) {
        toMarkdown.use(rehypeRemark, {
            handlers: {
                ol(state, element) {
                    return maybeTightList(element, rehypeRemarkDefaultHandlers.ol(state, element));
                },
            },
        });
    },
});

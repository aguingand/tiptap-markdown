import { Node } from "@tiptap/core";
import remarkRehype from "remark-rehype";
import rehypeRemark from "rehype-remark";
import { rehypeRemarkBulletListHandlers, remarkRehypeListHandlers } from "../../remark-plugins/lists";


const TaskList = Node.create({
    name: 'taskList',
});

export default TaskList.extend({
    parseMarkdown({ toHTML }) {
        toHTML.use(remarkRehype, {
            handlers: remarkRehypeListHandlers,
        });
    },
    renderMarkdown({ toMarkdown }) {
        toMarkdown.use(rehypeRemark, {
            handlers: rehypeRemarkBulletListHandlers,
        });
    },
});

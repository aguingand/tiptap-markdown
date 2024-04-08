import remarkRehype from "remark-rehype";
import { Node } from "@tiptap/core";
import { remarkRehypeListHandlers } from "../../remark-plugins/lists";



const TaskList = Node.create({
    name: 'taskList',
});

export default TaskList.extend({
    parseMarkdown({ toHTML }) {
        toHTML.use(remarkRehype, {
            handlers: remarkRehypeListHandlers,
        });
    },
});

import { Node } from "@tiptap/core";
import remarkRehype, { defaultHandlers } from "remark-rehype";
import rehypeRemark from "rehype-remark";
import { defaultHandlers as remarkRehypeDefaultHandlers } from "mdast-util-to-hast";
import { List } from "mdast";


const TaskList = Node.create({
    name: 'taskList',
});

export default TaskList.extend({
    parseMarkdown({ toHTML }) {
        toHTML.use(remarkRehype, {
            handlers: toHTML.data().withHandlers<List>((handlers) => ({
                list: (state, node) => {
                    const element = handlers.list(state, node);

                    if((element.properties.className as string[])?.[0] === 'contains-task-list') {
                        element.properties.dataType = 'taskList';
                    }

                    return element;
                }
            })),
        });
    },
    renderMarkdown({ toMarkdown }) {
        // handled by remark
    },
});

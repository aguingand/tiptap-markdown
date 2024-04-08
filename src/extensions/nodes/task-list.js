import taskListPlugin from "markdown-it-task-lists";
import { Node } from "@tiptap/core";
// import BulletList from "../extension-bullet-list/bullet-list.ts";


const TaskList = Node.create({
    name: 'taskList',
});

export default TaskList.extend({
    /**
     * @return {{markdown: MarkdownNodeSpec}}
     */
    addStorage() {
        return {
            markdown: {
                // serialize: BulletList.storage.markdown.serialize,
                // parse: {
                //     setup(markdownit) {
                //         markdownit.use(taskListPlugin);
                //     },
                //     updateDOM(element) {
                //         [...element.querySelectorAll('.contains-task-list')]
                //             .forEach(list => {
                //                 list.setAttribute('data-type', 'taskList');
                //             });
                //     },
                // }
            }
        }
    }
});

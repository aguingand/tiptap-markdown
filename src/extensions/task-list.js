import taskListPlugin from "markdown-it-task-lists";
import { Node } from "@tiptap/core";
import { createMarkdownExtension } from "../util/extensions";
import BulletList from "./bullet-list";


const TaskList = Node.create({
    name: 'taskList',
});

export default createMarkdownExtension(TaskList, {
    serialize: BulletList.serialize,
    parse: {
        setup(markdownit) {
            markdownit.use(taskListPlugin);
        },
        updateDOM(element) {
            [...element.querySelectorAll('.contains-task-list')]
                .forEach(list => {
                    list.setAttribute('data-type', 'taskList');
                });
        },
    }
});

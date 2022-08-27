import taskListPlugin from "markdown-it-task-lists";
import { Node } from "@tiptap/core";
import { MarkdownNode } from "../../util/extensions";
import BulletList from "./bullet-list";


const TaskList = Node.create({
    name: 'taskList',
});

export default MarkdownNode.create(TaskList, {
    serialize: BulletList.spec.serialize,
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

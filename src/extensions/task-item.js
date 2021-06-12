import { Node } from "@tiptap/core";
import { createMarkdownExtension } from "../util/extensions";

const TaskItem = Node.create({
    name: 'taskItem',
});

export default createMarkdownExtension(TaskItem, {
    serialize(state, node) {
        const check = node.attrs.checked ? '[x]' : '[ ]';
        state.write(`${check} `);
        state.renderContent(node);
    },
    parse: {
        updateDOM(element) {
            [...element.querySelectorAll('.task-list-item')]
                .forEach(item => {
                    const input = item.querySelector('input');
                    item.setAttribute('data-type', 'taskItem');
                    if(input) {
                        item.setAttribute('data-checked', input.checked);
                        input.remove();
                    }
                });
        },
    }
})

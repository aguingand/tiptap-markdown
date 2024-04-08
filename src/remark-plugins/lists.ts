import { defaultHandlers as remarkRehypeDefaultHandlers, Handlers as RemarkRehypeHandlers } from "mdast-util-to-hast";
import { ListItem } from "mdast";


export const remarkRehypeListHandlers: RemarkRehypeHandlers = {
    list(state, node) {
        const element = remarkRehypeDefaultHandlers.list(state, node);

        if((element.properties.className as string[])?.[0] === 'contains-task-list') {
            element.properties.dataType = 'taskList';
        }

        return element;
    }
}

export const remarkRehypeListItemHandlers: RemarkRehypeHandlers = {
    listItem(state, node: ListItem, parent) {
        const element = remarkRehypeDefaultHandlers.listItem(state, node, parent);

        if(typeof node.checked === 'boolean') {
            element.properties.dataType = 'taskItem';
            element.properties.dataChecked = node.checked ? 'true' : 'false';
        }

        return element;
    }
}

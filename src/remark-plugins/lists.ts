import { defaultHandlers as remarkRehypeDefaultHandlers, Handlers as RemarkRehypeHandlers } from "mdast-util-to-hast";
import { defaultHandlers as rehypeRemarkDefaultHandlers } from "hast-util-to-mdast";
import { ListItem } from "mdast";
import { maybeTightList } from "../extensions/markdown-tight-lists/markdown-tight-lists";


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

export const rehypeRemarkBulletListHandlers: Partial<typeof rehypeRemarkDefaultHandlers> = {
    ul(state, element) {
        return maybeTightList(element, rehypeRemarkDefaultHandlers.ul(state, element));
    },
}

export const rehypeRemarkListItemHandlers: Partial<typeof rehypeRemarkDefaultHandlers> = {
    li(state, element) {
        const item = rehypeRemarkDefaultHandlers.li(state, {
            ...element,
            children: element.properties.dataType === 'taskItem'
                ? element.children.slice(1)
                : element.children,
        });

        if(element.properties.dataType === 'taskItem') {
            item.checked = element.properties.dataChecked === 'true';
        }

        return item;
    },
}

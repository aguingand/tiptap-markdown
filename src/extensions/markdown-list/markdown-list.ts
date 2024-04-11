import { Node } from "@tiptap/core";
import remarkRehype from "remark-rehype/lib";
import { defaultHandlers as remarkRehypeDefaultHandlers } from "mdast-util-to-hast";
import { Element } from "hast";
import { List } from "mdast";


// here we create a comme extension tha will handle all lists
export const MarkdownList = Node.create({
    name: 'markdownList',
    parseMarkdown({ fromMarkdown, toHTML }) {
        toHTML.use(remarkRehype, {
            handlers: {
                list(state, node) {
                    const element = remarkRehypeDefaultHandlers.list(state, node);

                    toHTML.data().listHandlers?.forEach(listHandler => {
                        listHandler(element, node);
                    });

                    return element;
                }
            },
        })
    }
});


declare module 'unified' {
    interface Data {
        listHandlers?: Array<(element: Element, node: List) => void>
    }
}

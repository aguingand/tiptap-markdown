import { Extension } from "@tiptap/core";
import { Element } from "hast";
import { List } from "mdast";
import { MarkdownStorage } from "../../Markdown";

export function maybeTightList(element: Element, markdownNode: List) {
    if(element.properties.dataTight === 'true') {
        markdownNode.spread = false;
        markdownNode.children.forEach(listItem => {
            listItem.spread = false;
        });
    }
    return markdownNode;
}

export const MarkdownTightLists = Extension.create({
    name: 'markdownTightLists',
    priority: 100,
    addOptions: () => ({
        listTypes: [
            'bulletList',
            'orderedList',
            'taskList',
        ],
    }),
    addGlobalAttributes() {
        return [
            {
                types: this.options.listTypes,
                attributes: {
                    tight: {
                        default: (this.editor.storage.markdown as MarkdownStorage).options.tightLists,
                        parseHTML: element =>
                            element.getAttribute('data-tight') === 'true' || !element.querySelector('p'),
                        renderHTML: attributes => ({
                            class: attributes.tight ? (this.editor.storage.markdown as MarkdownStorage).tightClass : null,
                            'data-tight': attributes.tight ? 'true' : null,
                        }),
                    },
                },
            },
        ]
    },
    addCommands() {
        return {
            toggleTight: (tight = null) => ({ editor, commands }) => {
                function toggleTight(name) {
                    if(!editor.isActive(name)) {
                        return false;
                    }
                    const attrs = editor.getAttributes(name);
                    return commands.updateAttributes(name, {
                        tight: tight ?? !attrs?.tight,
                    });
                }
                return this.options.listTypes
                    .some(name => toggleTight(name));
            }
        }
    },
});

import { Command, Extension } from "@tiptap/core";
import { Element } from "hast";
import { List } from "mdast";

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
        tight: true,
        tightClass: 'tight',
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
                        default: this.options.tight,
                        parseHTML: element =>
                            element.getAttribute('data-tight') === 'true' || !element.querySelector('p'),
                        renderHTML: attributes => ({
                            class: attributes.tight ? this.options.tightClass : null,
                            'data-tight': attributes.tight ? 'true' : null,
                        }),
                    },
                },
            },
        ]
    },
    addCommands() {
        return {
            toggleTight: (tight?: boolean) => ({ editor, commands }) => {
                function toggleTight(name: string) {
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

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        markdownTightLists: {
            toggleTight: () => ReturnType
        }
    }
}

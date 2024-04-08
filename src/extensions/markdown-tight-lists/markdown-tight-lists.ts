import { Extension } from "@tiptap/core";

export const MarkdownTightLists = Extension.create({
    name: 'markdownTightLists',
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

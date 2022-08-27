import { Node } from '@tiptap/core';

export const Container = Node.create({
    name: 'container',

    group: 'block',

    content: 'block+',

    defining: true,

    addOptions() {
        return {
            classes: ['info', 'warning', 'danger'],
        }
    },

    addAttributes() {
        return {
            containerClass: {
                default: null,
                parseHTML: element => [...element.classList].find(className => this.options.classes.includes(className)),
                renderHTML: attributes => ({
                    'class': attributes.containerClass,
                }),
            }
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div',
                getAttrs: element => {
                    return [...element.classList].find(className => this.options.classes.includes(className)) ? null : false
                },
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', HTMLAttributes, 0]
    },
});

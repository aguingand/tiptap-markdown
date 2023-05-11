import { Node } from '@tiptap/core';
import markdownitContainer from "markdown-it-container";

export default Node.create({
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

    addStorage() {
        return {
            markdown: {
                serialize(state, node) {
                    state.write("::: " + (node.attrs.containerClass || "") + "\n");
                    state.renderContent(node);
                    state.flushClose(1);
                    state.write(":::");
                    state.closeBlock(node);
                },
                parse: {
                    setup(markdownit) {
                        this.options.classes.forEach(className => {
                            markdownit.use(markdownitContainer, className);
                        });
                    },
                }
            }
        }
    },
});

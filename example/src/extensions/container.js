import { Node } from '@tiptap/core';
import markdownitContainer from 'markdown-it-container';
import { createMarkdownExtension } from 'tiptap-markdown';

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

/**
 * @param {Node} Container
 * @returns {MarkdownExtension}
 */
export function containerMarkdownExtension(Container) {
    return createMarkdownExtension(Container, {
        serialize(state, node) {
            state.write("::: " + (node.attrs.containerClass || "") + "\n")
            state.renderContent(node)
            state.ensureNewLine()
            state.write(":::")
            state.closeBlock(node)
        },
        parse: {
            setup(markdownit) {
                console.log(this);
                Container.options.classes.forEach(className => {
                    markdownit.use(markdownitContainer, className);
                });
            },
        }
    });
}

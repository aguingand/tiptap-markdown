import { MarkdownSerializerState } from './state';
import HTMLMark from "../extensions/marks/html";
import HTMLNode from "../extensions/nodes/html";


export class MarkdownSerializer {
    /**
     * @type {MarkdownEditor}
     */
    editor = null;

    constructor(editor) {
        this.editor = editor;
    }

    serialize(content) {
        const state = new MarkdownSerializerState(this.nodes, this.marks);

        state.renderContent(content);

        return state.out;
    }

    get nodes() {
        const htmlNode = this.editor.markdownExtensions.find(extension => extension.is(HTMLNode));

        return {
            ...Object.fromEntries(
                Object.keys(this.editor.schema.nodes)
                    .map(name => [name, htmlNode.serialize])
            ),
            ...Object.fromEntries(
                this.editor.markdownExtensions
                    .filter(extension => extension.type === 'node' && extension.serialize)
                    .map(extension => [extension.name, extension.serialize])
                ?? []
            ),
        }
    }

    get marks() {
        const htmlMark = this.editor.markdownExtensions.find(extension => extension.is(HTMLMark));

        return {
            ...Object.fromEntries(
                Object.keys(this.editor.schema.marks)
                    .map(name => [name, htmlMark.serialize])
            ),
            ...Object.fromEntries(
                this.editor.markdownExtensions
                    .filter(extension => extension.type === 'mark')
                    .map(extension => [extension.name, extension.serialize])
                ?? []
            ),
        }
    }
}


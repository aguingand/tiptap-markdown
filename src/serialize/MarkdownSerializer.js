import { MarkdownSerializerState } from './state';
import HTMLMark from "../extensions/marks/html";
import HTMLNode from "../extensions/nodes/html";
import { getMarkdownConfig } from "../util/extensions";


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
        return {
            ...Object.fromEntries(
                Object.keys(this.editor.schema.nodes)
                    .map(name => [name, this.serializeNode(HTMLNode)])
            ),
            ...Object.fromEntries(
                this.editor.extensionManager.extensions
                    .filter(extension => extension.type === 'node' && this.serializeNode(extension))
                    .map(extension => [extension.name, this.serializeNode(extension)])
                ?? []
            ),
        };
    }

    get marks() {
        return {
            ...Object.fromEntries(
                Object.keys(this.editor.schema.marks)
                    .map(name => [name, this.serializeMark(HTMLMark)])
            ),
            ...Object.fromEntries(
                this.editor.extensionManager.extensions
                    .filter(extension => extension.type === 'mark' && this.serializeMark(extension))
                    .map(extension => [extension.name, this.serializeMark(extension)])
                ?? []
            ),
        };
    }

    serializeNode(node) {
        return getMarkdownConfig(node)?.serialize?.bind({ editor: this.editor, options: node.options });
    }

    serializeMark(mark) {
        const serialize = getMarkdownConfig(mark)?.serialize;
        return serialize
            ? {
                open: typeof serialize.open === 'function' ? serialize.open.bind({ editor: this.editor, options: mark.options }) : serialize.open,
                close: typeof serialize.close === 'function' ? serialize.close.bind({ editor: this.editor, options: mark.options }) : serialize.close,
            }
            : null
    }
}


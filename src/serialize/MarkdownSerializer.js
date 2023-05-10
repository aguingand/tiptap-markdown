import { MarkdownSerializerState } from './state';
import HTMLMark from "../extensions/marks/html";
import HTMLNode from "../extensions/nodes/html";
import {resolveLazyExtensionName} from "../util/extensions";


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
        return this.bindNodes({
            ...Object.fromEntries(
                Object.keys(this.editor.schema.nodes)
                    .map(name => [name, this.editor.storage.markdownHTMLNode.markdown.serialize.bind({ editor: this.editor })])
            ),
            ...Object.fromEntries(
                this.editor.extensionManager.extensions
                    .filter(extension => extension.type === 'node' && extension.storage?.markdown?.serialize)
                    .map(extension => [resolveLazyExtensionName(extension.name), extension.storage.markdown.serialize])
                ?? []
            ),
        });
    }

    get marks() {
        return this.bindMarks({
            ...Object.fromEntries(
                Object.keys(this.editor.schema.marks)
                    .map(name => [name, this.editor.storage.markdownHTMLMark.markdown.serialize])
            ),
            ...Object.fromEntries(
                this.editor.extensionManager.extensions
                    .filter(extension => extension.type === 'mark' && extension.storage?.markdown?.serialize)
                    .map(extension => [resolveLazyExtensionName(extension.name), extension.storage.markdown.serialize])
                ?? []
            ),
        });
    }

    bindNodes(nodes) {
        return Object.fromEntries(
            Object.entries(nodes).map(([name, serialize]) => [
                name,
                serialize.bind({ editor: this.editor })
            ])
        );
    }

    bindMarks(marks) {
        return Object.fromEntries(
            Object.entries(marks).map(([name, serialize]) => [
                name,
                {
                    open: typeof serialize.open === 'function' ? serialize.open.bind({ editor: this.editor }) : serialize.open,
                    close: typeof serialize.close === 'function' ? serialize.close.bind({ editor: this.editor }) : serialize.close,
                }
            ])
        );
    }
}


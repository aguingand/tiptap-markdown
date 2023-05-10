import { MarkdownSerializerState } from './state';
import HTMLMark from "../extensions/marks/html";
import HTMLNode from "../extensions/nodes/html";
import {resolveLazyExtensionName} from "../util/extensions";
import markdownExtensions from "../extensions";

function getSerialize(extension) {
    return extension.storage?.markdown?.serialize
        ?? markdownExtensions.find(e => e.name === extension.name)?.storage.markdown.serialize;
}

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
                    .map(name => [name, HTMLNode.storage.markdown.serialize])
            ),
            ...Object.fromEntries(
                this.editor.extensionManager.extensions
                    .filter(extension => extension.type === 'node' && getSerialize(extension))
                    .map(extension => [extension.name, getSerialize(extension)])
                ?? []
            ),
        });
    }

    get marks() {
        return this.bindMarks({
            ...Object.fromEntries(
                Object.keys(this.editor.schema.marks)
                    .map(name => [name, HTMLMark.storage.markdown.serialize])
            ),
            ...Object.fromEntries(
                this.editor.extensionManager.extensions
                    .filter(extension => extension.type === 'mark' && getSerialize(extension))
                    .map(extension => [extension.name, getSerialize(extension)])
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


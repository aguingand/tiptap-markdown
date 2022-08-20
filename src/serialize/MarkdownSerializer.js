import { MarkdownSerializerState } from './state';
import { getMarks } from "./marks";
import { getNodes } from "./nodes";


export class MarkdownSerializer {
    /**
     * @type {MarkdownEditor}
     */
    editor = null;

    constructor(editor) {
        this.editor = editor;
    }

    serialize(content) {
        const nodes = getNodes(this.editor.schema, this.editor.markdownExtensions);
        const marks = getMarks(this.editor.schema, this.editor.markdownExtensions);
        const state = new MarkdownSerializerState(nodes, marks);

        state.renderContent(content);

        return state.out;
    }
}


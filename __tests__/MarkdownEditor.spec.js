import { Editor } from "@tiptap/core";
import { createMarkdownEditor } from "../src/MarkdownEditor";
import StarterKit from "@tiptap/starter-kit";

const MarkdownEditor = createMarkdownEditor(Editor);

function getParsedNode(content) {
    const editor = new MarkdownEditor({
        content,
        extensions: [
            StarterKit,
        ],
    });
    return editor.state.doc.firstChild;
}

describe('MarkdownEditor', () => {
    describe('bullet list', () => {
        test('tight', () => {
            expect(getParsedNode(`* example1\n* example2`).attrs)
                .toMatchObject({
                    tight: true,
                });
        });

        test('tight html', () => {
            expect(getParsedNode(`<ul data-tight="true"><li><p>example1</p></li><li><p>example2</p></li></ul>`).attrs)
                .toMatchObject({
                    tight: true,
                });
        });

        test('loose', () => {
            expect(getParsedNode(`* example1\n\n* example2`).attrs)
                .toMatchObject({
                    tight: false,
                });
        });

        test('loose html', () => {
            expect(getParsedNode(`<ul><li><p>example1</p></li><li><p>example2</p></li></ul>`).attrs)
                .toMatchObject({
                    tight: false,
                });
        });
    });
    describe('ordered list', () => {
        test('tight', () => {
            expect(getParsedNode(`1. example1\n2. example2`).attrs).toMatchObject({
                tight: true,
            });
        });

        test('loose', () => {
            expect(getParsedNode(`1. example1\n\n2. example2`).attrs).toMatchObject({
                tight: false,
            });
        });
    });
});

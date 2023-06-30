import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "../src/Markdown";
import Bold from "@tiptap/extension-bold";
import { Selection } from 'prosemirror-state';


describe('Markdown', () => {
    describe('commands', () => {
        test('setContent', () => {
            const editor = new Editor({
                extensions: [
                    Markdown,
                    StarterKit,
                ],
            });
            editor.commands.setContent('**example**');
            expect(editor.getHTML()).toBe('<p><strong>example</strong></p>');
        });
        describe('insertContentAt', () => {
            test('basic', () => {
                const editor = new Editor({
                    extensions: [
                        Markdown,
                        StarterKit,
                    ],
                });
                editor.commands.insertContentAt(Selection.atEnd(editor.state.doc), '**example**');
                expect(editor.getHTML()).toBe('<p><strong>example</strong></p>');
            });
            test('bullet list', () => {
                const editor = new Editor({
                    content: '- example1',
                    extensions: [
                        Markdown.configure({
                            tightListClass: null,
                        }),
                        StarterKit,
                    ],
                });
                editor.commands.insertContentAt(Selection.atEnd(editor.state.doc), '- example2\n  1. example3');
                expect(editor.getHTML()).toMatchSnapshot();
            });
            test('ordered list', () => {
                const editor = new Editor({
                    content: '1. example1',
                    extensions: [
                        Markdown.configure({
                            tightListClass: null,
                        }),
                        StarterKit,
                    ],
                });
                editor.commands.insertContentAt(Selection.atEnd(editor.state.doc), '  - example3');
                expect(editor.getHTML()).toMatchSnapshot();
            });
        });
    });
    test('getMarkdown', () => {
        const editor = new Editor({
            content: '<p><strong>example</strong></p>',
            extensions: [
                Markdown,
                StarterKit,
            ],
        });
        expect(editor.storage.markdown.getMarkdown()).toBe('**example**');
    });
    test('override default extension', () => {
        const editor = new Editor({
            content: '<p><strong>example</strong></p>',
            extensions: [
                Markdown,
                StarterKit.configure({ bold: false }),
                Bold.extend({
                    addStorage() {
                        return {
                            markdown: {
                                serialize: { open: '***', close: '***' },
                            }
                        }
                    }
                }),
            ],
        });
        expect(editor.storage.markdown.getMarkdown()).toBe('***example***');
    });
});

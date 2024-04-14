import { describe, test, expect } from "vitest";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "../src/Markdown";
import Bold from "@tiptap/extension-bold";


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
        })
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

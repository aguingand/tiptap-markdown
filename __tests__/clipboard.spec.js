import { describe, test, expect } from "vitest";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "../src";
import { clipboardEvent } from "./utils/dom";


describe('clipboard', () => {
    describe('paste', () => {
        test('transform', () => {
            const editor = new Editor({
                extensions: [
                    StarterKit,
                    Markdown.configure({
                        transformPastedText: true,
                    }),
                ],
            });

            const event = clipboardEvent('paste');
            event.clipboardData.setData('text/plain', `# My title`);

            editor.view.dom.dispatchEvent(event);

            expect(editor.getHTML()).toContain('<h1>My title</h1>')
        });

        test('does not transform', () => {
            const editor = new Editor({
                extensions: [
                    StarterKit,
                    Markdown.configure({
                        transformPastedText: false,
                    }),
                ],
            });

            const event = clipboardEvent('paste');
            event.clipboardData.setData('text/plain', `# My title`);

            editor.view.dom.dispatchEvent(event);

            expect(editor.getHTML()).not.toContain('<h1>My title</h1>')
        });
    });

    describe('copy', () => {
        test('transform', () => {
            const editor = new Editor({
                content: '# My title',
                extensions: [
                    StarterKit,
                    Markdown.configure({
                        transformCopiedText: true,
                    }),
                ],
            });

            const event = clipboardEvent('copy');

            editor.commands.selectAll();
            editor.view.dom.dispatchEvent(event);

            expect(event.clipboardData.getData('text/plain')).toBe('# My title');
        });

        test('does not transform', () => {
            const editor = new Editor({
                content: '# My title',
                extensions: [
                    StarterKit.configure({ trailingNode: false }),
                    Markdown.configure({
                        transformCopiedText: false,
                    }),
                ],
            });

            const event = clipboardEvent('copy');

            editor.commands.selectAll();
            editor.view.dom.dispatchEvent(event);

            expect(event.clipboardData.getData('text/plain')).toBe('My title');
        });
    });
})

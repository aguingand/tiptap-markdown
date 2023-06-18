import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "../src";
import { clipboardEvent } from "./utils/dom";


describe('clipboard', () => {
    test('transform pasted', () => {
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

    test('not transform pasted', () => {
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
})

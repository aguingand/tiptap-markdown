import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "../src/Markdown";
import Link from "@tiptap/extension-link";


describe('Markdown', () => {
    describe('commands', () => {
        test('setContent', () => {
            const editor = new Editor({
                extensions: [
                    Markdown,
                    StarterKit,
                    Link.configure({ HTMLAttributes: { target: null, rel: null } }),
                ],
            });
            editor.commands.setContent('[example](http://example.org)');
            expect(editor.getHTML()).toBe('<p><a href="http://example.org">example</a></p>');
        })
    });
    describe('getMarkdown', () => {
        const editor = new Editor({
            content: '<p><strong>example</strong></p>',
            extensions: [
                Markdown,
                StarterKit,
            ],
        });
        expect(editor.storage.markdown.getMarkdown()).toBe('**example**');
    });
});

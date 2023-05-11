import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "../src/Markdown";
import Link from "@tiptap/extension-link";


describe('Markdown', () => {
    describe('commands', () => {
        test('setContent', () => {
            const editor = new Editor({
                extensions: [
                    StarterKit,
                    Link.configure({ HTMLAttributes: { target: null, rel: null } }),
                    Markdown,
                ],
            });
            editor.commands.setContent('[example](http://example.org)');
            expect(editor.getHTML()).toBe('<p><a href="http://example.org">example</a></p>');
        })
    });
});

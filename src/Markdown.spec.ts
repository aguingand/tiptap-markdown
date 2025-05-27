import { describe, test, expect } from "vitest";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Markdown, MarkdownStorage } from "./Markdown";
import Bold from "@tiptap/extension-bold";
import remarkStringify from "remark-stringify";
import { defaultHandlers as remarkStringifyDefaultHandlers } from "mdast-util-to-markdown";


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
    expect((editor.storage.markdown as MarkdownStorage).getMarkdown()).toBe('**example**\n');
});
test('override default extension', () => {
    const editor = new Editor({
        content: '<p><strong>example</strong></p>',
        extensions: [
            Markdown,
            StarterKit.configure({ bold: false }),
            Bold.extend({
                renderMarkdown({ fromHTML, toMarkdown }) {
                    this.parent!({ fromHTML, toMarkdown });
                    toMarkdown.use(remarkStringify, {
                        handlers: {
                            strong(node, parent, state, info) {
                                return remarkStringifyDefaultHandlers.strong(node, parent, state, info).replaceAll('**', '***');
                            }
                        },
                    })
                }
            }),
        ],
    });
    expect((editor.storage.markdown as MarkdownStorage).getMarkdown()).toBe('***example***\n');
});

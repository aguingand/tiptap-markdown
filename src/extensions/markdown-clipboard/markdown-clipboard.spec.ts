import { describe, expect, test } from "vitest";
import { clipboardEvent } from "../../../test-utils/dom";
import { createEditor } from "../../../test-utils/editor";


describe('paste', () => {
    test('transform', () => {
        const editor = createEditor({
            editorOptions: {
                enablePasteRules: false,
            },
            markdown: {
                transformPastedText: true,
            },
        });

        const event = clipboardEvent('paste');
        event.clipboardData!.setData('text/plain', `# My title`);

        editor.view.dom.dispatchEvent(event);

        expect(editor.getHTML()).toContain('<h1>My title</h1>')
    });

    test('does not transform', () => {
        const editor = createEditor({
            editorOptions: {
                enablePasteRules: false,
            },
            markdown: {
                transformPastedText: false,
            },
        });

        const event = clipboardEvent('paste');
        event.clipboardData!.setData('text/plain', `# My title`);

        editor.view.dom.dispatchEvent(event);

        expect(editor.getHTML()).not.toContain('<h1>My title</h1>')
    });
});

describe('copy', () => {
    test('transform', () => {
        const editor = createEditor({
            editorOptions: {
                content: '# My title',
            },
            markdown: { transformCopiedText: true }
        });

        const event = clipboardEvent('copy');

        editor.commands.selectAll();
        editor.view.dom.dispatchEvent(event);

        expect(event.clipboardData!.getData('text/plain')).toBe('# My title\n');
    });

    test('does not transform', () => {
        const editor = createEditor({
            editorOptions: {
                content: '# My title',
            },
            markdown: { transformCopiedText: false }
        });

        const event = clipboardEvent('copy');

        editor.commands.selectAll();
        editor.view.dom.dispatchEvent(event);

        expect(event.clipboardData!.getData('text/plain')).toBe('My title');
    });
});

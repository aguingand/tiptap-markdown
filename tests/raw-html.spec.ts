import { expect, test, vi } from "vitest";
import { parse, serialize } from "./utils";


test('parse block html node', () => {
    expect(parse('<custom-element>\nexample\n</custom-element>', {
        htmlNode: {
            group: 'block',
            content: 'inline*',
            parseHTML: () => [{
                tag: 'custom-element',
            }],
        },
    })).toMatchSnapshot();
});
test('parse block html node with markdown inside', () => {
    expect(parse('<custom-element>\n\nexample\n\n</custom-element>', {
        htmlNode: {
            group: 'block',
            content: 'block*',
            parseHTML: () => [{
                tag: 'custom-element',
            }],
        },
    })).toMatchSnapshot();
});
test('parse inline html node', () => {
    expect(parse('<custom-element>Hello</custom-element>', {
        htmlNode: {
            group: 'inline',
            inline: true,
            parseHTML: () => [{
                tag: 'custom-element',
            }],
        },
    })).toMatchSnapshot();
});
test('parse disabled', () => {
    expect(parse('<custom-element></custom-element>', {
        markdown: {
            html: false,
        },
        htmlNode: {
            group: 'block',
            parseHTML: () => [{
                tag: 'custom-element',
            }],
        },
    })).toMatchSnapshot();
})
test('serialize underline', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    expect(serialize('<u>example</u>', { markdown: { html: false } })).toEqual('*example*\n'); // remark renders an italic by default for <u>
    expect(console.warn).toHaveBeenCalledWith(
        'Tiptap Markdown: the following element will not be serialized to HTML because the `html` option is disabled: ',
        '<u>example</u>'
    );
});
test('serialize underline html', () => {
    expect(serialize('<u>example</u>', { markdown: { html: true } })).toEqual('<u>example</u>\n');
});
test('serialize html mark', () => {
    expect(serialize('<sup>example</sup>', {
        markdown: {
            html: true,
        },
        htmlMark: {
            parseHTML: () => [{
                tag: 'sup',
            }],
            renderHTML: () => ['sup', 0],
        },
    })).toEqual('<sup>example</sup>\n');
});
test('serialize html node', () => {
    expect(serialize('<block-element></block-element> <block-element>example2</block-element>', {
        markdown: {
            html: true,
        },
        htmlNode: {
            group: 'block',
            content: 'inline*',
            parseHTML: () => [{
                tag: 'block-element',
            }],
            renderHTML: () => [
                'block-element',
                0,
            ],
        },
    })).toEqual('<block-element>\n</block-element>\n\n<block-element>\nexample2\n</block-element>\n');
});
test('serialize html node with hard break', () => {
    expect(serialize('<block-element>a<br>b</block-element>', {
        markdown: {
            html: true,
        },
        htmlNode: {
            group: 'block',
            content: 'inline*',
            parseHTML: () => [{
                tag: 'block-element',
            }],
            renderHTML: () => [
                'block-element',
                0,
            ],
        },
    })).toEqual('<block-element>\na<br>b\n</block-element>\n');
});
test('serialize html inline node', () => {
    expect(serialize('<p><inline-element>example1</inline-element> <inline-element>example2</inline-element></p>', {
        markdown: {
            html: true,
        },
        htmlNode: {
            group: 'inline',
            inline: true,
            content: 'text*',
            parseHTML: () => [{
                tag: 'inline-element',
            }],
            renderHTML: () => [
                'inline-element',
                0,
            ],
        },
    })).toEqual('<inline-element>example1</inline-element> <inline-element>example2</inline-element>\n');
});
test('serialize html node disabled', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    expect(serialize('<custom-element></custom-element>', {
        markdown: {
            html: false,
        },
        htmlNode: {
            name: 'customElement',
            group: 'block',
            parseHTML: () => [{
                tag: 'custom-element',
            }],
            renderHTML: () => [
                'custom-element'
            ],
        },
    })).toEqual('');

    expect(console.warn).toHaveBeenCalledWith(
        'Tiptap Markdown: the following element will not be serialized to HTML because the `html` option is disabled: ',
        '<custom-element></custom-element>'
    );
});

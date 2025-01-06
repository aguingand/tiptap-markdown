import { describe, test, expect, vi } from "vitest";
import { serialize, dedent } from './utils';

describe('serialize', () => {
    describe('marks', () => {
        test('text', () => {
            expect(serialize('example')).toEqual('example');
        });
        test('text escaped', () => {
            expect(serialize('example <><>')).toEqual('example &lt;&gt;&lt;&gt;');
        });
        test('bold', () => {
            expect(serialize('<b>example</b>')).toEqual('**example**');
        });
        test('italic', () => {
            expect(serialize('<em>example</em>')).toEqual('*example*');
        });
        test('strike', () => {
            expect(serialize('<s>example</s>')).toEqual('~~example~~');
        });
        test('code', () => {
            expect(serialize('<code>example</code>')).toEqual('`example`');
        });
        test('link', () => {
            expect(serialize('<a href="http://example.org">example</a>')).toEqual('[example](http://example.org)');
        });
        test('underline', () => {
            vi.spyOn(console, 'warn').mockImplementation();

            expect(serialize('<u>example</u>', { html: false })).toEqual('example');
            expect(console.warn).toHaveBeenCalledWith(
                `Tiptap Markdown: "underline" mark is only available in html mode`
            );
        });
        test('underline html', () => {
            expect(serialize('<u>example</u>', { html: true })).toEqual('<u>example</u>');
        });
        test('html', () => {
            expect(serialize('<sup>example</sup>', {
                html: true,
                htmlMark: {
                    parseHTML: () => [{
                        tag: 'sup',
                    }],
                    renderHTML: () => ['sup', 0],
                },
            })).toEqual('<sup>example</sup>');
        });
        test('expels whitespaces', () => {
            expect(serialize('My <strong> example </strong>')).toEqual('My  **example** ');
            expect(serialize('My <em> example </em>')).toEqual('My  *example* ');
        });
        test('trim inline', () => {
            expect(serialize('My<strong>, example</strong>')).toEqual('My, **example**');
            expect(serialize('My<em>. example</em>')).toEqual('My. *example*');
        });
    });
    describe('nodes', () => {
        test('paragraph', () => {
            expect(serialize('<p>example1</p><p>example2</p>')).toEqual('example1\n\nexample2');
        });
        test('headings', () => {
            expect(serialize('<h1>example</h1>')).toEqual('# example');
            expect(serialize('<h2>example</h2>')).toEqual('## example');
            expect(serialize('<h3>example</h3>')).toEqual('### example');
            expect(serialize('<h4>example</h4>')).toEqual('#### example');
            expect(serialize('<h5>example</h5>')).toEqual('##### example');
            expect(serialize('<h6>example</h6>')).toEqual('###### example');
        });
        test('bullet list', () => {
            expect(serialize('<ul><li>example1</li><li>example2</li></ul>'))
                .toEqual('- example1\n- example2');

            expect(serialize('<ul><li>example1</li><li>example2</li></ul>', { bulletListMarker: '*' }))
                .toEqual('* example1\n* example2');
        });
        test('ordered list', () => {
            expect(serialize('<ol><li>example1</li><li>example2</li></ol>'))
                .toEqual('1. example1\n2. example2');
            expect(serialize('<ol start="10"><li>example1</li><li>example2</li></ol>'))
                .toEqual('10. example1\n11. example2');
        });
        test('adjacent ordered list', () => {
            expect(serialize('<ol><li>example1</li></ol><ol><li>example2</li></ol><ol><li>example3</li></ol>'))
                .toEqual('1. example1\n\n\n1) example2\n\n\n1. example3'); // prosemirror-markdown insert 3 \n, only 2 are needed
        })
        test('task list',() => {
            const html = dedent`
                <ul data-type="taskList">
                    <li data-checked="false" data-type="taskItem">
                        <label><input type="checkbox"><span></span></label>
                        <div><p>foo</p></div>
                    </li>
                    <li data-checked="true" data-type="taskItem">
                        <label><input type="checkbox" checked="checked"><span></span></label>
                        <div><p>bar</p></div>
                    </li>
                </ul>`;
            expect(serialize(html)).toEqual('- [ ] foo\n- [x] bar');
            expect(serialize(html, {tightLists: false})).toEqual('- [ ] foo\n\n- [x] bar');
        });
        test('fence', () => {
            expect(serialize('<pre><code class="language-js">example</code></pre>')).toEqual('```js\nexample\n```');
        })
        test('code block', () => {
            expect(serialize('<pre><code>example</code></pre>')).toEqual('```\nexample\n```');
        });
        test('image', () => {
            expect(serialize('<img src="example.jpg" alt="example">')).toEqual('![example](example.jpg)');
        });
        test('hr', () => {
            expect(serialize('<hr>')).toEqual('---')
        });
        test('hard break', () => {
            expect(serialize('example1<br>example2')).toEqual('example1\\\nexample2');
        });
        test('hard break with mark wrap', () => {
            expect(serialize('example1<strong><br></strong>example2')).toEqual('example1\\\nexample2');
        });
        describe('table', () => {
            test('filled', () => {
                expect(serialize(dedent`
                    <table>
                        <tr>
                            <th>example1</th>
                            <th>example2</th>
                        </tr>
                        <tr>
                            <td>example3</td>
                            <td>example4</td>
                        </tr>
                    </table>
                `)).toEqual(dedent`
                    | example1 | example2 |
                    | --- | --- |
                    | example3 | example4 |
                `);
            });
            test('empty', () => {
                expect(serialize(dedent`
                    <table>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                `)).toEqual(dedent`
                    |  |  |
                    | --- | --- |
                    |  |  |
                `);
            });
            test('single column', () => {
                expect(serialize(dedent`
                    <table>
                        <tr>
                            <th>example1</th>
                        </tr>
                        <tr>
                            <td>example3</td>
                        </tr>
                    </table>
                `)).toEqual(dedent`
                    | example1 |
                    | --- |
                    | example3 |
                `);
            });
            test('header only', () => {
                expect(serialize(dedent`
                    <table>
                        <tr>
                            <th>example1</th>
                            <th>example2</th>
                        </tr>
                    </table>
                `)).toEqual(dedent`
                    | example1 | example2 |
                    | --- | --- |
                `);
            });
            test('cell with hard break', () => {
                expect(serialize(dedent`
                    <table>
                        <tr>
                            <th><p>example1 <br> example2</p></th>
                        </tr>
                    </table>
                `, { html: true })).toEqual(dedent`
                    | example1 <br> example2 |
                    | --- |
                `);
            });
            test('no header', () => {
                expect(serialize(dedent`
                    <table>
                        <tr>
                            <td>example1</td>
                        </tr>
                        <tr>
                            <td>example3</td>
                        </tr>
                    </table>
                `, { html: true })).toMatchSnapshot();
            });
            test('header in body', () => {
                expect(serialize(dedent`
                    <table>
                        <tr>
                            <th>example1</th>
                        </tr>
                        <tr>
                            <th>example3</th>
                        </tr>
                    </table>
                `, { html: true })).toMatchSnapshot();
            });
            test('with colspan', () => {
                expect(serialize(dedent`
                    <table>
                        <tr>
                            <th colspan="2">example1</th>
                        </tr>
                    </table>
                `, { html: true })).toMatchSnapshot();
            });
            test('with rowspan', () => {
                expect(serialize(dedent`
                    <table>
                        <tr>
                            <th rowspan="2">example1</th>
                        </tr>
                    </table>
                `, { html: true })).toMatchSnapshot();
            });
            test('multiline cell', () => {
                expect(serialize(dedent`
                    <table>
                        <tr>
                            <th><p>example1</p><p>example2</p></th>
                        </tr>
                    </table>
                `, { html: true })).toMatchSnapshot();
            });
        })
        test('html', () => {
            expect(serialize('<block-element></block-element> <block-element>example2</block-element>', {
                html: true,
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
            })).toEqual('<block-element>\n</block-element>\n\n<block-element>\nexample2\n</block-element>');
        });
        test('html with hard break', () => {
            expect(serialize('<block-element>a<br>b</block-element>', {
                html: true,
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
            })).toEqual('<block-element>\na<br>b\n</block-element>');
        });
        test('html inline', () => {
            expect(serialize('<p><inline-element>example1</inline-element> <inline-element>example2</inline-element></p>', {
                html: true,
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
            })).toEqual('<inline-element>example1</inline-element> <inline-element>example2</inline-element>');
        });
        test('html disabled', () => {
            vi.spyOn(console, 'warn').mockImplementation();

            expect(serialize('<custom-element></custom-element>', {
                html: false,
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
            })).toEqual('[customElement]');

            expect(console.warn).toHaveBeenCalledWith(
                `Tiptap Markdown: "customElement" node is only available in html mode`
            );
        });
    });
})

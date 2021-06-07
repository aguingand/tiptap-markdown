import { serialize as baseSerialize } from '../src/serialize/serialize';
import { dedent, createEditor } from "./utils";

function serialize(content, options) {
    const editor = createEditor({
        content,
    });
    return baseSerialize(editor.schema, editor.state.doc, options);
}

describe('serialize', () => {
    describe('inline', () => {
        test('text', () => {
            expect(serialize('example')).toEqual('example');
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
    });
    describe('block', () => {
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
                .toEqual('* example1\n\n* example2');

            expect(serialize('<ul><li>example1</li><li>example2</li></ul>', { bulletListMarker: '-' }))
                .toEqual('- example1\n\n- example2');

            expect(serialize('<ul><li>example1</li><li>example2</li></ul>', { tightLists: true }))
                .toEqual('* example1\n* example2');
        });
        test('ordered list', () => {
            expect(serialize('<ol><li>example1</li><li>example2</li></ol>'))
                .toEqual('1. example1\n\n2. example2');

            expect(serialize('<ol><li>example1</li><li>example2</li></ol>', { tightLists: true }))
                .toEqual('1. example1\n2. example2');
        });
        test('fence', () => {
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
        test('table', () => {
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
                example1 | example2
                --- | ---
                example3 | example4
            `);

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
                --- | ---
                |  |  |
            `);
        });
    });
})

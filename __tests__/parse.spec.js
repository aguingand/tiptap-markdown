import { DOMParser } from "prosemirror-model";
import extensions from "../src/extensions";
import { parse as baseParse } from '../src/parse/parse';
import { createEditor, dedent } from "./utils";
import { elementFromString } from "../src/util/dom";

function parse(content, { html=true, linkify, image, codeBlock, htmlNode } = {}) {
    const editor = createEditor({
        image,
        htmlNode,
        codeBlock,
    });
    const parsed = baseParse(editor.schema, content, {
        extensions,
        html,
        linkify,
        languageClassPrefix: codeBlock?.languageClassPrefix,
    });
    return DOMParser.fromSchema(editor.schema)
        .parseSlice(elementFromString(parsed)).content
        .toJSON();
}


describe('parse', () => {
    describe('marks', () => {
        test('text', () => {
            expect(parse('example')).toMatchSnapshot();
            expect(parse('http://example.org')).toMatchSnapshot('link');
        });
        test('bold', () => {
            expect(parse('**example**')).toMatchSnapshot();
            expect(parse('<b>example</b>')).toMatchSnapshot('html');
        });
        test('italic', () => {
            expect(parse('*example*')).toMatchSnapshot();
            expect(parse('<em>example</em>')).toMatchSnapshot('html');
        });
        test('strike', () => {
            expect(parse('~~example~~')).toMatchSnapshot();
            expect(parse('<s>example</s>')).toMatchSnapshot('html');
        });
        test('code', () => {
            expect(parse('`example`')).toMatchSnapshot();
            expect(parse('<code>example</code>')).toMatchSnapshot('html');
        });
        test('link', () => {
            expect(parse('[example](http://example.org)')).toMatchSnapshot();
            expect(parse('<a href="http://example.org">example</a>')).toMatchSnapshot('html');
        });
        test('link with linkify', () => {
            expect(parse('http://example.org', { linkify:true })).toMatchSnapshot();
        });
    });
    describe('nodes', () => {
        test('paragraph', () => {
            expect(parse('example1\n\nexample2')).toMatchSnapshot();
            expect(parse('<p>example1</p><p>example2</p>')).toMatchSnapshot('html');
        });
        test('headings', () => {
            expect(parse('# example')).toMatchSnapshot('h1');
            expect(parse('## example')).toMatchSnapshot('h2');
            expect(parse('### example')).toMatchSnapshot('h3');
            expect(parse('#### example')).toMatchSnapshot('h4');
            expect(parse('##### example')).toMatchSnapshot('h5');
            expect(parse('###### example')).toMatchSnapshot('h6');
            expect(parse('<h1>example</h1>')).toMatchSnapshot('h1 html');
        });
        test('bullet list', () => {
            expect(parse('- example1\n\n- example2')).toMatchSnapshot();
            expect(parse('* example1\n\n* example2')).toMatchSnapshot();
            expect(parse('<ul><li>example1</li><li>example2</li></ul>')).toMatchSnapshot('html');
        });
        test('ordered list', () => {
            expect(parse('1. example1\n2. example2')).toMatchSnapshot();
            expect(parse('<ol><li>example1</li><li>example2</li></ol>')).toMatchSnapshot('html');
        });
        test('fence', () => {
            expect(parse('```\nexample\n```')).toMatchSnapshot();
            expect(parse('```js\nexample\n```')).toMatchSnapshot('lang');
        });
        test('fence with languageClassPrefix', () => {
            expect(parse('```js\nexample\n```', { codeBlock: { languageClassPrefix: 'lang-' } })).toMatchSnapshot();
        })
        test('code block', () => {
            expect(parse('    example')).toMatchSnapshot();
            expect(parse('<pre><code>example</code></pre>')).toMatchSnapshot('html');
        });
        test('image', () => {
            expect(parse('![example](example.jpg)')).toMatchSnapshot();
            expect(parse('![example](example.jpg)', { image: { inline: true } })).toMatchSnapshot('inline');
            expect(parse('<img src="example.jpg" alt="example">')).toMatchSnapshot('html');
        });
        test('hr', () => {
            expect(parse('---')).toMatchSnapshot();
            expect(parse('<hr>')).toMatchSnapshot('html');
        });
        test('hard break', () => {
            expect(parse('example1  \nexample2')).toMatchSnapshot();
            expect(parse('example1<br>example2')).toMatchSnapshot('html');
        });
        test('table', () => {
            expect(parse(dedent`
                example1 | example2
                --- | ---
                example3 | example4
            `)).toMatchSnapshot();

            expect(parse(dedent`
                <table>
                <thead>
                    <tr>
                        <th>example1</th>
                        <th>example2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>example3</td>
                        <td>example4</td>
                    </tr>
                </tbody>
                </table>
            `)).toMatchSnapshot('html');
        });
        test('html', () => {
            expect(parse('<custom-element>example</custom-element>', {
                htmlNode: {
                    group: 'block',
                    content: 'inline*',
                    parseHTML: () => [{
                        tag: 'custom-element',
                    }],
                },
            })).toMatchSnapshot();
        });
        test('html inline', () => {
            expect(parse('<custom-element></custom-element>', {
                htmlNode: {
                    group: 'inline',
                    inline: true,
                    parseHTML: () => [{
                        tag: 'custom-element',
                    }],
                },
            })).toMatchSnapshot();
        });
        test('html disabled', () => {
            expect(parse('<custom-element></custom-element>', {
                html: false,
                htmlNode: {
                    group: 'block',
                    parseHTML: () => [{
                        tag: 'custom-element',
                    }],
                },
            })).toMatchSnapshot();
        });
    });
});


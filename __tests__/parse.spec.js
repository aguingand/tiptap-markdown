import { createEditor } from "./utils";


function parse(content, { html=true, image } = {}) {
    return createEditor({ html, image }).parseMarkdown(content);
}

function nodes(doc) {
    return doc.content;
}

function node(doc) {
    return doc.content[0];
}

function inlineNode(doc) {
    return doc.content[0].content[0];
}

function dedent(str) {
    return str[0].replace(/^\s*/gm, '');
}

describe('parse', () => {
    describe('inline', () => {
        test('text', () => {
            expect(inlineNode(parse('example'))).toMatchSnapshot();
        });
        test('bold', () => {
            expect(inlineNode(parse('**example**'))).toMatchSnapshot();
            expect(inlineNode(parse('<b>example</b>'))).toMatchSnapshot('html');
        });
        test('italic', () => {
            expect(inlineNode(parse('*example*'))).toMatchSnapshot();
            expect(inlineNode(parse('<em>example</em>'))).toMatchSnapshot('html');
        });
        test('strike', () => {
            expect(inlineNode(parse('~~example~~'))).toMatchSnapshot();
            expect(inlineNode(parse('<s>example</s>'))).toMatchSnapshot('html');
        });
        test('code', () => {
            expect(inlineNode(parse('`example`'))).toMatchSnapshot();
            expect(inlineNode(parse('<code>example</code>'))).toMatchSnapshot('html');
        });
        test('link', () => {
            expect(inlineNode(parse('[example](http://example.org)'))).toMatchSnapshot();
            expect(inlineNode(parse('<a href="http://example.org">example</a>'))).toMatchSnapshot('html');
        });
    });
    describe('block', () => {
        test('paragraph', () => {
            expect(nodes(parse('example1\n\nexample2'))).toMatchSnapshot();
            expect(nodes(parse('<p>example1</p><p>example2</p>'))).toMatchSnapshot('html');
        });
        test('headings', () => {
            expect(node(parse('# example'))).toMatchSnapshot('h1');
            expect(node(parse('## example'))).toMatchSnapshot('h2');
            expect(node(parse('### example'))).toMatchSnapshot('h3');
            expect(node(parse('#### example'))).toMatchSnapshot('h4');
            expect(node(parse('##### example'))).toMatchSnapshot('h5');
            expect(node(parse('###### example'))).toMatchSnapshot('h6');
            expect(node(parse('<h1>example</h1>'))).toMatchSnapshot('h1 html');
        });
        test('bullet list', () => {
            expect(node(parse('- example1\n- example2'))).toMatchSnapshot();
            expect(node(parse('* example1\n* example2'))).toMatchSnapshot();
            expect(node(parse('<ul><li>example1</li><li>example2</li></ul>'))).toMatchSnapshot('html');
        });
        test('ordered list', () => {
            expect(node(parse('1. example1\n2. example2'))).toMatchSnapshot();
            expect(node(parse('<ol><li>example1</li><li>example2</li></ol>'))).toMatchSnapshot('html');
        });
        test('fence', () => {
            expect(node(parse('```\nexample\n```'))).toMatchSnapshot();
            expect(node(parse('```js\nexample\n```'))).toMatchSnapshot('lang');
        })
        test('code block', () => {
            expect(node(parse('    example'))).toMatchSnapshot();
        });
        test('image', () => {
            expect(node(parse('![example](example.jpg)'))).toMatchSnapshot();
            expect(node(parse('![example](example.jpg)', { image: { inline: true } }))).toMatchSnapshot('inline');
            expect(node(parse('<img src="example.jpg" alt="example">'))).toMatchSnapshot('html');
        });
        test('hr', () => {
            expect(node(parse('---'))).toMatchSnapshot();
            expect(node(parse('<hr>'))).toMatchSnapshot('html');
        });
        test('hard break', () => {
            expect(node(parse('example1  \nexample2'))).toMatchSnapshot();
            expect(node(parse('example1<br>example2'))).toMatchSnapshot('html');
        });
        test('table', () => {
            expect(node(parse(dedent`
                | example1 | example2 |
                | --- | --- |
                | example3 | example4 |
            `))).toMatchSnapshot();
        });
    })
});


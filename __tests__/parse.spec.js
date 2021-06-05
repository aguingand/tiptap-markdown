import { createEditor } from "./utils";


function parse(content, html) {
    return createEditor({ html }).parseMarkdown(content);
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
        });
        test('italic', () => {
            expect(inlineNode(parse('*example*'))).toMatchSnapshot();
        });
        test('strike', () => {
            expect(inlineNode(parse('~~example~~'))).toMatchSnapshot();
        });
        test('code', () => {
            expect(inlineNode(parse('`example`'))).toMatchSnapshot();
        });
        test('link', () => {
            expect(inlineNode(parse('[example](http://example.org)'))).toMatchSnapshot();
        });
    });
    describe('block', () => {
        test('paragraph', () => {
            expect(nodes(parse('example1\n\nexample2'))).toMatchSnapshot();
        });
        test('headings', () => {
            expect(node(parse('# example'))).toMatchSnapshot();
            expect(node(parse('## example'))).toMatchSnapshot();
            expect(node(parse('### example'))).toMatchSnapshot();
            expect(node(parse('#### example'))).toMatchSnapshot();
            expect(node(parse('##### example'))).toMatchSnapshot();
            expect(node(parse('###### example'))).toMatchSnapshot();
        });
        test('bullet list', () => {
            expect(node(parse('- example1\n- example2'))).toMatchSnapshot();
            expect(node(parse('* example1\n* example2'))).toMatchSnapshot();
        });
        test('ordered list', () => {
            expect(node(parse('1. example1\n2. example2'))).toMatchSnapshot();
        });
        test('code block', () => {
            expect(node(parse('```\nexample\n```'))).toMatchSnapshot();
            expect(node(parse('```js\nexample\n```'))).toMatchSnapshot();
            expect(node(parse('    example'))).toMatchSnapshot();
        });
        test('image', () => {
            expect(node(parse('![example](example.jpg)'))).toMatchSnapshot();
        });
        test('hr', () => {
            expect(node(parse('---'))).toMatchSnapshot();
        });
        test('hard break', () => {
            expect(node(parse('example1  \nexample2'))).toMatchSnapshot();
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


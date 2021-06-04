import { createEditor } from "./utils";


function parse(content, html) {
    return createEditor({ html }).parseMarkdown(content);
}

function firstNode(doc) {
    return doc.content[0].content[0];
}

describe('parse', () => {
    test('bold', () => {
        expect(firstNode(parse('**example**'))).toMatchSnapshot();
    });
    test('italic', () => {
        expect(firstNode(parse('*example*'))).toMatchSnapshot();
    });
    test('strike', () => {
        expect(firstNode(parse('~~example~~'))).toMatchSnapshot();
    });
    test('code', () => {
        expect(firstNode(parse('`example`'))).toMatchSnapshot();
    });
    test('link', () => {
        expect(firstNode(parse('[example](http://example.org)'))).toMatchSnapshot();
    });
});


import { expect, test } from "vitest";
import { parse, serialize } from "../../../__tests__/utils";


test('parse markdown', () => {
    expect(parse('![example](example.jpg)')).toMatchSnapshot();
});
// this has no effect so should render in a paragraph
test('parse markdown inline', () => {
    expect(parse('![example](example.jpg)', { image: { inline: true } })).toMatchSnapshot();
});
test('parse html', () => {
    expect(parse('<img src="example.jpg" alt="example">')).toMatchSnapshot();
});
test.skip('serialize image', () => {
    expect(serialize('<img src="example.jpg" alt="example">')).toEqual('![example](example.jpg)');
});

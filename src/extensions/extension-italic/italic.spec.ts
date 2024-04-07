import { expect, test } from "vitest";
import { parse, serialize } from "../../../__tests__/utils";


test('parse markdown with "*"', () => {
    expect(parse('*example*')).toMatchSnapshot();
});
test('parse markdown with "_"', () => {
    expect(parse('_example_')).toMatchSnapshot();
})
test('parse html', () => {
    expect(parse('<em>example</em>')).toMatchSnapshot();
});
test.skip('serialize', () => {
    expect(serialize('<em>example</em>')).toEqual('*example*');
    expect(serialize('<em data-markdown-marker="_">example</em>')).toEqual('_example_');
});

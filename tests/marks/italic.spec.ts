import { expect, test } from "vitest";
import { parse, serialize } from "../utils";


test('parse markdown with "*"', () => {
    expect(parse('*example*')).toMatchSnapshot();
});
test('parse markdown with "_"', () => {
    expect(parse('_example_')).toMatchSnapshot();
})
test('parse html', () => {
    expect(parse('<em>example</em>')).toMatchSnapshot();
});
test('serialize', () => {
    expect(serialize('<em>example</em>')).toEqual('*example*\n');
    expect(serialize('<em data-markdown-marker="_">example</em>')).toEqual('_example_\n');
});

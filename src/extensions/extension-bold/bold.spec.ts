import { expect, test } from "vitest";
import { parse, serialize } from "../../../__tests__/utils";


test('parse markdown with "*"', () => {
    expect(parse('**example**')).toMatchSnapshot();
});
test('parse markdown with "_"', () => {
    expect(parse('__example__')).toMatchSnapshot();
});
test('parse html', () => {
    expect(parse('<strong>example</strong>')).toMatchSnapshot();
});
test.skip('serialize', () => {
    expect(serialize('<strong>example</strong>')).toEqual('**example**');
    expect(serialize('<strong data-markdown-marker="_">example</strong>')).toEqual('__example__');
});

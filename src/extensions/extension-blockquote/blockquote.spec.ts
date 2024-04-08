import { test, expect } from "vitest";
import { parse, serialize } from "../../../__tests__/utils";


test('parse markdown', () => {
    expect(parse('> example')).toMatchSnapshot();
});
test('parse html', () => {
    expect(parse('<blockquote>example</blockquote>')).toMatchSnapshot();
});
test.skip('serialize', () => {
    expect(serialize('<blockquote>example</blockquote>')).toMatchSnapshot();
});

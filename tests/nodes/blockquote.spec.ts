import { test, expect } from "vitest";
import { parse, serialize } from "../utils";


test('parse markdown', () => {
    expect(parse('> example')).toMatchSnapshot();
});
test('parse html', () => {
    expect(parse('<blockquote>example</blockquote>')).toMatchSnapshot();
});
test('serialize', () => {
    expect(serialize('<blockquote>example</blockquote>')).toEqual('> example\n')
});

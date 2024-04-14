import { expect, test } from "vitest";
import { parse, serialize } from "../utils";


test('parse markdown', () => {
    expect(parse('[example](http://example.org)')).toMatchSnapshot();
});
test('parse markdown with linkify', () => {
    expect(parse('http://example.org', { markdown: { linkify:true } })).toMatchSnapshot();
});
test('parse markdown without linkify', () => {
    expect(parse('http://example.org')).toMatchSnapshot();
});
test('parse html', () => {
    expect(parse('<a href="http://example.org">example</a>')).toMatchSnapshot();
});
test('serialize', () => {
    expect(serialize('<a href="http://example.org">example</a>')).toEqual('[example](http://example.org)\n');
});

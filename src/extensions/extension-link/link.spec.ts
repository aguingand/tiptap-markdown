import { expect, test } from "vitest";
import { parse } from "../../../__tests__/utils";


test('parse markdown', () => {
    expect(parse('[example](http://example.org)')).toMatchSnapshot();
});
test('parse markdown with linkify', () => {
    expect(parse('http://example.org', { linkify:true })).toMatchSnapshot();
});
test('parse markdown without linkify', () => {
    expect(parse('http://example.org')).toMatchSnapshot();
});
test('parse html', () => {
    expect(parse('<a href="http://example.org">example</a>')).toMatchSnapshot();
});

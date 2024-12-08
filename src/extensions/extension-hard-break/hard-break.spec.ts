import { expect, test } from "vitest";
import { parse, serialize } from "../../../__tests__/utils";


test('parse markdown', () => {
    expect(parse('example1\\\nexample2')).toMatchSnapshot();
})
test('parse markdown with double spaces', () => {
    expect(parse('example1  \nexample2')).toMatchSnapshot();
})
test('parse markdown with breaks option', () => {
    expect(parse('example1\nexample2', { markdown: { breaks: true } })).toMatchSnapshot();
})
test('parse html', () => {
    expect(parse('example1<br>example2')).toMatchSnapshot();
});
test('serialize', () => {
    expect(serialize('example1<br>example2')).toEqual('example1\\\nexample2\n');
});
test.skip('serialize with mark wrap', () => {
    expect(serialize('example1<strong><br></strong>example2')).toEqual('example1\\\nexample2');
});

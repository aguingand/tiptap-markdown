import { expect, test } from "vitest";
import { parse } from "../../../__tests__/utils";


test('parse markdown', () => {
    expect(parse('example1\\\nexample2')).toMatchSnapshot();
})
test('parse markdown with double spaces', () => {
    expect(parse('example1  \nexample2')).toMatchSnapshot();
})
test('parse markdown with breaks option', () => {
    expect(parse('example1\nexample2', { markdown: { breaks: true } })).toMatchSnapshot();
})
// test('markdown with breaks option + inline', () => {
//     expect(parse('example1\nexample2', { markdown: { breaks: true }, inline: true })).toMatchSnapshot();
// })
test('parse html', () => {
    expect(parse('example1<br>example2')).toMatchSnapshot();
});

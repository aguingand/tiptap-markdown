import { test, expect } from "vitest";
import { parse, serialize } from "../../../test-utils";


test('parse markdown', () => {
    expect(parse('> example')).toMatchSnapshot();
});
test('parse html', () => {
    expect(parse('<blockquote><p>example</p></blockquote>')).toMatchSnapshot();
});
test('serialize', () => {
    expect(serialize('<blockquote><p>example</p></blockquote>')).toEqual('> example\n');
    expect(serialize('<blockquote><p>example1</p><p>example2</p></blockquote>')).toEqual(
        `> example1
>
> example2
`);
    expect(serialize('<blockquote><ul><li>example1</li><li>example2</li></ul></blockquote>')).toEqual(
        `> - example1
> - example2
`);
    expect(serialize('<blockquote><blockquote><p>example</p></blockquote></blockquote>')).toEqual(
        `> > example
`);
});

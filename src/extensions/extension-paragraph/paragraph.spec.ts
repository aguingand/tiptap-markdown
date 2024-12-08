import { expect, test } from "vitest";
import { parse, serialize } from "../../../test-utils";


test('parse markdown', () => {
    expect(parse('example1\n\nexample2')).toMatchSnapshot();
});
test('parse html', () => {
    expect(parse(`<p>example1</p><p>example2</p>`)).toMatchSnapshot();
});
test('serialize', () => {
    expect(serialize('<p>example1</p><p>example2</p>')).toEqual('example1\n\nexample2\n');
});

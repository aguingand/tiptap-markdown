import { expect, test } from "vitest";
import { parse, serialize } from "../../../__tests__/utils";

test('parse', () => {
    expect(parse('example')).toMatchSnapshot();
});
test('parse soft break', () => {
    expect(parse('example1\nexample2')).toMatchSnapshot();
});
test.skip('serialize', () => {
    expect(serialize('example')).toEqual('example');
});
test.skip('serialize escaped', () => {
    expect(serialize('example <><>')).toEqual('example &lt;&gt;&lt;&gt;');
});

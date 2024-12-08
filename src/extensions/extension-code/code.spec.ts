import { expect, test } from "vitest";
import { parse, serialize } from "../../../test-utils";


test('parse markdown', () => {
    expect(parse('`example`')).toMatchSnapshot();
});
test('parse html', () => {
    expect(parse('<code>example</code>')).toMatchSnapshot();
});
test('serialize', () => {
    expect(serialize('<code>example</code>')).toEqual('`example`\n');
});

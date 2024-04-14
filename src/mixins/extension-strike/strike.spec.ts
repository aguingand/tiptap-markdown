import { expect, test } from "vitest";
import { parse, serialize } from "../../../__tests__/utils";


test('parse markdown', () => {
    expect(parse('~~example~~')).toMatchSnapshot();
});
test('parse html', () => {
    expect(parse('<s>example</s>')).toMatchSnapshot();
});
test('serialize', () => {
    expect(serialize('<s>example</s>')).toEqual('~~example~~\n');
});

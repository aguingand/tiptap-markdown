import { expect, test } from "vitest";
import { parse, serialize } from "../../../__tests__/utils";

test('markdown', () => {
    expect(parse('---')).toMatchSnapshot();
})
test('html', () => {
    expect(parse('<hr>')).toMatchSnapshot();
});
test.skip('serialize', () => {
    expect(serialize('<hr>')).toEqual('---')
})



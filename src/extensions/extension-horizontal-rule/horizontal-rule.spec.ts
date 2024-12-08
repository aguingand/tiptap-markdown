import { expect, test } from "vitest";
import { parse, serialize } from "../../../test-utils";

test('markdown', () => {
    expect(parse('---')).toMatchSnapshot();
})
test('html', () => {
    expect(parse('<hr>')).toMatchSnapshot();
});
test('serialize', () => {
    expect(serialize('<hr>')).toEqual('---\n')
})
test('serialize with horizontalRuleMarker', () => {
    expect(serialize('<hr>', { markdown: { horizontalRuleMarker: '*' } })).toEqual('***\n')
})


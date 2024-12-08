import { expect, test } from "vitest";
import { parse, serialize } from "../../../__tests__/utils";

test('parse', () => {
    expect(parse('example')).toMatchSnapshot();
});
test('parse soft break', () => {
    expect(parse('example1\nexample2')).toMatchSnapshot();
});
test('parse spaces are trimmed', () => {
    expect(parse('  example ')).toMatchSnapshot();
});
test('serialize', () => {
    expect(serialize('example')).toEqual('example\n');
});
test('serialize escaped', () => {
    expect(serialize(
        [
            {
                "text": "example <div></div>",
                "type": "text",
            },
        ]
    )).toEqual('example \\<div>\\</div>\n');
});

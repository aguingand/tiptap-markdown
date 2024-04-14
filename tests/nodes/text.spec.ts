import { expect, test } from "vitest";
import { parse, serialize } from "../utils";

test('parse', () => {
    expect(parse('example')).toMatchSnapshot();
});
test('parse soft break', () => {
    expect(parse('example1\nexample2')).toMatchSnapshot();
});
test('parse with spaces inline', () => {
    expect(parse('  example ', { inline: true })).toMatchSnapshot();
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

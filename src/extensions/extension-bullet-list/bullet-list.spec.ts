import { expect, test } from "vitest";
import { parse, serialize } from "../../../__tests__/utils";


test('parse markdown with "-"', () => {
    expect(parse('- example1\n\n- example2')).toMatchSnapshot();
});
test('parse markdown with "*"', () => {
    expect(parse('* example1\n\n* example2')).toMatchSnapshot();
});
test('parse markdown with "+"', () => {
    expect(parse('+ example1\n\n+ example2')).toMatchSnapshot();
});
test('parse html', () => {
    expect(parse('<ul><li>example1</li><li>example2</li></ul>')).toMatchSnapshot();
});
test('serialize', () => {
    expect(serialize('<ul><li>example1</li><li>example2</li></ul>'))
        .toEqual('- example1\n- example2\n');

    expect(serialize('<ul><li>example1</li><li>example2</li></ul>', { markdown: { bulletListMarker: '*' } }))
        .toEqual('* example1\n* example2\n');
});
test('serialize adjacent', () => {
    expect(serialize('<ul><li>example1</li></ul><ul><li>example2</li></ul><ul><li>example3</li></ul>'))
        .toEqual('- example1\n\n* example2\n\n- example3\n');

    expect(serialize('<ul><li>example1</li></ul><ul><li>example2</li></ul><ul><li>example3</li></ul>', { markdown: { bulletListMarker: '*' } }))
        .toEqual('* example1\n\n- example2\n\n* example3\n');
});

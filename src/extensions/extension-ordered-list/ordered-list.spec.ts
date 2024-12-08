import { expect, test } from "vitest";
import { parse, serialize } from "../../../test-utils";


test('parse markdown', () => {
    expect(parse('1. example1\n2. example2')).toMatchSnapshot();
});

test('parse html', () => {
    expect(parse('<ol><li>example1</li><li>example2</li></ol>')).toMatchSnapshot();
});

test('serialize', () => {
    expect(serialize('<ol><li>example1</li><li>example2</li></ol>'))
        .toEqual('1. example1\n2. example2\n');
    expect(serialize('<ol start="10"><li>example1</li><li>example2</li></ol>'))
        .toEqual('10. example1\n11. example2\n');
});

test('serialize adjacent', () => {
    expect(serialize('<ol><li>example1</li></ol><ol><li>example2</li></ol><ol><li>example3</li></ol>'))
        .toEqual('1. example1\n\n1) example2\n\n1. example3\n');
})

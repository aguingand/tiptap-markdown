import { expect, test } from "vitest";
import { parse, serialize } from "../../../__tests__/utils";


test('parse markdown', () => {
    expect(parse('1. example1\n2. example2')).toMatchSnapshot();
});

test('parse html', () => {
    expect(parse('<ol><li>example1</li><li>example2</li></ol>')).toMatchSnapshot();
});

test.skip('serialize ordered list', () => {
    expect(serialize('<ol><li>example1</li><li>example2</li></ol>'))
        .toEqual('1. example1\n2. example2');
    expect(serialize('<ol start="10"><li>example1</li><li>example2</li></ol>'))
        .toEqual('10. example1\n11. example2');
});

test.skip('serialize adjacent ordered list', () => {
    expect(serialize('<ol><li>example1</li></ol><ol><li>example2</li></ol><ol><li>example3</li></ol>'))
        .toEqual('1. example1\n\n\n1) example2\n\n\n1. example3'); // prosemirror-markdown insert 3 \n, only 2 are needed
})

import { expect, test } from "vitest";
import { parse, serialize } from "../../../__tests__/utils";


test('parse markdown with "*"', () => {
    expect(parse('*example*')).toMatchSnapshot();
});
test('parse markdown with "_"', () => {
    expect(parse('_example_')).toMatchSnapshot();
})
test('parse html', () => {
    expect(parse('<em>example</em>')).toMatchSnapshot();
});
test('serialize', () => {
    expect(serialize('<em>example</em>')).toEqual('*example*\n');
    expect(serialize('<em data-markdown-marker="_">example</em>')).toEqual('_example_\n');
});
test('expels whitespace / non letters', () => {
    expect(serialize('My <em> example </em>')).toEqual('My *example*\n');
});
test('encode boundary characters', () => {
    expect(serialize('Before<em>! example.</em>After')).toEqual('Befor&#x65;*! example.*&#x41;fter\n');
});

import { expect, test } from "vitest";
import { parse, serialize } from "../utils";


test('parse markdown h1', () => {
    expect(parse('# example')).toMatchSnapshot();
});
test('parse markdown h2', () => {
    expect(parse('## example')).toMatchSnapshot();
});
test('parse markdown h3', () => {
    expect(parse('### example')).toMatchSnapshot();
});
test('parse markdown h4', () => {
    expect(parse('#### example')).toMatchSnapshot();
});
test('parse markdown h5', () => {
    expect(parse('##### example')).toMatchSnapshot();
});
test('parse markdown h6', () => {
    expect(parse('###### example')).toMatchSnapshot();
});
test('parse html h1', () => {
    expect(parse('<h1>example</h1>')).toMatchSnapshot();
});
test('serialize', () => {
    expect(serialize('<h1>example</h1>')).toEqual('# example\n');
    expect(serialize('<h2>example</h2>')).toEqual('## example\n');
    expect(serialize('<h3>example</h3>')).toEqual('### example\n');
    expect(serialize('<h4>example</h4>')).toEqual('#### example\n');
    expect(serialize('<h5>example</h5>')).toEqual('##### example\n');
    expect(serialize('<h6>example</h6>')).toEqual('###### example\n');
});

import { expect, test } from "vitest";
import { serialize } from "./utils";

test('expels whitespaces', () => {
    expect(serialize('My <strong> example </strong>')).toEqual('My **example**\n');
    expect(serialize('My <em> example </em>')).toEqual('My *example*\n');
});
test.todo('trim inline', () => {
    expect(serialize('My<strong>, example</strong>')).toEqual('My, **example**\n');
    expect(serialize('My<em>. example</em>')).toEqual('My. *example*\n');
});

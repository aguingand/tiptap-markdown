import { expect, test } from "vitest";
import { serialize } from "./utils";

test('expels whitespaces', () => {
    expect(serialize('My <strong> example </strong>')).toEqual('My  **example** ');
    expect(serialize('My <em> example </em>')).toEqual('My  *example* ');
});
test('trim inline', () => {
    expect(serialize('My<strong>, example</strong>')).toEqual('My, **example**');
    expect(serialize('My<em>. example</em>')).toEqual('My. *example*');
});

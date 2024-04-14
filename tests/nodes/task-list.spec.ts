import { expect, test } from "vitest";
import { parse, serialize } from "../utils";

test('parse markdown', () => {
    expect(parse('- [ ] example1\n- [x] example2')).toMatchSnapshot();
});

test('serialize', () => {
    expect(serialize('<ul data-type="taskList">' +
        '<li data-type="taskItem" data-checked="false">example1</li>' +
        '<li data-type="taskItem" data-checked="true">example2</li>' +
    '</ul>'))
        .toEqual('- [ ] example1\n- [x] example2\n')
});

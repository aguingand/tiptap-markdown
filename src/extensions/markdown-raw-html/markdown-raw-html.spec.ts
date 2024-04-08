import { expect, test } from "vitest";
import { parse } from "../../../__tests__/utils";

test('parse block html node', () => {
    expect(parse('<custom-element>\nexample\n</custom-element>', {
        htmlNode: {
            group: 'block',
            content: 'inline*',
            parseHTML: () => [{
                tag: 'custom-element',
            }],
        },
    })).toMatchSnapshot();
});
test('parse inline html node', () => {
    expect(parse('<custom-element></custom-element>', {
        htmlNode: {
            group: 'inline',
            inline: true,
            parseHTML: () => [{
                tag: 'custom-element',
            }],
        },
    })).toMatchSnapshot();
});
test('parse disabled', () => {
    expect(parse('<custom-element></custom-element>', {
        markdown: {
            html: false,
        },
        htmlNode: {
            group: 'block',
            parseHTML: () => [{
                tag: 'custom-element',
            }],
        },
    })).toMatchSnapshot();
})

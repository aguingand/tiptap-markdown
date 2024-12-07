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
test('parse block html node inner <p>', () => {
    expect(parse('<custom-element>\n\nexample\n\n</custom-element>', {
        htmlNode: {
            group: 'block',
            content: 'block*',
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
            content: 'text*',
            parseHTML: () => [{
                tag: 'custom-element',
            }],
        },
    })).toMatchSnapshot();
});
test('parse inline html node inner text', () => {
    expect(parse('<custom-element>example</custom-element>', {
        htmlNode: {
            group: 'inline',
            inline: true,
            content: 'text*',
            parseHTML: () => [{
                tag: 'custom-element',
            }],
        },
    })).toMatchSnapshot();
});
test('parse block disabled', () => {
    expect(parse('<custom-element>\nexample\n</custom-element>', {
        markdown: {
            html: false,
        },
    })).toBeNull();
});
test('parse block disabled inner <p>', () => {
    expect(parse('<custom-element>\n\nexample\n\n</custom-element>', {
        markdown: {
            html: false,
        },
    })).toMatchSnapshot();
});
test('parse inline disabled', () => {
    expect(parse('<custom-element></custom-element>', {
        markdown: {
            html: false,
        },
    })).toMatchSnapshot();
});

test('parse inline disabled inner text', () => {
    expect(parse('<custom-element>example</custom-element>', {
        markdown: {
            html: false,
        },
    })).toMatchSnapshot();
});


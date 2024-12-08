import { describe, expect, test } from "vitest";
import { parse } from "../../../__tests__/utils";


describe('bullet list', () => {
    test('tight', () => {
        expect(parse(`* example1\n* example2`))
            .toMatchObject([
                { attrs: { tight: true } }
            ])
    });

    test('tight html', () => {
        expect(parse(`<ul data-tight="true"><li><p>example1</p></li><li><p>example2</p></li></ul>`))
            .toMatchObject([
                { attrs: { tight: true } }
            ]);
    });

    test('loose', () => {
        expect(parse(`* example1\n\n* example2`))
            .toMatchObject([
                { attrs: { tight: false } }
            ]);
    });

    test('loose html', () => {
        expect(parse(`<ul><li><p>example1</p></li><li><p>example2</p></li></ul>`))
            .toMatchObject([
                { attrs: { tight: false } }
            ]);
    });
});
describe('ordered list', () => {
    test('tight', () => {
        expect(parse(`1. example1\n2. example2`))
            .toMatchObject([
                { attrs: { tight: true } }
            ]);
    });

    test('loose', () => {
        expect(parse(`1. example1\n\n2. example2`))
            .toMatchObject([
                { attrs: { tight: false } }
            ]);
    });
});

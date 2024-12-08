import { describe, expect, test } from "vitest";
import { dedent, parse, serialize } from "../../../test-utils";


test('parse markdown', () => {
    expect(parse(dedent`
        example1 | example2
        --- | ---
        example3 | example4
    `)).toMatchSnapshot();
});

test('parse html', () => {
    expect(parse(dedent`
        <table>
        <thead>
            <tr>
                <th>example1</th>
                <th>example2</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>example3</td>
                <td>example4</td>
            </tr>
        </tbody>
        </table>
    `)).toMatchSnapshot();
});

describe('serialize', () => {
    test('filled', () => {
        expect(serialize(dedent`
            <table>
                <tr>
                    <th>example1</th>
                    <th>example2</th>
                </tr>
                <tr>
                    <td>example3</td>
                    <td>example4</td>
                </tr>
            </table>
        `)).toEqual(dedent`
            | example1 | example2 |
            | -------- | -------- |
            | example3 | example4 |
        `);
    });
    test('empty', () => {
        expect(serialize(dedent`
            <table>
                <tr>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        `)).toEqual(dedent`
            |   |   |
            | - | - |
            |   |   |
        `);
    });
    test('single column', () => {
        expect(serialize(dedent`
            <table>
                <tr>
                    <th>example1</th>
                </tr>
                <tr>
                    <td>example3</td>
                </tr>
            </table>
        `)).toEqual(dedent`
            | example1 |
            | -------- |
            | example3 |
        `);
    });
    test('header only', () => {
        expect(serialize(dedent`
            <table>
                <tr>
                    <th>example1</th>
                    <th>example2</th>
                </tr>
            </table>
        `)).toEqual(dedent`
            | example1 | example2 |
            | -------- | -------- |
        `);
    });
    test('cell with hard break', () => {
        expect(serialize(dedent`
            <table>
                <tr>
                    <th><p>example1 <br> example2</p></th>
                </tr>
            </table>
        `, { markdown: { html: true } })).toEqual(dedent`
            | example1<br>example2 |
            | -------------------- |
        `);
    });
    test('no header', () => {
        expect(serialize(dedent`
            <table>
                <tr>
                    <td>example1</td>
                </tr>
                <tr>
                    <td>example3</td>
                </tr>
            </table>
        `, { markdown: { html: true } })).toMatchSnapshot();
    });
    test('header in body', () => {
        expect(serialize(dedent`
            <table>
                <tr>
                    <th>example1</th>
                </tr>
                <tr>
                    <th>example3</th>
                </tr>
            </table>
        `, { markdown: { html: true } })).toMatchSnapshot();
    });
    test('with colspan', () => {
        expect(serialize(dedent`
            <table>
                <tr>
                    <th colspan="2">example1</th>
                </tr>
            </table>
        `, { markdown: { html: true } })).toMatchSnapshot();
    });
    test('with rowspan', () => {
        expect(serialize(dedent`
            <table>
                <tr>
                    <th rowspan="2">example1</th>
                </tr>
            </table>
        `, { markdown: { html: true } })).toMatchSnapshot();
    });
    test('multiline cell', () => {
        expect(serialize(dedent`
            <table>
                <tr>
                    <th><p>example1</p><p>example2</p></th>
                </tr>
            </table>
        `, { markdown: { html: true } })).toMatchSnapshot();
    });
})

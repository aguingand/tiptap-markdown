import { describe, test, expect } from "vitest";
import { parse, dedent } from './utils/index.js';

describe('parse', () => {
    describe('options', () => {
        describe('inline', () => {
            test('text', () => {
                expect(parse('example', { inline: true })).toMatchSnapshot();
            });
        });
    });
});


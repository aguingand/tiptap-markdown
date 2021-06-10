import { shiftDelim, trimInline } from "../src/util/markdown";

describe('util' ,() => {
    describe('trimInline', () => {
        test('full', () => {
            expect(trimInline('*abcde*', 0, 6)).toEqual('*abcde*');
        });
        test('left', () => {
            expect(trimInline('a*, bcde*', '*', 1, 8)).toEqual('a, *bcde*');
        });
        test('right', () => {
            expect(trimInline('*abcd ,*e', '*', 0, 7)).toEqual('*abcd* ,e');
        });
        test('meet', () => {
            expect(trimInline('e*,,*e', '*', 1, 4)).toEqual('e,,e');
        });
    });
    test('shiftDelim', () => {
        expect(shiftDelim('e**abcd', '**', 1, 1)).toEqual('ea**bcd');
        expect(shiftDelim('e**abcd', '**', 1, -1)).toEqual('**eabcd');
    })
})

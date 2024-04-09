
export { parse } from './parse.js';
export { serialize } from './serialize';

export function dedent(str) {
    return str[0].replace(/^\s*/gm, '');
}

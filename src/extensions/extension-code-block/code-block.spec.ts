import { describe, expect, test } from "vitest";
import { parse, serialize } from "../../../__tests__/utils";


test('parse markdown', () => {
    expect(parse('```\nexample\n```')).toMatchSnapshot();
});
test('parse markdown with lang', () => {
    expect(parse('```js\nexample\n```')).toMatchSnapshot();
});
test('parse markdown with languageClassPrefix', () => {
    expect(parse('```js\nexample\n```', { codeBlock: { languageClassPrefix: 'lang--' } }, true))
        .toEqual('<pre><code class="lang--js">example\n</code></pre>');
})
test('parse markdown with indent', () => {
    expect(parse('    example')).toMatchSnapshot();
});
test('parse html', () => {
    expect(parse('<pre><code>example</code></pre>')).toMatchSnapshot();
});
test.skip('serialize', () => {
    expect(serialize('<pre><code>example</code></pre>')).toEqual('```\nexample\n```');
});
test.skip('serialize with lang', () => {
    expect(serialize('<pre><code class="language-js">example</code></pre>')).toEqual('```\nexample\n```');
});

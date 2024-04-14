import { expect, test } from "vitest";
import { parse, serialize } from "../utils";


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
test('serialize', () => {
    expect(serialize('<pre><code>example</code></pre>')).toEqual('```\nexample\n```\n');
});
test('serialize with lang', () => {
    expect(serialize('<pre><code class="language-js">example</code></pre>')).toEqual('```js\nexample\n```\n');
});
test('serialize with languageClassPrefix', () => {
    expect(serialize('<pre><code class="lang--js">example</code></pre>', { codeBlock: { languageClassPrefix: 'lang--' } }))
        .toEqual('```js\nexample\n```\n');
});

import { describe, test, expect } from "vitest";
import { parse, dedent } from './utils';

describe('parse', () => {
    describe('marks', () => {
        describe('text', () => {
            test('text', () => {
                expect(parse('example')).toMatchSnapshot();
            });
            test('link', () => {
                expect(parse('http://example.org')).toMatchSnapshot();
            });
            test('soft break', () => {
                expect(parse('example1\nexample2')).toMatchSnapshot();
            });
        })
        describe('bold', () => {
            test('markdown', () => {
                expect(parse('**example**')).toMatchSnapshot();
            });
            test('html', () => {
                expect(parse('<b>example</b>')).toMatchSnapshot();
            });
        });
        describe('italic', () => {
            test('markdown', () => {
                expect(parse('*example*')).toMatchSnapshot();
            });
            test('html', () => {
                expect(parse('<em>example</em>')).toMatchSnapshot();
            });
        });
        describe('strike', () => {
            test('markdown', () => {
                expect(parse('~~example~~')).toMatchSnapshot();
            });
            test('html', () => {
                expect(parse('<s>example</s>')).toMatchSnapshot();
            });
        });
        describe('code', () => {
            test('markdown', () => {
                expect(parse('`example`')).toMatchSnapshot();
            });
            test('html', () => {
                expect(parse('<code>example</code>')).toMatchSnapshot();
            });
        });
        describe('link', () => {
            test('markdown', () => {
                expect(parse('[example](http://example.org)')).toMatchSnapshot();
            });
            test('markdown with linkify', () => {
                expect(parse('http://example.org', { linkify:true })).toMatchSnapshot();
            });
            test('html', () => {
                expect(parse('<a href="http://example.org">example</a>')).toMatchSnapshot();
            });
        });
    });
    describe('nodes', () => {
        describe('paragraph', () => {
            test('markdown', () => {
                expect(parse('example1\n\nexample2')).toMatchSnapshot();
            });
            test('html', () => {
                expect(parse('<p>example1</p><p>example2</p>')).toMatchSnapshot();
            });
        });
        describe('headings', () => {
            test('markdown h1', () => {
                expect(parse('# example')).toMatchSnapshot();
            });
            test('markdown h2', () => {
                expect(parse('## example')).toMatchSnapshot();
            });
            test('markdown h3', () => {
                expect(parse('### example')).toMatchSnapshot();
            });
            test('markdown h4', () => {
                expect(parse('#### example')).toMatchSnapshot();
            });
            test('markdown h5', () => {
                expect(parse('##### example')).toMatchSnapshot();
            });
            test('markdown h6', () => {
                expect(parse('###### example')).toMatchSnapshot();
            });
            test('html h1', () => {
                expect(parse('<h1>example</h1>')).toMatchSnapshot();
            });
        });
        describe('bullet list', () => {
            test('markdown marker `-`', () => {
                expect(parse('- example1\n\n- example2')).toMatchSnapshot();
            });
            test('markdown marker `*`', () => {
                expect(parse('* example1\n\n* example2')).toMatchSnapshot();
            });
            test('html', () => {
                expect(parse('<ul><li>example1</li><li>example2</li></ul>')).toMatchSnapshot();
            });
        });
        describe('ordered list', () => {
            test('markdown', () => {
                expect(parse('1. example1\n2. example2')).toMatchSnapshot();
            });
            test('html', () => {
                expect(parse('<ol><li>example1</li><li>example2</li></ol>')).toMatchSnapshot();
            });
        });
        describe('fence', () => {
            test('markdown', () => {
                expect(parse('```\nexample\n```')).toMatchSnapshot();
            });
            test('markdown with lang', () => {
                expect(parse('```js\nexample\n```')).toMatchSnapshot();
            });
            test('markdown with languageClassPrefix', () => {
                expect(parse('```js\nexample\n```', { codeBlock: { languageClassPrefix: 'lang--' } }, true))
                    .toEqual('<pre><code class="lang--js">example</code></pre>');
            })
        });
        describe('code block', () => {
            test('markdown', () => {
                expect(parse('    example')).toMatchSnapshot();
            });
            test('html', () => {
                expect(parse('<pre><code>example</code></pre>')).toMatchSnapshot();
            });
        });
        describe('image', () => {
            test('markdown', () => {
                expect(parse('![example](example.jpg)')).toMatchSnapshot();
            });
            test('markdown inline', () => {
                expect(parse('![example](example.jpg)', { image: { inline: true } })).toMatchSnapshot();
            });
            test('html', () => {
                expect(parse('<img src="example.jpg" alt="example">')).toMatchSnapshot();
            });
        });
        describe('hr', () => {
            test('markdown', () => {
                expect(parse('---')).toMatchSnapshot();
            })
            test('html', () => {
                expect(parse('<hr>')).toMatchSnapshot();
            });
        });
        describe('hard break', () => {
            test('markdown', () => {
                expect(parse('example1  \nexample2')).toMatchSnapshot();
            })
            test('markdown with breaks option', () => {
                expect(parse('example1\nexample2', { breaks: true })).toMatchSnapshot();
            })
            test('html', () => {
                expect(parse('example1<br>example2')).toMatchSnapshot();
            });
        });
        describe('table', () => {
            test('markdown', () => {
                expect(parse(dedent`
                    example1 | example2
                    --- | ---
                    example3 | example4
                `)).toMatchSnapshot();
            });

            test('html', () => {
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
        });
        describe('html', () => {
            test('block', () => {
                expect(parse('<custom-element>example</custom-element>', {
                    htmlNode: {
                        group: 'block',
                        content: 'inline*',
                        parseHTML: () => [{
                            tag: 'custom-element',
                        }],
                    },
                })).toMatchSnapshot();
            });
            test('inline', () => {
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
            test('disabled', () => {
                expect(parse('<custom-element></custom-element>', {
                    html: false,
                    htmlNode: {
                        group: 'block',
                        parseHTML: () => [{
                            tag: 'custom-element',
                        }],
                    },
                })).toMatchSnapshot();
            })
        });
    });
    describe('options', () => {
        describe('inline', () => {
            test('text', () => {
                expect(parse('example', { inline: true })).toMatchSnapshot();
            });
            test('text with spaces', () => {
                expect(parse('  example ', { inline: true })).toMatchSnapshot();
            });
        });
    });
});


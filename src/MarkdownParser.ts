import { Content, Editor, getExtensionField, MarkConfig, NodeConfig } from "@tiptap/core";
import { unified } from "unified";
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeRaw from 'rehype-raw';
import rehypeMinifyWhitespace from 'rehype-minify-whitespace';
import { Root } from 'mdast';

type ParserOptions = {
    html: boolean,
    linkify: boolean,
    breaks: boolean,
}

export class MarkdownParser {
    editor: Editor;
    options: ParserOptions;

    constructor(editor: Editor, options: ParserOptions) {
        this.editor = editor;
        this.options = options;
    }

    parse(content: Content): Content {
        if(typeof content === 'string') {
            const fromMarkdown = unified().use(remarkParse);
            const toHTML = unified()
                .use(remarkRehype, { allowDangerousHtml: true })
                .use(this.options.html ? [rehypeRaw] : [])
                .use(rehypeMinifyWhitespace)
                .use(rehypeStringify);

            this.editor.extensionManager.extensions.forEach(extension => {
                const parseMarkdown = getExtensionField<NodeConfig['parseMarkdown'] | MarkConfig['parseMarkdown']>(
                    extension,
                    'parseMarkdown',
                    {
                        name: extension.name,
                        options: extension.options,
                        editor: this.editor,
                    }
                );
                parseMarkdown?.({
                    fromMarkdown,
                    toHTML,
                });
            });

            const mdTree = fromMarkdown.runSync(fromMarkdown.parse(content), content) as Root;
            const html = toHTML.stringify(toHTML.runSync(mdTree, content));
            return html;
        }

        return content;
    }
}

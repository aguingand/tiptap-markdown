import { Content, Editor, getExtensionField, MarkConfig, NodeConfig } from "@tiptap/core";
import { unified } from "unified";
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeMinifyWhitespace from 'rehype-minify-whitespace';
import { Root } from 'mdast';

export class MarkdownParser {
    editor: Editor;

    constructor(editor: Editor) {
        this.editor = editor;
    }

    parse(content: Content): Content {
        if(typeof content === 'string') {
            const fromMarkdown = unified()
                .use(remarkParse);
            const toHTML = unified()
                .use(remarkRehype)
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

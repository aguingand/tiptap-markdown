import { Content, Editor, getExtensionField, HTMLContent, MarkConfig, NodeConfig } from "@tiptap/core";
import { unified } from "unified";
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeMinifyWhitespace from 'rehype-minify-whitespace';
import { Root } from 'mdast';
import rehypeDomStringify from "rehype-dom-stringify";

type ParseReturn<C> = C extends string ? HTMLContent : C;

export class MarkdownParser {
    editor: Editor;

    constructor(editor: Editor) {
        this.editor = editor;
    }

    parse<C extends Content = Content>(content: C): ParseReturn<C> {
        if(typeof content === 'string') {
            const fromMarkdown = unified()
                .use(remarkParse);
            const toHTML = unified()
                .use(remarkRehype)
                .use(rehypeMinifyWhitespace)
                .use(rehypeDomStringify);

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

            const mdast = fromMarkdown.runSync(fromMarkdown.parse(content), content) as Root;
            const hast = toHTML.runSync(mdast, content);
            const html = toHTML.stringify(hast, content);
            return html as ParseReturn<typeof content>;
        }

        return content as ParseReturn<typeof content>;
    }
}

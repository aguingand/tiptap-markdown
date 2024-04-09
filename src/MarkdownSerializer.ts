import remarkStringify from 'remark-stringify';
import { Content, Editor, getExtensionField, MarkConfig, NodeConfig } from "@tiptap/core";
import { unified } from "unified";
import rehypeRemark from "rehype-remark";
import rehypeParse from "rehype-parse";
import { Root } from "hast";

export class MarkdownSerializer {
    editor: Editor;

    constructor(editor: Editor) {
        this.editor = editor;
    }

    serialize(content: string): string {
        const fromHTML = unified()
            .use(rehypeParse, { fragment: true });
        const toMarkdown = unified()
            .use(rehypeRemark)
            .use(remarkStringify);

        this.editor.extensionManager.extensions.forEach(extension => {
            const renderMarkdown = getExtensionField<NodeConfig['renderMarkdown'] | MarkConfig['renderMarkdown']>(
                extension,
                'renderMarkdown',
                {
                    name: extension.name,
                    options: extension.options,
                    editor: this.editor,
                }
            );
            renderMarkdown?.({
                fromHTML,
                toMarkdown,
            });
        });

        const hast = fromHTML.runSync(fromHTML.parse(content), content) as Root;
        const mdast = toMarkdown.runSync(hast, content);
        const md = toMarkdown.stringify(mdast, content);
        return md;
    }
}

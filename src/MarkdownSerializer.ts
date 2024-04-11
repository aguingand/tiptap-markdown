import remarkStringify from 'remark-stringify';
import { Editor, getExtensionField, getHTMLFromFragment, MarkConfig, NodeConfig } from "@tiptap/core";
import { Node as ProseMirrorNode, Fragment } from "@tiptap/pm/model";
import { unified } from "unified";
import rehypeRemark from "rehype-remark";
import rehypeDomParse from "rehype-dom-parse";
import { Root } from "hast";

export class MarkdownSerializer {
    editor: Editor;

    constructor(editor: Editor) {
        this.editor = editor;
    }

    serialize(content: ProseMirrorNode | Fragment) {
        return this.serializeFromHTML(
            getHTMLFromFragment(Fragment.from(content), this.editor.schema)
        );
    }

    serializeFromHTML(content: string): string {
        const fromHTML = unified()
            .use(rehypeDomParse, { fragment: true });
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

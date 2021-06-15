import { serialize } from "./serialize";
import { parse } from "./parse";
import defaultExtensions from './extensions';

const defaultMarkdownOptions = {
    html: true,
    tightLists: true,
    bulletListMarker: '-',
    linkify: false,
}

export function createMarkdownEditor(Editor) {

    return class extends Editor {

        constructor(options) {
            super(options);
            const { setContent, insertContentAt } = this.commandManager.commands;
            this.commandManager.commands.setContent = (content, emitUpdate, parseOptions) => (props) => {
                return setContent(this.parseMarkdown(content), emitUpdate, parseOptions)(props);
            }
            this.commandManager.commands.insertContentAt = (range, content) => (props) => {
                return insertContentAt(range, this.parseMarkdown(content))(props);
            }
        }

        setOptions(options) {
            super.setOptions(options);
            this.options.markdown = {
                ...defaultMarkdownOptions,
                ...this.options.markdown,
                ...options?.markdown,
            }
        }

        get markdownExtensions() {
            return [
                ...defaultExtensions,
                ...(this.options.markdown.extensions ?? []),
            ]
        }

        createView() {
            const originalContent = this.options.content;
            this.options.content = this.parseMarkdown(this.options.content);

            super.createView();

            this.options.content = originalContent;
        }

        parseMarkdown(content) {
            const { html, linkify } = this.options.markdown;
            const codeBlockNode = this.options.extensions
                .find(extension => extension.type === 'node' && extension.name === 'codeBlock');

            return parse(this.schema, content, {
                extensions: this.markdownExtensions,
                html,
                linkify,
                languageClassPrefix: codeBlockNode?.options.languageClassPrefix,
            });
        }

        getMarkdown() {
            const { html, tightLists, bulletListMarker } = this.options.markdown;
            return serialize(this.schema, this.state.doc, {
                extensions: this.markdownExtensions,
                html,
                tightLists,
                bulletListMarker,
            });
        }
    }
}

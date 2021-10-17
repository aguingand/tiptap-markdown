import { serialize } from "./serialize";
import { parse } from "./parse";
import defaultExtensions from './extensions';
import { MarkdownTightLists } from "./extensions/tiptap/tight-lists";
import { patchCommand } from "./util/editor";


const defaultMarkdownOptions = {
    html: true,
    tightLists: true,
    tightListClass: 'tight',
    bulletListMarker: '-',
    linkify: false,
    breaks: false,
}

export function createMarkdownEditor(Editor) {

    return class extends Editor {

        constructor(options) {
            options = withDefaultTiptapExtensions(options);
            super(options);
            patchCommand(this, 'setContent', setContent =>
                (content, emitUpdate, parseOptions) => (props) => {
                    return setContent(this.parseMarkdown(content), emitUpdate, parseOptions)(props);
                }
            );
            patchCommand(this, 'insertContentAt', insertContentAt =>
                (range, content) => (props) => {
                    return insertContentAt(range, this.parseMarkdown(content, { inline: true }))(props);
                }
            );
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

        parseMarkdown(content, { inline } = {}) {
            const { html, linkify, breaks } = this.options.markdown;

            return parse(this.schema, content, {
                extensions: this.markdownExtensions,
                html,
                linkify,
                inline,
                breaks,
            });
        }

        getMarkdown() {
            const { html, bulletListMarker } = this.options.markdown;
            return serialize(this.schema, this.state.doc, {
                extensions: this.markdownExtensions,
                html,
                bulletListMarker,
            });
        }
    }
}

function withDefaultTiptapExtensions(options) {
    const markdownOptions = {
        ...defaultMarkdownOptions,
        ...options?.markdown,
    }
    return {
        ...options,
        extensions: [
            ...(options?.extensions ?? []),
            MarkdownTightLists.configure({
                tight: markdownOptions.tightLists,
                tightClass: markdownOptions.tightListClass,
            }),
        ],
    }
}

import defaultExtensions from './extensions';
import { MarkdownTightLists } from "./extensions/tiptap/tight-lists";
import { patchCommand } from "./util/editor";
import { MarkdownParser } from "./parse/MarkdownParser";
import { MarkdownSerializer } from "./serialize/MarkdownSerializer";


const defaultMarkdownOptions = {
    html: true,
    tightLists: true,
    tightListClass: 'tight',
    bulletListMarker: '-',
    linkify: false,
    breaks: false,
}

export function createMarkdownEditor(Editor) {

    class MarkdownEditor extends Editor {
        /**
         * @type {MarkdownParser}
         */
        markdownParser;
        /**
         * @type {MarkdownSerializer}
         */
        markdownSerializer;
        /**
         * @type {(MarkdownMark|MarkdownNode)[]}
         */
        markdownExtensions;

        constructor(options) {
            options = withDefaultTiptapExtensions(options);
            super(options);
            this.createMarkdownParser();
            this.createMarkdownSerializer();
            this.markdownExtensions = this.getMarkdownExtensions();

            patchCommand(this, 'setContent', setContent =>
                (content, emitUpdate, parseOptions) => (props) => {
                    return setContent(this.markdownParser.parse(content), emitUpdate, parseOptions)(props);
                }
            );
            patchCommand(this, 'insertContentAt', insertContentAt =>
                (range, content) => (props) => {
                    return insertContentAt(range, this.markdownParser.parse(content, { inline: true }))(props);
                }
            );
        }

        setOptions(options) {
            const markdownOptions = this.options.markdown;
            super.setOptions(options);
            this.options.markdown = {
                ...defaultMarkdownOptions,
                ...markdownOptions,
                ...options?.markdown,
            };
            this.markdownExtensions = this.getMarkdownExtensions();
        }

        getMarkdownExtensions() {
            const extensions = [
                ...defaultExtensions,
                ...(this.options.markdown.extensions ?? []),
            ];
            return extensions.map(extension => extension.forEditor(this));
        }

        createView() {
            if(!this.markdownParser) {
                this.createMarkdownParser();
            }

            const originalContent = this.options.content;
            this.options.content = this.markdownParser.parse(this.options.content);

            super.createView();

            this.options.content = originalContent;
        }

        createMarkdownParser() {
            this.markdownParser = new MarkdownParser(this);
        }

        createMarkdownSerializer() {
            this.markdownSerializer = new MarkdownSerializer(this);
        }

        getMarkdown() {
            return this.markdownSerializer.serialize(this.state.doc);
        }
    }

    return MarkdownEditor;
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

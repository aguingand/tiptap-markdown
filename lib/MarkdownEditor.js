import { serializer } from "./util/serializer";
import { parse } from "./util/parse";

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
            Object.defineProperty(this.options, 'content', {
                get: () => {
                    return this.parseMarkdown(options.content);
                },
            });
        }

        parseMarkdown(content) {
            return parse(this.schema, content);
        }

        getMarkdown() {
            return serializer.serialize(this.state.doc);
        }
    }
}

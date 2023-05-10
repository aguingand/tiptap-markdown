import { defaultMarkdownSerializer } from "prosemirror-markdown";
import { LazyMark } from "../../util/extensions";

const Bold = LazyMark.create({
    name: 'bold',
});

export default Bold.extend({
    addStorage() {
        return {
            markdown: {
                serialize: defaultMarkdownSerializer.marks.strong,
                parse: {
                    // handled by markdown-it
                }
            },
        }
    }
});

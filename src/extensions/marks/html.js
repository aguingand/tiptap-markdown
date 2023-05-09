import { Fragment } from "prosemirror-model";
import { getHTMLFromFragment, Mark } from "@tiptap/core";
import { createMarkdownExtension } from "../../util/extensions";

const HTML = Mark.create({
    name: 'html',
});

export default createMarkdownExtension(HTML, {
    serialize: {
        open(state, mark)  {
            if(!this.markdownOptions.html) {
                console.warn(`Tiptap Markdown: "${mark.type.name}" mark is only available in html mode`);
                return '';
            }
            return getMarkTags(mark)?.[0] ?? '';
        },
        close(state, mark) {
            if(!this.markdownOptions.html) {
                return '';
            }
            return getMarkTags(mark)?.[1] ?? '';
        },
    },
    parse: {
        // handled by markdown-it
    }
});

function getMarkTags(mark) {
    const schema = mark.type.schema;
    const node = schema.text(' ', [mark]);
    const html = getHTMLFromFragment(Fragment.from(node), schema);
    const match = html.match(/^(<.*?>) (<\/.*?>)$/);
    return match ? [match[1], match[2]] : null;
}

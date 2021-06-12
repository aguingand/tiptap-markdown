import { getHTMLFromFragment } from "@tiptap/core";
import { createMarkdownExtension } from "../../util/extensions";
import { Fragment } from "prosemirror-model";


export default createMarkdownExtension({
    serialize: {
        open(state, mark)  {
            const html = true;
            if(!html) {
                console.warn(`Tiptap Markdown: "${mark.type.name}" mark is only available in html mode`);
                return '';
            }
            return getMarkTags(mark)?.[0] ?? '';
        },
        close(state, mark) {
            const html = true;
            if(!html) {
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

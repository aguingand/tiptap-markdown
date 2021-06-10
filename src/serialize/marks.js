import { getHTMLFromFragment } from "@tiptap/core";
import { Fragment } from "prosemirror-model";
import { defaultMarkdownSerializer } from "prosemirror-markdown";

function getMarkTags(mark) {
    const schema = mark.type.schema;
    const node = schema.text(' ', [mark]);
    const html = getHTMLFromFragment(Fragment.from(node), schema);
    const match = html.match(/^(<.*?>) (<\/.*?>)$/);
    return match ? [match[1], match[2]] : null;
}

function getHTMLSerializer() {
    return {
        open(state, mark)  {
            return getMarkTags(mark)?.[0] ?? '';
        },
        close(state, mark) {
            return getMarkTags(mark)?.[1] ?? '';
        },
    }
}

function getHTMLFallbackSerializer() {
    return {
        open(state, mark) {
            console.warn(`Tiptap Markdown: "${mark.type.name}" is only available in html mode`);
            return '';
        },
        close: '',
    }
}

export function getMarks(schema, { html }) {
    const { marks } = defaultMarkdownSerializer;
    return {
        ...Object.fromEntries(
            Object.entries(schema.marks).map(([name, markType]) => [
                name,
                html ? getHTMLSerializer() : getHTMLFallbackSerializer(),
            ])
        ),
        bold: marks.strong,
        italic: marks.em,
        strike: {open:'~~', close:'~~', expelEnclosingWhitespace: true},
        code: marks.code,
        link: marks.link,
        highlight: {open:'==', close:'==', expelEnclosingWhitespace: true},
    }
}

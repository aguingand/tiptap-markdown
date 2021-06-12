import { getHTMLFromFragment } from "@tiptap/core";
import { Fragment } from "prosemirror-model";
import { defaultMarkdownSerializer } from "prosemirror-markdown";




function getHTMLFallbackSerializer() {
    return {
        open(state, mark) {
            console.warn(`Tiptap Markdown: "${mark.type.name}" mark is only available in html mode`);
            return '';
        },
        close: '',
    }
}

export function getDefaultMarks(schema) {
    return {
        ...Object.fromEntries(
            Object.entries(schema.marks).map(([name, markType]) => [
                name,
                // html mark extension
            ])
        ),
    }
}

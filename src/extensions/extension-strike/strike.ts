import { Mark } from "@tiptap/core";
import { gfmStrikethrough } from 'micromark-extension-gfm-strikethrough';
import { gfmStrikethroughFromMarkdown } from "mdast-util-gfm-strikethrough";

const Strike = Mark.create({
    name: 'strike',
});

export default Strike.extend({
    parseMarkdown({ fromMarkdown }) {
        (fromMarkdown.data().micromarkExtensions ??= []).push(gfmStrikethrough());
        (fromMarkdown.data().fromMarkdownExtensions ??= []).push(gfmStrikethroughFromMarkdown());
    },
    renderMarkdown() {
        // handled by remark-gfm
    },
});

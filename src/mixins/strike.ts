import { gfmStrikethrough } from 'micromark-extension-gfm-strikethrough';
import { gfmStrikethroughFromMarkdown, gfmStrikethroughToMarkdown } from "mdast-util-gfm-strikethrough";
import type { Strike } from "@tiptap/extension-strike";
import { MarkMixin } from "../types";

export const strike: MarkMixin<typeof Strike> = (Strike) => (
    Strike.extend({
        parseMarkdown({ fromMarkdown }) {
            (fromMarkdown.data().micromarkExtensions ??= []).push(gfmStrikethrough());
            (fromMarkdown.data().fromMarkdownExtensions ??= []).push(gfmStrikethroughFromMarkdown());
        },
        renderMarkdown({ toMarkdown }) {
            (toMarkdown.data().toMarkdownExtensions ??= []).push(gfmStrikethroughToMarkdown());
        },
    })
);

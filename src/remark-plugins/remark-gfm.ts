import { Processor } from 'unified';
import { gfmAutolinkLiteral } from 'micromark-extension-gfm-autolink-literal'
import { gfmFootnote } from 'micromark-extension-gfm-footnote'
import { gfmStrikethrough } from 'micromark-extension-gfm-strikethrough'
import { gfmTable } from 'micromark-extension-gfm-table'
import { gfmTaskListItem } from 'micromark-extension-gfm-task-list-item'
import { gfmAutolinkLiteralFromMarkdown } from "mdast-util-gfm-autolink-literal";
import { gfmFootnoteFromMarkdown } from "mdast-util-gfm-footnote";
import { gfmStrikethroughFromMarkdown } from "mdast-util-gfm-strikethrough";
import { gfmTableFromMarkdown } from "mdast-util-gfm-table";
import { gfmTaskListItemFromMarkdown } from "mdast-util-gfm-task-list-item";
import { gfmToMarkdown } from 'mdast-util-gfm'

/**
 * @see import('remark-gfm/lib/index.js')
 * @see import('micromark-extension-gfm/index.js')
 * @see import('mdast-util-gfm/lib/index.js')
 */
export function remarkGfm(this: Processor, options: { autolink: boolean }) {
    const data = this.data();

    const micromarkExtensions =
        data.micromarkExtensions || (data.micromarkExtensions = []);
    const fromMarkdownExtensions =
        data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
    const toMarkdownExtensions =
        data.toMarkdownExtensions || (data.toMarkdownExtensions = []);

    if(options.autolink) {
        micromarkExtensions.push(
            gfmAutolinkLiteral(),
        );
        fromMarkdownExtensions.push(
            gfmAutolinkLiteralFromMarkdown(),
        );
    }

    micromarkExtensions.push(
        gfmFootnote(),
        gfmStrikethrough(),
        gfmTable(),
        gfmTaskListItem()
    );
    fromMarkdownExtensions.push(
        gfmFootnoteFromMarkdown(),
        gfmStrikethroughFromMarkdown(),
        gfmTableFromMarkdown(),
        gfmTaskListItemFromMarkdown()
    );
    toMarkdownExtensions.push(gfmToMarkdown());
}

import { gfmTable } from 'micromark-extension-gfm-table'
import { gfmTableFromMarkdown, gfmTableToMarkdown } from "mdast-util-gfm-table";
import { Html } from "mdast";
import { rehypeRemarkHardBreakHandlers } from "../extension-hard-break/hard-break";
import rehypeRemark from "rehype-remark";
import { defaultHandlers as rehypeRemarkDefaultHandlers } from "hast-util-to-mdast";
import { toHtml } from 'hast-util-to-html';
import { visit } from "unist-util-visit";
import type { Table } from "@tiptap/extension-table";
import { NodeMixin } from "../../types";

export const table: NodeMixin<typeof Table> = (Table) => (
    Table.extend({
        parseMarkdown({ fromMarkdown }) {
            (fromMarkdown.data().micromarkExtensions ??= []).push(gfmTable());
            (fromMarkdown.data().fromMarkdownExtensions ??= []).push(gfmTableFromMarkdown());
        },
        renderMarkdown({ toMarkdown }) {
            (toMarkdown.data().toMarkdownExtensions ??= []).push(gfmTableToMarkdown());
            toMarkdown
                .use(rehypeRemark, {
                    handlers: {
                        table(state, node) {
                            let shouldRenderHtml = false;
                            let rowIndex = 0;

                            node.properties.style = null;
                            node.children = node.children
                                .filter(child => child.type === 'element' && child.tagName !== 'colgroup');

                            visit(node, function (child) {
                                if (child.type === 'element') {
                                    if(child.tagName === 'table' && node !== child) {
                                        shouldRenderHtml = true;
                                    }
                                    if(child.tagName === 'tr') {
                                        rowIndex++
                                    }
                                    if(child.tagName === 'th' || child.tagName === 'td') {
                                        shouldRenderHtml ||= (
                                            !!child.properties.colSpan && Number(child.properties.colSpan) > 1
                                            || !!child.properties.rowSpan && Number(child.properties.rowSpan) > 1
                                            || child.tagName === 'td' && rowIndex < 2 // td in first row
                                            || child.tagName === 'th' && rowIndex > 1 // th in body row
                                            || child.children.length > 1 // multiple paragraphs
                                        );
                                        if(Number(child.properties.colSpan) === 1) {
                                            delete child.properties.colSpan;
                                        }
                                        if(Number(child.properties.rowSpan) === 1) {
                                            delete child.properties.rowSpan;
                                        }
                                        if(child.children.length === 1
                                            && child.children[0]?.type === 'element'
                                            && child.children[0].tagName === 'p'
                                        ) {
                                            child.children = child.children[0].children;
                                        }
                                    }
                                }
                            });

                            if(shouldRenderHtml) {
                                const result: Html = { type: 'html', value: toHtml(node) };
                                state.patch(node, result);
                                return result;
                            }

                            return rehypeRemarkDefaultHandlers.table(state, node);
                        },
                        br(state, node) {
                            if(state.inTable) {
                                const result: Html = { type: 'html', value: toHtml(node) }
                                state.patch(node, result)
                                return result;
                            }
                            return rehypeRemarkHardBreakHandlers.br(state, node);
                        }
                    }
                });
        },
    })
);

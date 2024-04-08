// import markdownExtensions from "../extensions";
import {Editor, Node, Mark, NodeConfig, MarkConfig} from "@tiptap/core";
import {MarkType, NodeType} from "@tiptap/pm/model";
import { MarkdownMarkConfig, MarkdownNodeConfig } from "../types";


// export function getMarkdownSpec(extension) {
//     const markdownSpec = extension.storage?.markdown;
//     const defaultMarkdownSpec = markdownExtensions.find(e => e.name === extension.name)?.storage.markdown;
//
//     if(markdownSpec || defaultMarkdownSpec) {
//         return {
//             ...defaultMarkdownSpec,
//             ...markdownSpec,
//         };
//     }
//
//     return null;
// }

export function getMarkdownSpec<
    Type extends NodeType | MarkType,
    Extension extends (Type extends NodeType ? Node : Mark) = (Type extends NodeType ? Node : Mark)
>(editor: Editor, type: Type): (Type extends NodeType ? MarkdownNodeConfig : MarkdownMarkConfig) | null
{
    const extension = editor.extensionManager.extensions.find(e => e.name === type.name) as Extension;
    // const defaultExtension = markdownExtensions.find(e => e.name === type.name) as Extension;

    // if(extension || defaultExtension) {
    //     return Object.assign({}, defaultExtension?.config, extension?.config);
    // }

    if(extension && extension.config.parseMarkdown && extension.config.renderMarkdown) {
        const context = {
            editor,
            options: extension.options
        };
        return {
            parseMarkdown: {
                match: extension.config.parseMarkdown.match,
                handle: extension.config.parseMarkdown.handle.bind(context),
            },
            renderMarkdown: extension.config.renderMarkdown.bind(context),
        };
    }

    return null;
}

import markdownExtensions from "../extensions";
import {Editor, Node, Mark, NodeConfig, MarkConfig} from "@tiptap/core";
import {MarkType, NodeType} from "@tiptap/pm/model";


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
>(editor: Editor, type: Type): MarkConfig | NodeConfig | null
{
    const extension = editor.extensionManager.extensions.find(e => e.name === type.name) as Extension;
    // const defaultExtension = markdownExtensions.find(e => e.name === type.name) as Extension;

    // if(extension || defaultExtension) {
    //     return Object.assign({}, defaultExtension?.config, extension?.config);
    // }

    if(extension) {
        return extension.config;
    }

    return null;
}

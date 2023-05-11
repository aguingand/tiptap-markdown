import markdownExtensions from "../extensions";


export function getMarkdownConfig(extension) {
    return extension.storage?.markdown
        ?? markdownExtensions.find(e => e.name === extension.name)?.storage.markdown;
}

import Html from "../extensions/nodes/html";

function getSerialize(serialize, options) {
    return serialize.bind({ markdownOptions: options });
}

export function getNodes(schema, extensions, options) {
    const nodes = Object.fromEntries(
        extensions
            ?.filter(extension => extension.type.type === 'node' && extension.serialize)
            .map(extension => [
                extension.type.name,
                getSerialize(extension.serialize, options)
            ])
        ?? []
    );
    return {
        ...getDefaultNodes(schema, extensions, options),
        ...nodes
    }
}

export function getDefaultNodes(schema, extensions, options) {
    const htmlExtension = extensions.find(extension =>
        extension.type.type === 'node' &&
        extension.type.name === 'html'
    ) ?? Html;

    return Object.fromEntries(
        Object.entries(schema.nodes).map(([name, markType]) => [
            name,
            getSerialize(htmlExtension.serialize, options)
        ])
    )
}

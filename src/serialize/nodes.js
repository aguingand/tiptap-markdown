import HTMLNode from "../extensions/nodes/html";


export function getNodes(schema, extensions) {
    const nodes = Object.fromEntries(
        extensions
            ?.filter(extension => extension.type === 'node' && extension.serialize)
            .map(extension => [extension.name, extension.serialize])
        ?? []
    );
    return {
        ...getDefaultNodes(schema, extensions),
        ...nodes
    }
}

export function getDefaultNodes(schema, extensions) {
    const htmlNode = extensions.find(extension => extension.is(HTMLNode));

    return Object.fromEntries(
        Object.entries(schema.nodes).map(([name, markType]) => [
            name,
            htmlNode.serialize
        ])
    )
}

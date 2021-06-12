


export function getDefaultlNodes(schema) {
    return {
        ...Object.fromEntries(
            Object.entries(schema.nodes).map(([name, node]) => [
                name,
                // html node extension
            ])
        ),
    }
}

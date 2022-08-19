import HTMLMark from '../extensions/marks/html';

export function getMarks(schema, extensions) {
    const marks = Object.fromEntries(
        extensions
            ?.filter(extension => extension.type === 'mark')
            .map(extension => [extension.name, extension.serialize])
        ?? []
    );
    return {
        ...getDefaultMarks(schema, extensions),
        ...marks,
    }
}

export function getDefaultMarks(schema, extensions) {
    const htmlMark = extensions.find(extension => extension.is(HTMLMark));

    return Object.fromEntries(
        Object.entries(schema.marks).map(([name, markType]) => [
            name,
            htmlMark.serialize
        ])
    )
}

import Html from '../extensions/marks/html';


function getSerializeOptions(serialize, markdownOptions) {
    const options = { ...serialize };
    if(typeof serialize?.open === 'function') {
        options.open = options.open.bind({ markdownOptions });
    }
    if(typeof serialize?.close === 'function') {
        options.close = options.close.bind({ markdownOptions });
    }
    return options;
}

export function getMarks(schema, extensions, options) {
    const marks = Object.fromEntries(
        extensions
            ?.filter(extension => extension.type.type === 'mark')
            .map(extension => [
                extension.type.name,
                getSerializeOptions(extension.serialize, options)
            ])
        ?? []
    );
    return {
        ...getDefaultMarks(schema, extensions, options),
        ...marks,
    }
}

export function getDefaultMarks(schema, extensions, options) {
    const htmlExtension = extensions.find(extension =>
        extension.type.type === 'mark' &&
        extension.type.name === 'html'
    ) ?? Html;

    return Object.fromEntries(
        Object.entries(schema.marks).map(([name, markType]) => [
            name,
            getSerializeOptions(htmlExtension.serialize, options)
        ])
    )
}

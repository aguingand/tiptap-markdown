
function getSerializeOptions(type, options) {
    const name = type?.name;
    if(!name) {
        return null;
    }
    if(type.type === 'mark') {
        return {
            marks: {
                [name]: options.serialize,
            },
        }
    }
    if(type.type === 'node') {
        return {
            nodes: {
                [name]: options.serialize,
            },
        }
    }
}

export function createMarkdownExtension(type, options) {
    const resolvedOptions = arguments.length > 1 ? options : type;

    return {
        type,
        serialize: resolvedOptions.serialize,
        parse: resolvedOptions.parse,
        extend(type, options) {
            const extendOptions = arguments.length > 1 ? options : type;
            return createMarkdownExtension(type, {
                ...resolvedOptions,
                ...extendOptions,
            })
        },
    }
}

export function getMarks(extensions) {
    return Object.fromEntries(
        extensions
            ?.filter(extension => extension.type.type === 'mark')
            .map(extension => [extension.type.name, extension.serialize])
            .flat() ?? []
    );
}

export function getNodes(extensions) {
    return Object.fromEntries(
        extensions
            ?.filter(extension => extension.type.type === 'node')
            .map(extension => [extension.type.name, extension.serialize])
            .flat() ?? []
    );
}

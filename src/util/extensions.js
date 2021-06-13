

export function createMarkdownExtension(type, options) {
    return {
        type,
        serialize: options.serialize,
        parse: options.parse,
        extend(extendOptions) {
            return createMarkdownExtension(type, {
                ...options,
                ...extendOptions,
            });
        },
    }
}


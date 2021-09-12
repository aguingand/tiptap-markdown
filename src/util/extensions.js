

export function createMarkdownExtension(type, options) {
    return {
        type,
        serialize: options.serialize,
        parse: options.parse,
        updateExtension: options.updateExtension,
        extend(extendOptions) {
            return createMarkdownExtension(type, {
                ...options,
                ...extendOptions,
            });
        },
    }
}


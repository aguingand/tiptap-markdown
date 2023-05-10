import {Mark, Node} from "@tiptap/core";

class MarkdownExtension {
    spec = null;
    /**
     * @type {import('@tiptap/core').Editor}
     */
    editor = null;
    /**
     * @type {import('@tiptap/core').Extension}
     */
    baseExtension = null;

    constructor(baseExtension, spec) {
        this.baseExtension = baseExtension;
        this.spec = spec;
    }

    static create(baseExtension, spec) {
        return new this(baseExtension, spec);
    }

    get parse() {
        return {
            setup: this.spec.parse?.setup?.bind(this),
            updateDOM: this.spec.parse?.updateDOM?.bind(this),
        };
    }

    get name() {
        return this.baseExtension.name;
    }

    get type() {
        return this.baseExtension.type;
    }

    get options() {
        return this.resolvedExtension?.options;
    }

    get schema() {
        return this.editor.schema;
    }

    get resolvedExtension() {
        return this.editor?.extensionManager.extensions.find(extension => extension.name === this.name);
    }

    forEditor(editor) {
        const extension = new this.constructor(this.baseExtension, this.spec);
        extension.editor = editor;
        return extension;
    }

    is(extension) {
        return extension.name === this.name;
    }
}

export class MarkdownNode extends MarkdownExtension {
    get serialize() {
        return this.spec.serialize.bind(this);
    }
}

export class MarkdownMark extends MarkdownExtension {
    get serialize() {
        const { open, close } = this.spec.serialize;
        return {
            ...this.spec.serialize,
            open: typeof open === 'function' ? open.bind(this) : open,
            close: typeof close === 'function' ? close.bind(this) : close,
        }
    }
}


export function resolveLazyExtensionName(extensionName) {
    return extensionName.replace(/^markdownLazy_/, '');
}

export class LazyMark extends Mark {
    static create(config) {
        return new this({
            ...config,
            name: `markdownLazy_${config.name}`,
            priority: 1000,
        });
    }
}

export class LazyNode extends Node {
    static create(config) {
        return new this({
            ...config,
            name: `markdownLazy_${config.name}`,
            priority: 1000,
            onBeforeCreate() {
                // this.storage.serialize = this.storage.serialize.bind(this);
            },
        });
    }
}

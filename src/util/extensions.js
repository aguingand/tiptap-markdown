
class MarkdownExtension {
    serialize = null;
    parse = {
        setup() {},
        updateDOM() {},
    };
    /**
     * @type {import('@tiptap/core').Editor}
     */
    editor = null;
    /**
     * @type {import('@tiptap/core').Extension}
     */
    baseExtension = null;

    constructor(spec) {
        this.parse = {
            setup: spec.parse?.setup?.bind(this),
            updateDOM: spec.parse?.updateDOM?.bind(this),
        };
        this.serialize = spec.serialize;
    }

    static create(baseExtension, spec) {
        return new this(spec).setBaseExtension(baseExtension);
    }

    get name() {
        return this.baseExtension.name;
    }

    get type() {
        return this.baseExtension.type;
    }

    get options() {
        return this.resolvedExtension.options;
    }

    get schema() {
        return this.editor.schema;
    }

    get resolvedExtension() {
        return this.editor.extensionManager.extensions.find(extension => extension.name === this.name);
    }

    setBaseExtension(extension) {
        this.baseExtension = extension;
        return this;
    }

    setEditor(editor) {
        this.editor = editor;
        return this;
    }

    is(extension) {
        return extension.type === this.type
            && extension.name === this.name;
    }
}

export class MarkdownNode extends MarkdownExtension {
    serialize = () => null;

    constructor(spec) {
        super(spec);
        this.serialize = spec.serialize.bind(this);
    }
}

export class MarkdownMark extends MarkdownExtension {
    serialize = {
        open: null,
        close: null,
    }

    constructor(spec) {
        super(spec);
        this.serialize = spec.serialize;
        if(typeof this.serialize.open === 'function') {
            this.serialize.open = this.serialize.open.bind(this);
        }
        if(typeof this.serialize.close === 'function') {
            this.serialize.close = this.serialize.close.bind(this);
        }
    }
}


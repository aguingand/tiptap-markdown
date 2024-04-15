import {
    Extension,
    getSchemaByResolvedExtensions, Mark,
    Node,
    getExtensionField
} from "@tiptap/core";
import { MarkMixin, NodeMixin } from "../types";
import { DOMSerializer } from "@tiptap/pm/model";

export const LoadMixins = Extension.create<{ mixins: { [name: string]: NodeMixin | MarkMixin } }>({
    name: 'loadMixins',
    priority: 1000,
    onBeforeCreate() {
        const editor = this.editor;
        const extensions = this.editor.extensionManager.extensions.map((extension) => {
            const extended = extension.extend({
                addOptions() {
                    return {
                        ...extension.options, // preserve initial configured options
                    }
                },
                addStorage() {
                    return {
                        ...this.parent?.(),
                        markdown: editor.storage.markdown,
                    }
                },
                ...getExtensionField(extension, 'renderHTML') && {
                    renderHTML(props) {
                        const spec = this.parent!(props);
                        const rendered = DOMSerializer.renderSpec(document, spec);
                        if(rendered.dom instanceof HTMLElement) {
                            if(extension instanceof Node) {
                                rendered.dom.setAttribute('data-node', this.name);
                            } else if(extension instanceof Mark) {
                                rendered.dom.setAttribute('data-mark', this.name);
                            }
                        }
                        return rendered;
                    }
                }
            });

            if(extension.name in this.options.mixins) {
                return this.options.mixins[extension.name]!(extended as Node & Mark);
            }
            return extended;
        });
        this.editor.extensionManager.extensions = extensions;
        this.editor.extensionManager.schema = getSchemaByResolvedExtensions(
            this.editor.extensionManager.extensions,
            this.editor
        );
        this.editor.schema = this.editor.extensionManager.schema;
    }
});

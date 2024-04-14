import {
    Extension,
    getSchemaByResolvedExtensions, Mark,
    Node,
} from "@tiptap/core";
import { MarkMixin, NodeMixin } from "../types";


export const LoadMixins = Extension.create<{ mixins: { [name: string]: NodeMixin | MarkMixin } }>({
    name: 'loadMixins',
    priority: 1000,
    onBeforeCreate() {
        const editor = this.editor;
        const extensions = this.editor.extensionManager.extensions.map((extension) => {
            if(extension.name in this.options.mixins) {
                return this.options.mixins[extension.name]!(extension.extend({
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
                }) as Node & Mark);
            }
            return extension;
        });
        this.editor.extensionManager.extensions = extensions;
        this.editor.extensionManager.schema = getSchemaByResolvedExtensions(
            this.editor.extensionManager.extensions,
            this.editor
        );
        this.editor.schema = this.editor.extensionManager.schema;
    }
});

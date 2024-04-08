import { Node } from "@tiptap/core";
import { ImageOptions } from "@tiptap/extension-image";


const Image = Node.create<ImageOptions>({
    name: 'image',
});

export default Image.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            inline: true, // markdown images are always inline
        }
    },
    parseMarkdown() {
        // handled by remark
    },
    renderMarkdown() {
        // handled by remark
    },
});

import type { Image } from "@tiptap/extension-image";
import { NodeMixin } from "../load-mixins/types";


export const image: NodeMixin<typeof Image> = (Image) => (
    Image.extend({
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
    })
);

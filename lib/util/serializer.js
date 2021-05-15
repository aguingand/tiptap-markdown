import { defaultMarkdownSerializer, MarkdownSerializer } from 'prosemirror-markdown';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';

const { marks, nodes } = defaultMarkdownSerializer;

export const serializer = new MarkdownSerializer({
    ...nodes,
    table() {

    },
}, {
    ...marks,
    [Bold.name]: marks.strong,
    [Italic.name]: marks.em,
    // [Underline.prototype.name]: {open:'',close:''},
    [Strike.name]: {open:'~~', close:'~~'},
});

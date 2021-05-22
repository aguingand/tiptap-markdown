<template>
    <div class="editor card m-5">
        <div class="card-header">
            <MenuBar :editor="editor" />
        </div>

        <EditorContent class="editor__content" style="margin: -1px" :editor="editor" />

        <textarea class="form-control card-body" rows="10" ref="markdown" v-model="markdown" @input="handleInput"></textarea>
    </div>
</template>

<script>
    import StarterKit from '@tiptap/starter-kit';
    import { createMarkdownEditor } from "../../lib/MarkdownEditor";
    import { Editor, EditorContent } from '@tiptap/vue-3';
    import MenuBar from "./MenuBar.vue";


    export default {
        components: {
            EditorContent,
            MenuBar,
        },
        data() {
            return {
                editor: null,
                markdown: null,
            }
        },
        methods: {
            updateMarkdownOutput() {
                this.markdown = this.editor.getMarkdown();
            },
            handleInput() {
                this.editor.commands.setContent(this.markdown);
            },
        },
        mounted() {
            const MarkdownEditor = createMarkdownEditor(Editor);
            this.editor = new MarkdownEditor({
                extensions: [
                    StarterKit,
                ],
                content: `## Tables`,
                onUpdate: () => {
                    this.updateMarkdownOutput();
                },
            });
            this.editor.view.dom.classList.add('form-control');
            this.editor.view.dom.classList.add('card-body');
            this.updateMarkdownOutput();
        },
    }
</script>

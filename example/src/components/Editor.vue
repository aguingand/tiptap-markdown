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
    import { Editor, EditorContent } from '@tiptap/vue-3';
    import StarterKit from '@tiptap/starter-kit';
    import Table from '@tiptap/extension-table';
    import TableRow from '@tiptap/extension-table-row';
    import TableCell from '@tiptap/extension-table-cell';
    import TableHeader from '@tiptap/extension-table-header';
    import Underline from '@tiptap/extension-underline';
    import { createMarkdownEditor } from "../../../src/MarkdownEditor";
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
                    Table.configure({
                        resizable: false,
                    }),
                    TableRow,
                    TableHeader,
                    TableCell,
                    Underline,
                ],
                content: `## Tables
dedzedfze

<p>fzfzfzfzfezf</p>

fzefzefzefez
                `,
                html: true,
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

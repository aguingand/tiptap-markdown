<template>
    <div class="editor card m-5">
        <div class="card-header">
            <MenuBar :editor="editor" />
        </div>


        <EditorContent class="editor__content" style="margin: -1px" :editor="editor" />

        <textarea class="form-control card-body" rows="10" ref="markdown"></textarea>
    </div>
</template>

<script>
    import { Editor, EditorContent } from 'tiptap';
    import {
        Blockquote,
        CodeBlock,
        HardBreak,
        Heading,
        OrderedList,
        BulletList,
        ListItem,
        TodoItem,
        TodoList,
        Bold,
        Code,
        Italic,
        Link,
        Table,
        TableHeader,
        TableCell,
        TableRow,
        Strike,
        Underline,
        History,
    } from 'tiptap-extensions'

    import { defaultMarkdownSerializer, MarkdownSerializer } from 'prosemirror-markdown';
    import MenuBar from "./MenuBar.vue";



    export default {
        components: {
            EditorContent,
            MenuBar,
        },
        data() {
            return {
                editor: null,
            }
        },
        methods: {
            updateMarkdownOutput() {
                const doc = this.editor.view.state.doc;
                const { nodes, marks } = defaultMarkdownSerializer;
                const serializer = new MarkdownSerializer({
                    ...nodes,
                    table() {

                    },
                }, {
                    ...marks,
                    [Bold.prototype.name]: marks.strong,
                    [Italic.prototype.name]: marks.em,
                    [Underline.prototype.name]: {open:'',close:''},
                    [Strike.prototype.name]: {open:'~~', close:'~~'}
                });
                this.$refs.markdown.value = serializer.serialize(doc);
            },
        },
        mounted() {
            this.editor = new Editor({
                extensions: [
                    new Blockquote(),
                    new BulletList(),
                    new CodeBlock(),
                    new HardBreak(),
                    new Heading({ levels: [1, 2, 3] }),
                    new ListItem(),
                    new OrderedList(),
                    new TodoItem(),
                    new TodoList(),
                    new Link(),
                    new Bold(),
                    new Code(),
                    new Italic(),
                    new Strike(),
                    new Underline(),
                    new History(),
                    new Table({
                        resizable: true,
                    }),
                    new TableHeader(),
                    new TableCell(),
                    new TableRow(),
                ],
                content: `
                    <h2>
                      Tables
                    </h2>
                    <p>
                      Tables come with some useful commands like adding, removing or merging rows and columns.
                      Navigate with <code>tab</code> or arrow keys. Resizing is also supported.
                    </p>
                    <table>
                        <tr>
                            <th colspan="3" data-colwidth="100,0,0">Wide header</th>
                        </tr>
                        <tr>
                            <td>One</td>
                            <td>Two</td>
                            <td>Three</td>
                        </tr>
                        <tr>
                            <td>Four</td>
                            <td>Five</td>
                            <td>Six</td>
                        </tr>
                    </table>
                `,
                onUpdate:() => {
                    this.updateMarkdownOutput();
                },
            });
            this.editor.view.dom.classList.add('form-control');
            this.editor.view.dom.classList.add('card-body');
            this.updateMarkdownOutput();
        },
    }
</script>

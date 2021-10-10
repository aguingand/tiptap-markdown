<template>
    <div v-if="editor">
        <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
            bold
        </button>
        <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
            italic
        </button>
        <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
            strike
        </button>
        <button @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
            underline
        </button>
        <button @click="editor.chain().focus().toggleTight().run()" :class="{ 'is-active': editor.isActive({ tight:true }) }">
            toggle tight
        </button>
        <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
            insertTable
        </button>
        <button @click="editor.chain().focus().addColumnBefore().run()" :disabled="!editor.can().addColumnBefore()">
            addColumnBefore
        </button>
        <button @click="editor.chain().focus().addColumnAfter().run()" :disabled="!editor.can().addColumnAfter()">
            addColumnAfter
        </button>
        <button @click="editor.chain().focus().deleteColumn().run()" :disabled="!editor.can().deleteColumn()">
            deleteColumn
        </button>
        <button @click="editor.chain().focus().addRowBefore().run()" :disabled="!editor.can().addRowBefore()">
            addRowBefore
        </button>
        <button @click="editor.chain().focus().addRowAfter().run()" :disabled="!editor.can().addRowAfter()">
            addRowAfter
        </button>
        <button @click="editor.chain().focus().deleteRow().run()" :disabled="!editor.can().deleteRow()">
            deleteRow
        </button>
        <button @click="editor.chain().focus().deleteTable().run()" :disabled="!editor.can().deleteTable()">
            deleteTable
        </button>
<!--        <button @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">-->
<!--            code-->
<!--        </button>-->
<!--        <button @click="editor.chain().focus().unsetAllMarks().run()">-->
<!--            clear marks-->
<!--        </button>-->
<!--        <button @click="editor.chain().focus().clearNodes().run()">-->
<!--            clear nodes-->
<!--        </button>-->
<!--        <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">-->
<!--            paragraph-->
<!--        </button>-->
<!--        <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">-->
<!--            h1-->
<!--        </button>-->
<!--        <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">-->
<!--            h2-->
<!--        </button>-->
<!--        <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">-->
<!--            h3-->
<!--        </button>-->
<!--        <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">-->
<!--            h4-->
<!--        </button>-->
<!--        <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">-->
<!--            h5-->
<!--        </button>-->
<!--        <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">-->
<!--            h6-->
<!--        </button>-->
<!--        <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">-->
<!--            bullet list-->
<!--        </button>-->
<!--        <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">-->
<!--            ordered list-->
<!--        </button>-->
<!--        <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">-->
<!--            code block-->
<!--        </button>-->
<!--        <button @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">-->
<!--            blockquote-->
<!--        </button>-->
<!--        <button @click="editor.chain().focus().setHorizontalRule().run()">-->
<!--            horizontal rule-->
<!--        </button>-->
<!--        <button @click="editor.chain().focus().setHardBreak().run()">-->
<!--            hard break-->
<!--        </button>-->
<!--        <button @click="editor.chain().focus().undo().run()">-->
<!--            undo-->
<!--        </button>-->
<!--        <button @click="editor.chain().focus().redo().run()">-->
<!--            redo-->
<!--        </button>-->
    </div>
</template>

<script>
    export default {
        props: {
            editor: Object,
        }
    }
</script>

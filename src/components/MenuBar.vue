<template>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">
            <div class="toolbar">
<!--                <button-->
<!--                    class="menubar__button btn"-->
<!--                    @click="commands.undo"-->
<!--                >-->
<!--                    <i class="fas fa-undo" />-->
<!--                </button>-->

<!--                <button-->
<!--                    class="menubar__button btn"-->
<!--                    @click="commands.redo"-->
<!--                >-->
<!--                    <i class="fas fa-redo" />-->
<!--                </button>-->

                <button
                    class="menubar__button btn"
                    :class="{ 'is-active': isActive.bold() }"
                    @click="commands.bold"
                >
                    <i class="fas fa-bold" />
                </button>

                <button
                    class="menubar__button btn"
                    :class="{ 'is-active': isActive.italic() }"
                    @click="commands.italic"
                >
                    <i class="fas fa-italic" />
                </button>

                <button
                    class="menubar__button btn"
                    :class="{ 'is-active': isActive.strike() }"
                    @click="commands.strike"
                >
                    <i class="fas fa-strikethrough" />
                </button>

                <button
                    class="menubar__button btn"
                    :class="{ 'is-active': isActive.underline() }"
                    @click="commands.underline"
                >
                    <i class="fas fa-underline" />
                </button>

                <button
                    class="menubar__button btn"
                    :class="{ 'is-active': isActive.code() }"
                    @click="commands.code"
                >
                    <i class="fas fa-code" />
                </button>

                <button
                    class="menubar__button btn"
                    :class="{ 'is-active': isActive.paragraph() }"
                    @click="commands.paragraph"
                >
                    <i class="fas fa-paragraph" />
                </button>

                <button
                    class="menubar__button btn"
                    :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                    @click="commands.heading({ level: 1 })"
                >
                    H1
                </button>

                <button
                    class="menubar__button btn"
                    :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                    @click="commands.heading({ level: 2 })"
                >
                    H2
                </button>

                <button
                    class="menubar__button btn"
                    :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                    @click="commands.heading({ level: 3 })"
                >
                    H3
                </button>

                <button
                    class="menubar__button btn"
                    :class="{ 'is-active': isActive.bullet_list() }"
                    @click="commands.bullet_list"
                >
                    <i class="fas fa-list-ul" />
                </button>

                <button
                    class="menubar__button btn"
                    :class="{ 'is-active': isActive.ordered_list() }"
                    @click="commands.ordered_list"
                >
                    <i class="fas fa-list-ol" />
                </button>

                <button
                    class="menubar__button btn"
                    :class="{ 'is-active': isActive.blockquote() }"
                    @click="commands.blockquote"
                >
                    <i class="fas fa-quote-right" />
                </button>

                <button
                    class="menubar__button btn"
                    :class="{ 'is-active': isActive.code_block() }"
                    @click="commands.code_block"
                >
                    <i class="fas fa-code" />
                </button>

                <button
                    class="menubar__button btn"
                    @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
                >
                    <i class="fas fa-table" />
                </button>

                <span :class="{ 'hidden': isActive.table() }">
                    <button
                        class="menubar__button btn"
                        @click="commands.deleteTable"
                    >
                        <i class="fas fa-delete_table" />
                    </button>
                    <button
                        class="menubar__button btn"
                        @click="commands.addColumnBefore"
                    >
                        <i class="fas fa-add_col_before" />
                    </button>
                    <button
                        class="menubar__button btn"
                        @click="commands.addColumnAfter"
                    >
                        <i class="fas fa-add_col_after" />
                    </button>
                    <button
                        class="menubar__button btn"
                        @click="commands.deleteColumn"
                    >
                        <i class="fas fa-delete_col" />
                    </button>
                    <button
                        class="menubar__button btn"
                        @click="commands.addRowBefore"
                    >
                        <i class="fas fa-add_row_before" />
                    </button>
                    <button
                        class="menubar__button btn"
                        @click="commands.addRowAfter"
                    >
                        <i class="fas fa-add_row_after" />
                    </button>
                    <button
                        class="menubar__button btn"
                        @click="commands.deleteRow"
                    >
                        <i class="fas fa-delete_row" />
                    </button>
                    <button
                        class="menubar__button btn"
                        @click="commands.toggleCellMerge"
                    >
                        <i class="fas fa-combine_cells" />
                    </button>
                </span>
            </div>
        </div>
    </editor-menu-bar>
</template>

<script>
    import { EditorMenuBar } from 'tiptap';

    export default {
        components: {
            EditorMenuBar,
        },
        props: {
            editor: Object,
        }
    }
</script>

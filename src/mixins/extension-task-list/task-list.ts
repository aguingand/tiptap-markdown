import { MarkdownList } from "../../extensions/markdown-list/markdown-list";
import type { TaskList } from "@tiptap/extension-task-list";
import { NodeMixin } from "../../types";

export const taskList: NodeMixin<typeof TaskList> = (TaskList) => (
    TaskList.extend(MarkdownList.config)
);

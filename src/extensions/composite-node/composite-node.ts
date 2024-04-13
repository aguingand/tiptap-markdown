import { WithMarkdownStorage } from "../../types";
import { Node, NodeConfig } from "@tiptap/core";

type CompositeOptions = { target: string };

export const CompositeNode = new class<
    Options extends CompositeOptions = CompositeOptions,
    Storage extends WithMarkdownStorage = WithMarkdownStorage,
> extends Node<Options, Storage> {
    override config: NodeConfig<Options, Storage> = { name: 'composite' }
    override configure(options?: Partial<Options>) {
        this.name = `composite:${options!.target}`;
        return super.configure(options);
    }
}

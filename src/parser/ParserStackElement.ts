
import type { Attrs, Node, NodeType } from '@tiptap/pm/model'
import { StackElement } from '../util/StackElement';

export class ParserStackElement extends StackElement<Node> {
    constructor(public type: NodeType, public content: Node[], public attrs?: Attrs) {
        super()
    }

    push(node: Node, ...rest: Node[]) {
        this.content.push(node, ...rest)
    }

    pop(): Node | undefined {
        return this.content.pop()
    }

    static create(type: NodeType, content: Node[], attrs?: Attrs) {
        return new ParserStackElement(type, content, attrs)
    }
}

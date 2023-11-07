/// The element of the stack, which holds an array of nodes.
export abstract class StackElement<Node> {
    /// A method that can `push` a node into the element.
    abstract push(node: Node, ...rest: Node[]): void
}

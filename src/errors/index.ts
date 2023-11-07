

const functionReplacer = (_: string, value: unknown) => (typeof value === 'function' ? '[Function]' : value)

const stringify = (x: unknown): string => JSON.stringify(x, functionReplacer)

export function createNodeInParserFail(...args: unknown[]) {
    // todo handle args
    return new Error('Create prosemirror node from remark failed in parser');
}

export function parserMatchError(node: unknown) {
    return new Error(`Cannot match target parser for node: ${stringify(node)}.`);
}

export function serializerMatchError(node: unknown) {
    return new Error(`Cannot match target serializer for node: ${stringify(node)}.`);
}

export function stackOverFlow() {
    return new Error('Stack over flow, cannot pop on an empty stack.');
}

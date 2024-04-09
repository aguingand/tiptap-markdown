
export function withStateOptions<S extends { options: object }>(state: S, newOptions: S['options'], callback: (state: S) => any) {
    const options = { ...state.options };
    Object.assign(state.options, newOptions);
    const result = callback(state);
    state.options = options;
    return result;
}

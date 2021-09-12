


export function getTightListExtension({ editor }) {
    return {
        addAttributes() {
            return {
                tight: {
                    default: editor.options.markdown.tightLists,
                    parseHTML: element => ({
                        tight: element.getAttribute('data-tight') || !element.querySelector('p'),
                    }),
                    renderHTML: attributes => ({
                        class: attributes.tight ? editor.options.markdown.tightListClass : null,
                        'data-tight': attributes.tight ? 'true' : null,
                    }),
                }
            }
        }
    }
}

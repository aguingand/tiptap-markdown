# Tiptap markdown

Edit markdown content in [tiptap editor](https://www.tiptap.dev/). 

## Installation

```bash
npm install tiptap-markdown
```

### Requirements
**This package only works with [tiptap v2](https://www.tiptap.dev/)**, tiptap v1 is not supported.

## Usage
Vue 3 example:

```js
import { Editor } from "@tiptap/vue-3";
import StarterKit from '@tiptap/starter-kit';
import { createMarkdownEditor } from "tiptap-markdown";

const MarkdownEditor = createMarkdownEditor(Editor);

export default {
    // ...
    mounted() {
        this.editor = new MarkdownEditor({
            content: "# Title",
            extensions: [
                StarterKit,
            ],
        });
        const markdownOutput = this.editor.getMarkdown();
    }
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

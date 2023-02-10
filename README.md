# Tiptap markdown

Edit markdown content in [tiptap editor](https://www.tiptap.dev/).

## Installation

```bash
npm install tiptap-markdown
```

### Requirements
Support all frameworks handled by tiptap (Vue 2, Vue 3, React, [see full list](https://www.tiptap.dev/installation#integration-guides)...)

## Usage
Vue 3 example:

```js
import { Editor } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { createMarkdownEditor } from 'tiptap-markdown';

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

## API

### `createMarkdownEditor`
This function returns a class (`MarkdownEditor`) which extends the given base `Editor` class. This means all `Editor` methods + options are available.

```js
import { Editor } from '@tiptap/vue-3';

// but also works with
// import { Editor } from '@tiptap/vue-2';
// import { Editor } from '@tiptap/react';
// import { Editor } from '@tiptap/core';

import { createMarkdownEditor } from 'tiptap-markdown';

const MarkdownEditor = createMarkdownEditor(Editor);
```

### Options
```js
const editor = new MarkdownEditor({
    content: '...',
    markdown: {
        html: true,              // Allow HTML input/output
        tightLists: true,        // No <p> inside <li> in markdown output
        tightListClass: 'tight', // Add class to <ul> that allows you to remove <p> margins when tight
        bulletListMarker: '-',   // <li> prefix in markdown output
        linkify: false,          // Create links from "https://..." text
        breaks: false,           // New lines (\n) in markdown input are converted to <br>
    }
})
```

### Methods
```js
editor.setContent('**test**') // setContent supports markdown format
editor.getMarkdown(); // get current content as markdown
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
The MIT License (MIT). Please see [License File](LICENSE) for more information.

# Tiptap markdown

Edit markdown content in [tiptap editor](https://www.tiptap.dev/).

## Installation

```bash
npm install tiptap-markdown
```

### Requirements
Support all frameworks handled by tiptap (Vue 2, Vue 3, React, [see full list](https://www.tiptap.dev/installation#integration-guides)...)

## Usage
Basic example:

```js
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from 'tiptap-markdown';

const editor = new Editor({
    content: "# Title",
    extensions: [
        StarterKit,
        Markdown,
    ],
});
const markdownOutput = editor.storage.markdown.getMarkdown();
```

## API

### Options
Default options:
```js
Markdown.configure({
  html: true,              // Allow HTML input/output
  tightLists: true,        // No <p> inside <li> in markdown output
  tightListClass: 'tight', // Add class to <ul> allowing you to remove <p> margins when tight
  bulletListMarker: '-',   // <li> prefix in markdown output
  linkify: false,          // Create links from "https://..." text
  breaks: false,           // New lines (\n) in markdown input are converted to <br>
})
```

### Methods
```js
editor.commands.setContent('**test**') // setContent supports markdown format
editor.storage.markdown.getMarkdown(); // get current content as markdown
```

### Custom extensions
See [examples](https://github.com/aguingand/tiptap-markdown/tree/refactor-to-storage/example/src/extensions).  
Checkout prosemirror-markdown [default serializer](https://github.com/ProseMirror/prosemirror-markdown/blob/master/src/to_markdown.ts#L66) for examples of config.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
The MIT License (MIT). Please see [License File](LICENSE) for more information.

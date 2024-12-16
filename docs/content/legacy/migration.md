## Migrate to 0.7.0

### Simple
```diff
import { Editor } from '@tiptap/core'
- import { createMarkdownEditor } from 'tiptap-markdown'
+ import { Markdown } from 'tiptap-markdown'

- const MarkdownEditor = createMarkdownEditor(Editor)
- const editor = new MarkdownEditor({
+ const editor = new Editor({
    extensions: [
+     Markdown,
    ],
})
- const markdownOutput = editor.getMarkdown()
+ const markdownOutput = editor.storage.markdown.getMarkdown()
```

### With options
```diff
const editor = new Editor({
   extensions: [
+    Markdown.configure({
+      breaks: true,
+    })
   ],
-  markdown: {
-    breaks: true,
-  },
})
```

### Advanced: Custom extension
`createMarkdownExtension()` has been dropped in favor Tiptap extension `addStorage()`. Existing Tiptap node/mark can be configured by using `addStorage()` in *`Node`*`.extend({ ... })`

<details>
  <summary>
    See example
  </summary>
  
  ```diff
  - import { createMarkdownExtension } from 'tiptap-markdown'

  const CustomNode = Node.create({
  +  addStorage() {
  +    return {
  +      markdown: {
  +        serialize() {},
  +        parse: {},
  +      }
  +    }
  +  }
  })


  new Editor({
    extensions: [
      CustomNode,
    ]
  -  markdown: {
  -    extensions: [
  -      createMarkdownExtension(CustomNode, {
  -        serialize() {},
  -        parse: {},
  -      })
  -    ]
  -  }
  })
  ```
 </details>
  

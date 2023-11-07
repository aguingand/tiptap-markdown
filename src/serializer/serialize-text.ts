/* Copyright 2021, Milkdown by Mirone. */
import type { SerializerState } from './SerializerState';
import type { Node } from '@tiptap/pm/model'
import { Fragment } from '@tiptap/pm/model'

export function serializeText(state: SerializerState, node: Node) {
  const lastIsHardBreak
    = node.childCount >= 1 && node.lastChild?.type.name === 'hardbreak'
  if (!lastIsHardBreak) {
    state.next(node.content)
    return
  }

  const contentArr: Node[] = []
  node.content.forEach((n, _, i) => {
    if (i === node.childCount - 1)
      return

    contentArr.push(n)
  })
  state.next(Fragment.fromArray(contentArr))
}

import Blockquote from "./nodes/blockquote";
import BulletList from "./nodes/bullet-list";
import CodeBlock from "./nodes/code-block";
import Document from "./extension-document/document";
import HardBreak from "./nodes/hard-break";
import Heading from "./nodes/heading";
import HorizontalRule from "./nodes/horizontal-rule";
import { HtmlNode } from "./nodes/html";
import Image from "./nodes/image";
import ListItem from "./nodes/list-item";
import OrderedList from "./nodes/ordered-list";
import Paragraph from "./extension-paragraph/paragraph";
import Table from "./nodes/table";
import TaskItem from "./nodes/task-item";
import TaskList from "./nodes/task-list";
import Text from "./extension-text/text";

import Bold from "./extension-bold/bold";
import Code from "./marks/code";
import HTMLMark from "./marks/html";
import Italic from "./extension-italic/italic";
import Link from "./marks/link";
import Strike from "./marks/strike";


export default [
    Blockquote,
    BulletList,
    CodeBlock,
    Document,
    HardBreak,
    Heading,
    HorizontalRule,
    HtmlNode,
    Image,
    ListItem,
    OrderedList,
    Paragraph,
    Table,
    TaskItem,
    TaskList,
    Text,

    Bold,
    Code,
    HTMLMark,
    Italic,
    Link,
    Strike,
]

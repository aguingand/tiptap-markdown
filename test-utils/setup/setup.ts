import { expect } from "vitest";
// @ts-ignore
import serializeHtml from 'jest-serializer-html';

expect.addSnapshotSerializer(serializeHtml);

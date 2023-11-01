import { expect } from "vitest";
import serializeHtml from 'jest-serializer-html';

expect.addSnapshotSerializer(serializeHtml);

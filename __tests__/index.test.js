/* eslint-disable no-console, import/extensions, no-undef */
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../index.js';

const getPathToFile = (filename) => path.resolve(filename);
const diff = readFileSync(getPathToFile('__fixtures__/diff.txt'), 'utf-8');

test('json reads', () => {
  expect(genDiff('__fixtures__/before.json', '__fixtures__/after.json')).toEqual(diff);
});

test('yaml reads', () => {
  expect(genDiff('__fixtures__/before.yml', '__fixtures__/after.yml')).toEqual(diff);
});

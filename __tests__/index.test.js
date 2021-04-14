/* eslint-disable no-console, import/extensions, no-undef */
import genDiff from '../index.js';

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('json reads', () => {
  expect(genDiff('__fixtures__/before.json', '__fixtures__/after.json')).toBe(result);
});

test('yaml reads', () => {
  expect(genDiff('__fixtures__/before.yml', '__fixtures__/after.yml')).toBe(result);
});

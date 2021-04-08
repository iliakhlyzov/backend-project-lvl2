/* eslint-disable no-console, import/extensions, no-undef */
import genDiff from '../src/index.js';

const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('Correct', () => {
  expect(genDiff('./__tests__/file1.json', './__tests__/file2.json')).toBe(result);
});

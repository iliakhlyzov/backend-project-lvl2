import genDiff from '../index.js';
import { readFile } from '../index'

test('diff correct', () => {
  const diff = readFile('../__testfiles__/difference.json').toString();
  expect(genDiff('../__testfiles__/file1.json', '../__testfiles__/file2.json')).toEqual(diff);
})
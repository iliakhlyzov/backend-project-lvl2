import { readFileSync } from 'fs';
import path from 'path';
import compare from './src/comparator.js';
import parsers from './src/parsers.js';

const getPathToFile = (filename) => path.resolve(filename);
const getExtName = (pathToFile) => path.extname(pathToFile).slice(1);

const getData = (pathToFile) => {
  const string = readFileSync(pathToFile, 'utf8');
  const extName = getExtName(pathToFile);
  const parse = parsers(extName);
  return parse(string);
};

const parseToString = (array) => {
  const string = array.map(([key, value]) => `  ${key}: ${value}`).join('\n');
  return `{\n${string}\n}`;
};

export default (filepath1, filepath2) => {
  const pathToFile1 = getPathToFile(filepath1);
  const pathToFile2 = getPathToFile(filepath2);
  const data1 = getData(pathToFile1);
  const data2 = getData(pathToFile2);
  const diff = compare(data1, data2);
  return parseToString(diff);
};

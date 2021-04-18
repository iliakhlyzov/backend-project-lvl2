import { readFileSync } from 'fs';
import path from 'path';
import makeDiffTree from './src/makeDiffTree.js';
import parsers from './src/parsers.js';
import format from './src/format.js';

const getPathToFile = (filename) => path.resolve(filename);
const getExtName = (pathToFile) => path.extname(pathToFile).slice(1);

const getData = (pathToFile) => {
  const string = readFileSync(pathToFile, 'utf8');
  const extName = getExtName(pathToFile);
  const parse = parsers(extName);
  return parse(string);
};

export default (filepath1, filepath2, style = 'stylish') => {
  const pathToFile1 = getPathToFile(filepath1);
  const pathToFile2 = getPathToFile(filepath2);
  const data1 = getData(pathToFile1);
  const data2 = getData(pathToFile2);
  const diffTree = makeDiffTree(data1, data2);
  return format(diffTree, style);
};

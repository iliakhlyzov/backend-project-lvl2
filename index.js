import { readFileSync } from 'fs';
import path from 'path';
// import { fileURLToPath } from 'url';
import compare from './src/comparator.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const getPathToFile = (filename) => path.resolve(filename);

const getData = (pathToFile) => {
  const string = readFileSync(pathToFile, 'utf8');
  return JSON.parse(string);
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

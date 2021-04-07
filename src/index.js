import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);

const getData = (pathToFile) => {
  const data = readFileSync(pathToFile, 'utf8');
  return JSON.parse(data);
};
// const getExt = (pathToFile) => path.extname(pathToFile).slice(1);

const makeDiff = (data1, data2) => _
  .sortBy(_.union(Object.keys(data1), Object.keys(data2)))
  .reduce((acc, key) => {
    if (!_.has(data1, key)) {
      return [...acc, [`+ ${key}`, _.get(data2, key)]];
    }
    if (!_.has(data2, key)) {
      return [...acc, [`- ${key}`, _.get(data1, key)]];
    }
    if (_.get(data1, key) === _.get(data2, key)) {
      return [...acc, [`  ${key}`, _.get(data1, key)]];
    }
    return [...acc,
      [`- ${key}`, _.get(data1, key)],
      [`+ ${key}`, _.get(data2, key)]];
  }, []);

const parseToString = (array) => {
  const string = array.map(([key, value]) => `  ${key}: ${value}`).join('\n');
  return `{\n${string}\n}`;
};

export default (filepath1, filepath2) => {
  const pathToFile1 = getPath(filepath1);
  const pathToFile2 = getPath(filepath2);
  const data1 = getData(pathToFile1);
  const data2 = getData(pathToFile2);
  const diff = makeDiff(data1, data2);
  return parseToString(diff);
};

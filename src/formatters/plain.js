import _ from 'lodash';
import types from '../types.js';

const complexValue = '[complex value]';
const begin = 'Property';

const parseValue = (value) => {
  if (_.isObject(value)) {
    return `${complexValue}`;
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const parseKey = (key, parentName) => (_.isEmpty(parentName)
  ? key : `${parentName}.${key}`);

const formatPlain = (diffTree) => {
  const init = (tree, parentName) => tree
    .flatMap((node) => {
      const {
        type, key, children, value1, value2,
      } = node;

      const toStr = (value) => parseValue(value);
      const parsedKey = parseKey(key, parentName);

      switch (type) {
        case types.added:
          return [`${begin} '${parsedKey}' was added with value: ${toStr(value2)}`];
        case types.deleted:
          return [`${begin} '${parsedKey}' was removed`];
        case types.changed:
          return [`${begin} '${parsedKey}' was updated. From ${toStr(value1)} to ${toStr(value2)}`];
        case types.unchanged:
          return null;
        case types.nested:
          return init(children, parsedKey);
        default:
          return new Error(`Unexpected type ${type}`);
      }
    });
  const lines = init(diffTree, '');
  return lines.filter((element) => !_.isNull(element));
};

export default formatPlain;

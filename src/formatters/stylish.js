import _ from 'lodash';
import types from '../types.js';

const openingBracket = '{';
const closingBracket = '}';
const keyOffset = 4;
const typeOffset = 2;
const indentSymbol = ' ';
const labels = {
  added: '+',
  unchanged: ' ',
  deleted: '-',
  nested: ' ',
};

const addPrefix = (type, key, keyIndent) => `${keyIndent}${labels[type]} ${key}`;
const parseValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const indentCount = depth * keyOffset;
  const endIndentCount = (depth - 1) * keyOffset;
  const keyIndent = indentSymbol.repeat(indentCount);
  const endIndent = indentSymbol.repeat(endIndentCount);
  const lines = Object.entries(value)
    .flatMap(([key, val]) => `${keyIndent}${key}: ${parseValue(val, depth + 1)}`);
  return [openingBracket, ...lines, `${endIndent}${closingBracket}`].join('\n');
};

const formatStylish = (diffTree) => {
  const init = (tree, depth) => tree.flatMap((node) => {
    const indentCount = depth * keyOffset;
    const keyIndent = indentSymbol.repeat(indentCount - typeOffset);
    const bracketIndent = indentSymbol.repeat(indentCount);

    const {
      type, key, children, value1, value2,
    } = node;
    const toStr = (value) => parseValue(value, depth + 1);
    // console.log(depth, type, key)
    switch (type) {
      case types.added:
        return [`${addPrefix(type, key, keyIndent)}: ${toStr(value2)}`];
      case types.deleted:
        return [`${addPrefix(type, key, keyIndent)}: ${toStr(value1)}`];
      case types.changed:
        return [
          `${addPrefix(types.deleted, key, keyIndent)}: ${toStr(value1)}`,
          `${addPrefix(types.added, key, keyIndent)}: ${toStr(value2)}`,
        ];
      case types.unchanged:
        return [`${addPrefix(type, key, keyIndent)}: ${toStr(value1)}`];
      case types.nested:
        return [
          `${addPrefix(type, key, keyIndent)}: ${openingBracket}`,
          ...init(children, depth + 1),
          `${bracketIndent}${closingBracket}`,
        ];
      default:
        throw new Error(`Unexpected type ${type}`);
    }
  });

  const lines = init(diffTree, 1);

  return [openingBracket, ...lines, closingBracket];
};

export default formatStylish;

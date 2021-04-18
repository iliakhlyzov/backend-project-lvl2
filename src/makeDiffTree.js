import _ from 'lodash';
import types from './types.js';

const makeDiffTree = (data1, data2) => _
  .sortBy(_.union(Object.keys(data1), Object.keys(data2)))
  .map((key) => {
    const [value1, value2] = [data1[key], data2[key]];

    if (!_.has(data1, key)) {
      return {
        type: types.added,
        key,
        value2,
      };
    }

    if (!_.has(data2, key)) {
      return {
        type: types.deleted,
        key,
        value1,
      };
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        type: types.nested,
        key,
        children: makeDiffTree(value1, value2),
      };
    }

    if (value1 === value2) {
      return {
        type: types.unchanged,
        key,
        value1,
      };
    }

    return {
      type: types.changed,
      key,
      value1,
      value2,
    };
  });

export default makeDiffTree;

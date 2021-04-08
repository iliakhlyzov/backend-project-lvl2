import _ from 'lodash';

export default (data1, data2) => _
  .sortBy(_.union(Object.keys(data1), Object.keys(data2)))
  .reduce((acc, key) => {
    if (!_.has(data1, key)) return [...acc, [`+ ${key}`, _.get(data2, key)]];

    if (!_.has(data2, key)) return [...acc, [`- ${key}`, _.get(data1, key)]];

    if (_.get(data1, key) === _.get(data2, key)) return [...acc, [`  ${key}`, _.get(data1, key)]];

    return [...acc, [`- ${key}`, _.get(data1, key)], [`+ ${key}`, _.get(data2, key)]];
  }, []);

import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

const formatJSON = (diffTree) => JSON.stringify(diffTree, null, 2);
export default (diffTree, style) => {
  switch (style) {
    case 'stylish':
      return stylish(diffTree).join('\n');
    case 'plain':
      return plain(diffTree).join('\n');
    case 'json':
      return formatJSON(diffTree);
    default:
      throw new Error(`Unsupported format ${style}`);
  }
};

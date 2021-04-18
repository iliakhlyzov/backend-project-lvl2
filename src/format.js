import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';

export default (diffTree, style) => {
  switch (style) {
    case 'stylish':
      return stylish(diffTree).join('\n');
    case 'plain':
      return plain(diffTree).join('\n');
    default:
      throw new Error(`Unsupported format ${style}`);
  }
};

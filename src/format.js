import stylish from './stylish.js';

export default (diffTree, style) => {
  switch (style) {
    case 'stylish':
      return stylish(diffTree);
    default:
      throw new Error(`Unsupported format ${style}`);
  }
};

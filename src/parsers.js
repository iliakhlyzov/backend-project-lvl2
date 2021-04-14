import yaml from 'js-yaml';

const parsers = (extname) => {
  switch (extname) {
    case 'json':
      return JSON.parse;
    case 'yml':
    case 'ayml':
      return yaml.load;
    default:
      throw new Error(`Unexpected input format ${extname}`);
  }
};

export default parsers;

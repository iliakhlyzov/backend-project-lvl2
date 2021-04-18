#!/usr/bin/env node
/* eslint-disable no-console, import/extensions */

import program from 'commander';
import makeDiff from '../index.js';

// gendiff __fixtures__/before.json __fixtures__/after.json
// gendiff --format plain __fixtures__/before.json __fixtures__/after.json
// gendiff --format json __fixtures__/before.json __fixtures__/after.json

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const options = program.opts();
    console.log(makeDiff(filepath1, filepath2, options.format));
  })
  .parse();

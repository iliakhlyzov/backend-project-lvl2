#!/usr/bin/env node
/* eslint-disable no-console, import/extensions */

import program from 'commander';
import makeDiff from '../src/index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(makeDiff(filepath1, filepath2));
  })
  .parse();

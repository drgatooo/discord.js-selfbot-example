// @ts-check

import love from 'eslint-config-love';

export default [
  {
    files: ['src/**/*.js'],
    ...love
  },
  {
    ignores: ['dist/**', 'node_modules/**']
  }
];

import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  defaultIgnores: true,
  helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
  plugins: [],
};

export default Configuration;

// [
//     'build',
//     'chore',
//     'ci',
//     'docs',
//     'feat',
//     'fix',
//     'perf',
//     'refactor',
//     'revert',
//     'style',
//     'test'
// ]

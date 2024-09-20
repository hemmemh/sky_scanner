module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    'no-unused-vars': [
      'error',
      { argsIgnorePattern: '^value|^seatNumber|^seatClass' },
    ],
    'react/prop-types': 'off',
    'prettier/prettier': 'error',
    indent: ['error', 2],
    'no-mixed-spaces-and-tabs': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'never', prev: 'var', next: 'function' },
      { blankLine: 'never', prev: 'function', next: 'function' },
      { blankLine: 'never', prev: 'block-like', next: 'block-like' },
      {
        blankLine: 'never',
        prev: 'block-like',
        next: 'multiline-block-like',
      },
    ],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 1 }], // Ограничение на количество пустых строк
    'no-trailing-spaces': 'error', // Запрещает пробелы в конце строк
    'no-whitespace-before-property': 'error', // Запрещает пробелы перед свойствами
    'keyword-spacing': ['error', { before: true, after: true }], // Пробелы перед и после ключевых слов
    'space-before-function-paren': ['error', 'always'], // Пробел перед скобкой функции
    'object-curly-spacing': ['error', 'always'], // Пробелы внутри фигурных скобок
    'array-bracket-spacing': ['error', 'never'], // Пробелы внутри квадратных скобок
  },
};

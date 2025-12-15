module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': 'off', // ОТКЛЮЧАЕМ проверку переноса строк
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};
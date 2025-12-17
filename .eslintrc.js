module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'script' // Используйте 'script' для CommonJS
  },
  rules: {
    'indent': ['error', 2],
    'no-unused-vars': ['error', { 
      'vars': 'all',
      'args': 'after-used',
      'ignoreRestSiblings': false,
      'varsIgnorePattern': '^_'
    }]
  }
};
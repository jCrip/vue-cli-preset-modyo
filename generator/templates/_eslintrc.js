module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'max-len': [2, 120],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never',
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: 1,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: true,
      ignores: [],
    }],
  },

  parserOptions: {
    parser: 'babel-eslint',
  },
  overrides: [{
    files: [
      '**/__tests__/*.{j,t}s?(x)',
    ],
    env: {
      jest: true,
    },
  }],
}

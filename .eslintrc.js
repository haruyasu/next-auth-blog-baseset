let parserConfig = {}

try {
  require.resolve('typescript')

  parserConfig = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json'
    }
  }
} catch (_) {}

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  ...parserConfig,
  env: {
    jest: true,
    browser: true
  },
  extends: [
    'standard-with-typescript',
    'standard-react',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier/standard'
  ],
  plugins: [
    'typescript-sort-keys',
    'prettier',
    'react-hooks',
    'simple-import-sort',
    'sort-destructure-keys',
    'tsdoc',
    'jsx-a11y'
  ],
  rules: {
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'react/jsx-handler-names': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/no-onchange': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton']
      }
    ]
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'tsdoc/syntax': 'warn',
        'typescript-sort-keys/interface': 'error',
        'typescript-sort-keys/string-enum': 'error'
      }
    },
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'react/prop-types': 'off',
        'sort-destructure-keys/sort-destructure-keys': [
          'error',
          { caseSensitive: false }
        ]
      }
    }
  ]
}

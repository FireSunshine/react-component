module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // 使用 Prettier 推荐的规则
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'simple-import-sort'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
    'no-undef': 'error',
    'no-console': 'warn',
    eqeqeq: 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    //if we want to group imports can use below.
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // 第一组：React 相关的包
          ['^react'],
          // 第二组：Ant Design 相关的包
          ['^antd'],
          // 第三组：以 @ 开头的路径或普通的第三方库（不以 @ 开头的字母数字字符）
          ['^@?\\w'],
          // 第四组：以 @/ 开头的相对路径
          ['@/(.*)'],
          // 第五组：以 ./ 或 ../ 开头的相对路径
          ['^[./]'],
        ],
      },
    ],
  },
};

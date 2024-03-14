export default {
  // 使用 ts-jest 转换器处理 TypeScript 文件的测试
  preset: 'ts-jest',
  // 使用 Jest 的 jsdom 环境来模拟浏览器环境进行测试
  testEnvironment: 'jest-environment-jsdom',
  // 配置文件的转换规则，将所有 .ts 和 .tsx 文件使用 ts-jest 转换器处理
  transform: { '^.+\\.tsx?$': 'ts-jest' }, // process `*.tsx` files with `ts-jest`
  // 配置模块名映射，将图片等文件映射到一个 mock 文件，将 CSS、LESS、SASS 或 SCSS 文件映射到 identity-obj-proxy
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // @ 路径别名
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__test__/__mocks__/fileMock.ts',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  // 指定在运行测试前要执行的一组文件，这里执行 @testing-library/jest-dom 模块的设置文件
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};

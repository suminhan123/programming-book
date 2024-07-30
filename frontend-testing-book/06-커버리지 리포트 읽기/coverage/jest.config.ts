export default {
  clearMocks: true,
  // 커버리지 옵션을 넣지 않아도 리포트가 생성된다
  collectCoverage: false,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testEnvironment: "jest-environment-jsdom",
  transform: { "^.+\\.(ts|tsx)$": ["esbuild-jest", { sourcemap: true }] },
  setupFilesAfterEnv: ["./jest.setup.ts"],
  // 선호하는 리포트를 추가
  // jest-html-reporters : 테스트 실행 결과를 그래프 형태로 보여준다
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "__reports__",
        filename: "jest.html",
      },
    ],
  ],
};

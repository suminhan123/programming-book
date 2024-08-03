const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    // 스토리북 기능 play function 을 사용하기 위해 설정 추가
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",

    // 특정 URL에서만 사용할 수 있는 UI 컴포넌트가 존재
    // router 애드온이 필요 => storybook-addon-next-router
    "storybook-addon-next-router",
    "storycap",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  features: {
    interactionsDebugger: true,
  },
  staticDirs: ["../public"],
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="styles/globals.css" />
  `,
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
    };
    return config;
  },
};

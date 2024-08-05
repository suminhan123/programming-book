/**
 * 스토리북을 활용한 시각적 회귀 테스트를 위한 스토리캡 설정
 * => 프로젝트에 있는 모든 스토리 파일이 캡처 대상이 되며 시각적으로 회귀 테스트를 할 수 있다
 */

import { withScreenshot } from "storycap";
export const decorators = [withScreenshot];

/** @type { import('@storybook/react').Preview } */

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;

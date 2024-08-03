import { BasicLayout } from "@/components/layouts/BasicLayout";
import { LoginUserInfoProvider } from "@/components/providers/LoginUserInfo";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { Args, PartialStoryFn } from "@storybook/csf";
import { ReactFramework } from "@storybook/react";

export const BasicLayoutDecorator = (
  Story: PartialStoryFn<ReactFramework, Args>
) => BasicLayout(<Story />);

export const LoginUserInfoProviderDecorator = (
  Story: PartialStoryFn<ReactFramework, Args>
) => (
  <LoginUserInfoProvider>
    <Story /> {/*스토리가 Context 를 통해 LoginUserInfo를 참조 */}
  </LoginUserInfoProvider>
);
/**
 * 스마트폰 레이아웃으로 스토리를 등록하면 parameters.viewport 를 설정해줘야 한다 => SPStory 공통 설정 적용
 * => @storybook/addon-viewport
 */
/**
 * SP 레이아웃으로 스토리를 등록하기 위한 공통 설정
 */
export const SPStory = {
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphone6",
    },
    screenshot: {
      viewport: {
        width: 375,
        height: 667,
        deviceScaleFactor: 1,
      },
      fullPage: false,
    },
  },
};

export const PCStory = {
  parameters: {
    screenshot: {
      viewport: {
        width: 1280,
        height: 800,
      },
      fullPage: false,
    },
  },
};

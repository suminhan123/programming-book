import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { LoginUserInfoProviderDecorator, SPStory } from "@/tests/storybook";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Header } from "./";

/* 
export const NotLoggedIn: Story = {
  parameters: {
    msw: { 
      handlers: [
        rest.get("/api/my/profile", async (_, res, ctx) => {
          return res(ctx.status(401));
        }),
      ], 
    },
  },
};
*/

/* 
export const NotLoggedIn: Story = {
  parameters: {
    msw: { handlers: [handleGetMyProfile({ status: 401 })] },
    // 요청 핸들러 내용은 다음과 같다.
    // msw: { 
    //   handlers: [
    //     rest.get("/api/my/profile", async (_, res, ctx) => {
    //       return res(ctx.status(401));
    //     }),
    //   ], 
    // },
  },
};
*/

/**
 * UI 컴포넌트 화면 크기별로 스토리를 등록할 수 있다
 * => @storybook/addon-viewport 패키지
 */
export default {
  component: Header,
  decorators: [LoginUserInfoProviderDecorator],
} as ComponentMeta<typeof Header>;

type Story = ComponentStoryObj<typeof Header>;

export const NotLoggedIn: Story = {
  // 우선 순위 : story -> component -> global
  // global 단계에 설정한 mock 응답해도 덮어쓴다
  parameters: {
    msw: { handlers: [handleGetMyProfile({ status: 401 })] },
  },
};

export const LoggedIn: Story = {};

/**
 * pathname 에 따라 ui가 변하는 지 테스트
 */
export const RouteMyPosts: Story = {
  parameters: {
    nextRouter: { pathname: "/my/posts" },
  },
};

export const RouteMyPostsCreate: Story = {
  parameters: {
    nextRouter: { pathname: "/my/posts/create" },
  },
};

export const SPNotLogIn: Story = {
  parameters: {
    /**
     * 스마트폰 레이아웃으로 스토리를 등록하면 parameters.viewport 를 설정해줘야 한다 => SPStory 공통 설정 적용
     */
    ...SPStory.parameters,
    ...NotLoggedIn.parameters,
  },
};

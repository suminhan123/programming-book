import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { LoginUserInfoProviderDecorator, SPStory } from "@/tests/storybook";
import { expect } from "@storybook/jest";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { userEvent as user, waitFor, within } from "@storybook/testing-library";
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

export const SPLoggedIn: Story = {
  parameters: {
    ...SPStory.parameters,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const navigation = canvas.queryByRole("navigation", {
      name: "내비게이션",
    });
    await expect(navigation).not.toBeInTheDocument();
  },
};
/**
 * 스토리북 테스트 러너는 스토리를 실행가능한 테스트로 변환
 * playfunction을 사용하는 스토리에 UI 컴포넌트의 변경 사항을 반영하지 않으면 도중에 인터랙션이 실패
 * => 테스트 러너는 play function을 사용하는 스토리를 대상으로 인터랙션이 오류 없이 종료되는 지 검증
 */
export const SPLoggedInOpenedMenu: Story = {
  storyName: "SP 레이아웃에서 드로어 메뉴를 연다",
  parameters: {
    ...SPStory.parameters,
    screenshot: {
      ...SPStory.parameters.screenshot,
      delay: 200,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole("button", {
      name: "메뉴 열기",
    });
    await user.click(button);
    const navigation = canvas.getByRole("navigation", {
      name: "내비게이션",
    });
    await expect(navigation).toBeInTheDocument();
  },
};

export const SPLoggedInClosedMenu: Story = {
  storyName: "SP 레이아웃에서 드로어 메뉴를 닫는다",
  parameters: {
    ...SPStory.parameters,
    screenshot: {
      ...SPStory.parameters.screenshot,
      delay: 200,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttonOpen = await canvas.findByRole("button", {
      name: "메뉴 열기",
    });
    await user.click(buttonOpen);
    const buttonClose = await canvas.findByRole("button", {
      name: "메뉴 닫기",
    });
    await expect(buttonClose).toBeInTheDocument();
    await user.click(buttonClose);
  },
};

export const PCLoggedInNotHaveOpenMenu: Story = {
  storyName: "PC 레이아웃에서는 '메뉴 열기'를 표시하지 않는다",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() =>
      expect(
        canvas.queryByRole("button", {
          name: "메뉴 열기",
        })
      ).toBeNull()
    );
  },
};

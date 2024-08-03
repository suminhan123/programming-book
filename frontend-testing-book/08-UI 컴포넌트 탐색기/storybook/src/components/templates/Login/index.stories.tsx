import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { BasicLayoutDecorator, PCStory, SPStory } from "@/tests/storybook";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Login } from "./";

export default {
  component: Login,
  parameters: {
    nextRouter: { pathname: "/login" },
    // 우선 순위 : story -> component -> global
    // global 단계에 설정한 mock 응답해도 덮어쓴다
    msw: { handlers: [handleGetMyProfile({ status: 401 })] },
  },
  // 데커레이터 설정
  decorators: [BasicLayoutDecorator],
} as ComponentMeta<typeof Login>;

type Story = ComponentStoryObj<typeof Login>;

export const Default: Story = { ...PCStory };

export const SP: Story = { ...SPStory };

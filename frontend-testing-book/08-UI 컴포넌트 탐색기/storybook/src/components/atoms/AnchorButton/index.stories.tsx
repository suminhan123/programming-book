import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { AnchorButton } from "./";

export default {
  component: AnchorButton,
  args: { children: "제출" },
} as ComponentMeta<typeof AnchorButton>;

/**
 * Controls를 활용한 디버깅
 * 스토리북 탐색기에서는 props를 변경해 컴포넌트가 어떻게 표시되는 지 실시간으로 디버깅 가능
 * =>  @storybook/addon-controls
 */
type Story = ComponentStoryObj<typeof AnchorButton>;

export const Default: Story = {};

export const Large: Story = {
  args: { variant: "large" },
};

export const Small: Story = {
  args: { variant: "small" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Dark: Story = {
  args: { theme: "dark" },
};

export const Light: Story = {
  args: { theme: "light" },
};

export const Transparent: Story = {
  args: { theme: "transparent" },
};

export const Blue: Story = {
  args: { theme: "blue" },
};

export const Error: Story = {
  args: { theme: "error" },
};

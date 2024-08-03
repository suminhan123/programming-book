import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Button } from "./";

/**
 * Button 컴포넌트 전용 스토리 파일로 등록 가능
 */
export default {
  component: Button,
  args: { children: "제출" },
} as ComponentMeta<typeof Button>;

type Story = ComponentStoryObj<typeof Button>;
/**
 * 객체를 개별적으로 export 하여 스토리를 등록 가능
 */
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

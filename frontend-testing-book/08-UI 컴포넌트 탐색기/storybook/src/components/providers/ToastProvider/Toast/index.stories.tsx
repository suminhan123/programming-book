import {
  ToastProvider,
  ToastState,
} from "@/components/providers/ToastProvider";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Toast } from ".";

/**
 * 데커레이터 고차 함수를 작성하면 데커레이터를 쉽게 만들 수 있다
 */
function createDecorator(defaultState?: Partial<ToastState>) {
  return function Decorator() {
    return (
      <ToastProvider defaultState={{ ...defaultState, isShown: true }}>
        {null}
      </ToastProvider>
    );
  };
}

export default {
  component: Toast,
} as ComponentMeta<typeof Toast>;

type Story = ComponentStoryObj<typeof Toast>;

/**
 * createDecorator 라는 고차함수를 사용해 설정을 최소화
 */
export const Succeed: Story = {
  decorators: [createDecorator({ message: "성공했습니다", style: "succeed" })],
};

export const Failed: Story = {
  decorators: [createDecorator({ message: "실패했습니다", style: "failed" })],
};

export const Busy: Story = {
  decorators: [createDecorator({ message: "통신 중입니다", style: "busy" })],
};

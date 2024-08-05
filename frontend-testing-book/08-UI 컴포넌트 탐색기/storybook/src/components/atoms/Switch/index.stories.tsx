import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Switch } from "./";

/*  규칙을 위반한 예시(애드온 설정을 하지 않은 상태) => 일부 내용을 무효화할 수 있다
export default {
  component: Switch,
} as ComponentMeta<typeof Switch>;
*/

/* 접근성 검증 자체를 생략하고 싶다면
export default {
  component: Switch,
  parameters: {
    a11y: { disable: true },
  },
} as ComponentMeta<typeof Switch>;
*/

export default {
  component: Switch,
  /**
   * 스토리 파일 단위에서 규칙을 무효화하고 싶을 때 parameters 에 설정을 추가
   */
  parameters: {
    a11y: {
      config: { rules: [{ id: "label", enabled: false }] },
    },
  },
} as ComponentMeta<typeof Switch>;

type Story = ComponentStoryObj<typeof Switch>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, defaultChecked: true },
};

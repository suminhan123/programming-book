import { Args, PartialStoryFn } from "@storybook/csf";
import {
  ComponentMeta,
  ComponentStoryObj,
  ReactFramework,
} from "@storybook/react";
import { AlertDialog, AlertDialogProvider } from "./";
import { AlertDialogState } from "./AlertDialogContext";

/**
 * 8.9 스토리를 통합 테스트에 재사용하기
 * 스토리와 제스트로 작성한 테스트 코드 까지 커밋하면 운용비가 많아진다
 * => 스토리를 통합 테스트에 재사용해서 해결!
 */

// Context Api에 의존하는 UI 컴포넌트 스토리 등록을 위한 함수 생성
function createDecorator(defaultState?: Partial<AlertDialogState>) {
  return function Decorator(Story: PartialStoryFn<ReactFramework, Args>) {
    return (
      <AlertDialogProvider defaultState={{ ...defaultState, isShown: true }}>
        <Story />
      </AlertDialogProvider>
    );
  };
}

export default {
  component: AlertDialog,
} as ComponentMeta<typeof AlertDialog>;

type Story = ComponentStoryObj<typeof AlertDialog>;

// 실제로 등록할 스토리
export const Default: Story = {
  decorators: [createDecorator({ message: "성공했습니다" })],
};

/**
 * createDecorator의 인자를 다르게 넣어 다양한 검증이 가능
 * => 테스트할 때도 테스트의 render 에 매번 Context Api가 필요
 * 스토리를 테스트 대상으로 만들어 재활용해 컴포넌트 테스트를 위한 상태를 정의하지 않아도 된다
 */
export const CustomButtonLabel: Story = {
  decorators: [
    createDecorator({
      message: "기사를 공개합니다. 진행하시겠습니까?",
      cancelButtonLabel: "CANCEL",
      okButtonLabel: "OK",
    }),
  ],
};

export const ExcludeCancel: Story = {
  decorators: [
    createDecorator({
      message: "전송됐습니다",
      cancelButtonLabel: undefined,
      okButtonLabel: "OK",
    }),
  ],
};

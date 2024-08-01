import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider } from "./";
import { useToastAction } from "./hooks";
import { ToastState } from "./ToastContext";

/**
 * 1.테스트용 컴포넌트를 만들어 인터랙션 실행하기
 */

const user = userEvent.setup();

const TestComponent = ({ message }: { message: string }) => {
  const { showToast } = useToastAction(); // <Toast>를 표시하기 위한 훅
  return <button onClick={() => showToast({ message })}>show</button>;
};

test("showToast를 호출하면 Toast컴포넌트가 표시된다", async () => {
  const message = "test";

  render(
    <ToastProvider>
      <TestComponent message={message} />
    </ToastProvider>
  );
  // 처음에는 렌더링되지 않는 것을 테스트
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();

  // 버튼 클릭 후 토스트 렌더링
  await user.click(screen.getByRole("button"));
  expect(screen.getByRole("alert")).toHaveTextContent(message);
});

/**
 * 2.초기값을 주입해서 렌더링된 내용 확인하기
 */
test("Succeed", () => {
  const state: ToastState = {
    isShown: true,
    message: "성공했습니다",
    style: "succeed",
  };
  render(<ToastProvider defaultState={state}>{null}</ToastProvider>);
  expect(screen.getByRole("alert")).toHaveTextContent(state.message);
});

test("Failed", () => {
  const state: ToastState = {
    isShown: true,
    message: "실패했습니다",
    style: "failed",
  };
  render(<ToastProvider defaultState={state}>{null}</ToastProvider>);
  expect(screen.getByRole("alert")).toHaveTextContent(state.message);
});

/**
 * 토스트 3가지 경우를 하나의 테스트로 검증
 */
test.each([
  { isShown: true, message: "성공했습니다", style: "succeed" },
  { isShown: true, message: "실패했습니다", style: "failed" },
  { isShown: true, message: "통신 중입니다", style: "busy" },
] as ToastState[])("$message", (state) => {
  render(<ToastProvider defaultState={state}>{null}</ToastProvider>);
  expect(screen.getByRole("alert")).toHaveTextContent(state.message);
});

import { act, renderHook } from "@testing-library/react";
import { ToastStyle } from "./ToastContext";
import { useToastProvider } from "./useToastProvider";

/**
 * 커스텀 훅 테스트
 */
test("showToast, hideToast로 화면에 표시하거나 숨긴다", () => {
  const { result } = renderHook(() => useToastProvider());

  // 초기 렌더링되지 않음을 검증
  expect(result.current).toMatchObject({ isShown: false });

  // Toast 를 열고 렌더링되는 지 검증
  act(() => {
    result.current.showToast();
  });
  expect(result.current).toMatchObject({ isShown: true });

  // Toast 를 닫고 렌더링되는 지 검증
  act(() => {
    result.current.hideToast();
  });
  expect(result.current).toMatchObject({ isShown: false });
});

test("message, style로 외관을 변경한다", () => {
  const { result } = renderHook(() => useToastProvider());
  // 처음 default 토스트 상태 검증
  expect(result.current).toMatchObject({ message: "", style: "succeed" });

  const message = "...loading";
  const style: ToastStyle = "busy";

  // 지정된 스타일 props 로 넘겨준 후 외관 변경되었는 지 검증
  act(() => {
    result.current.showToast({ message, style });
  });
  expect(result.current).toMatchObject({ message, style });
});

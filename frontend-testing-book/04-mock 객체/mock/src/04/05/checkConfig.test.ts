import { checkConfig } from "./checkConfig";

/**
 * 인수가 문자열이 아닌 객체나 배열일 경우에서 검증이 가능
 */
test("목 함수는 실행 시 인수가 객체일 때에도 검증할 수 있다", () => {
  const mockFn = jest.fn();
  checkConfig(mockFn);

  expect(mockFn).toHaveBeenCalledWith({
    mock: true,
    feature: { spy: true },
  });
});

/**
 * 객체가 너무 크면 일부만 검증
 */
test("expect.objectContaining를 사용한 부분 검증", () => {
  const mockFn = jest.fn();
  checkConfig(mockFn);

  expect(mockFn).toHaveBeenCalledWith(
    expect.objectContaining({
      mock: true,
    })
  );
});

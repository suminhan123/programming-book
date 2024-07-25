import { greet } from "./greet";

/**
 * 테스트 전에 호출되면서 테스트할 모듈들을 대체
 */
jest.mock("./greet");

test("인사말을 반환하지 않는다(원래 구현과 다르게)", () => {
  expect(greet("Taro")).toBe(undefined);
});

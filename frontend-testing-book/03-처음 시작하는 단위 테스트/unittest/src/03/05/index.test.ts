/* 원서에는 없지만 코드 3-23 테스트를 위해 HttpError 추가 */
import { add, addRange, HttpError, RangeError, sub } from ".";

/**
 * 모듈에 예외처리를 했다면 예상하지 못한 입력값을 받았을 때 실행 중인 디버거로 문제를 빨리 해결 가능
 */

test("반환값의 상한은 '100'이다", () => {
  expect(addRange(-10, 110)).toBe(100);
});

// 예외 발생 검증 테스트
// toThrow: 예외 발생하지 않으면 에러 발생
test("예외 발생 검증 테스트", () => {
  expect(() => addRange(-10, 110)).toThrow();
  // expect(add(-10, 110)).toThrow() => 잘못된 작성법
});

test("예외가 발생하지 않으므로 실패한다", () => {
  expect(() => addRange(70, 80)).toThrow();
});

// toThrow에 인수를 할당해 오류 메시지를 활용한 세부 사항 검증 수행
// 의도한 대로 예외가 발생했는 지 확인
test("인수가 0 ~ 100 범위 밖이면 예외가 발생한다", () => {
  expect(() => addRange(110, -10)).toThrow("0〜100 사이의 값을 입력해주세요");
});

// instanceof 연산자를 활용한 세부사항 검증 수행
// toThrow 인자에 메시지 뿐아니라 클래스도 할당 가능
test("특정 클래스의 인스턴스인지 검증한다", () => {
  // 발생한 예외가 RangeError이므로 실패한다
  expect(() => add(110, -10)).toThrow(HttpError);
  // 발생한 예외가 RangeError이므로 성공한다
  expect(() => add(110, -10)).toThrow(RangeError);
  // 발생한 예외가 Error를 상속받은 클래스이므로 성공한다
  expect(() => add(110, -10)).toThrow(Error);
});

describe("사칙연산", () => {
  describe("add", () => {
    test("반환값은 첫 번째 매개변수와 두 번째 매개변수를 더한 값이다", () => {
      expect(add(50, 50)).toBe(100);
    });
    test("반환값의 상한은 '100'이다", () => {
      expect(add(70, 80)).toBe(100);
    });
    test("인수가 '0~100'의 범위밖이면 예외가 발생한다", () => {
      const message = "0〜100 사이의 값을 입력해주세요";
      expect(() => add(-10, 10)).toThrow(message);
      expect(() => add(10, -10)).toThrow(message);
      expect(() => add(-10, 110)).toThrow(message);
    });
  });
  describe("sub", () => {
    test("반환값은 첫 번째 매개변수에서 두 번째 매개변수를 뺀 값이다", () => {
      expect(sub(51, 50)).toBe(1);
    });
    test("반환값의 하한은 '0'이다", () => {
      expect(sub(70, 80)).toBe(0);
    });
    test("인수가 '0~100'의 범위밖이면 예외가 발생한다", () => {
      expect(() => sub(-10, 10)).toThrow(RangeError);
      expect(() => sub(10, -10)).toThrow(RangeError);
      expect(() => sub(-10, 110)).toThrow(Error);
    });
  });
});

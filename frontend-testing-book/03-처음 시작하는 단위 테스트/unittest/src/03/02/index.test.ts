import { add, sub } from ".";

// test(테스트 명, 테스트 함수)
test("add: 1 + 2는 3", () => {
  expect(add(1, 2)).toBe(3);
});

// 테스트들을 그룹화하고 싶은 때 describe 함수를 사용
// describe(테스트명, 그룹 함수)
describe("add", () => {
  test("1 + 1은 2", () => {
    expect(add(1, 1)).toBe(2);
  });
  test("1 + 2는 3", () => {
    expect(add(1, 2)).toBe(3);
  });
});

// describe 함수는 중첩이 가능 => add 함수 그룹, sub 함수 그룹
describe("사칙연산", () => {
  describe("add", () => {
    test("1+1은 2", () => {
      expect(add(1, 1)).toBe(2);
    });
    test("1+2은 3", () => {
      expect(add(1, 2)).toBe(3);
    });
  });

  describe("sub", () => {
    test("1-1은 0", () => {
      expect(sub(1, 1)).toBe(0);
    });

    test("2-1은 1", () => {
      expect(sub(2, 1)).toBe(1);
    });
  });
});

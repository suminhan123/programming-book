import { greetByTime } from ".";

/**
 * 테스트 실행 환경의 현재 시각을 임의의 시각으로 고정
 * jest.useFakeTimers : 제스트에 가짜 타이머를 사용하도록 지시하는 함수
 * jest.setSystemTime : 가짜 타이머에서 사용할 현재 시각을 설정하는 함수
 * jest.useRealTimers : 제스트에 실제 타이머를 사용하도록 지시하는 원상 복귀 함수
 */

describe("greetByTime", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test("아침에는 '좋은 아침입니다'를 반환한다", () => {
    jest.setSystemTime(new Date(2023, 4, 23, 8, 0, 0));
    expect(greetByTime()).toBe("좋은 아침입니다");
  });

  test("점심에는 '식사는 하셨나요'를 반환한다", () => {
    jest.setSystemTime(new Date(2023, 4, 23, 14, 0, 0));
    expect(greetByTime()).toBe("식사는 하셨나요");
  });

  test("저녁에는 '좋은 밤 되세요'를 반환한다", () => {
    jest.setSystemTime(new Date(2023, 4, 23, 21, 0, 0));
    expect(greetByTime()).toBe("좋은 밤 되세요");
  });
});

/**
 * 테스트를 실행하기 전에 공통으로 설정해야 할 작업이 있거나
 * 테스트 종료 후에 공통으로 파기하고 싶은 작업이 있는 경우
 */
describe("설정 및 파기 타이밍", () => {
  beforeAll(() => console.log("1 - beforeAll"));
  afterAll(() => console.log("1 - afterAll"));
  beforeEach(() => console.log("1 - beforeEach"));
  afterEach(() => console.log("1 - afterEach"));

  test("", () => console.log("1 - test"));

  describe("Scoped / Nested block", () => {
    beforeAll(() => console.log("2 - beforeAll"));
    afterAll(() => console.log("2 - afterAll"));
    beforeEach(() => console.log("2 - beforeEach"));
    afterEach(() => console.log("2 - afterEach"));

    test("", () => console.log("2 - test"));
  });

  // 1 - beforeAll
  // 1 - beforeEach
  // 1 - test
  // 1 - afterEach
  // 2 - beforeAll
  // 1 - beforeEach
  // 2 - beforeEach
  // 2 - test
  // 2 - afterEach
  // 1 - afterEach
  // 2 - afterAll
  // 1 - afterAll
});

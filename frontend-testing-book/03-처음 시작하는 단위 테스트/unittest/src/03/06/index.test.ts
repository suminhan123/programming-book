/**
 * 용도별 매처
 * 단언문은 테스트 대상이 기댓값과 일치하는 지 매처로 검증한다
 */

describe("진릿값 검증", () => {
  test("참인 진릿값 검증", () => {
    expect(1).toBeTruthy();
    expect("1").toBeTruthy();
    expect(true).toBeTruthy();
    expect(0).not.toBeTruthy();
    expect("").not.toBeTruthy();
    expect(false).not.toBeTruthy();
  });
  test("거짓인 진릿값 검증", () => {
    expect(0).toBeFalsy();
    expect("").toBeFalsy();
    expect(false).toBeFalsy();
    expect(1).not.toBeFalsy();
    expect("1").not.toBeFalsy();
    expect(true).not.toBeFalsy();
  });
  test("null과 undefined 검증", () => {
    expect(null).toBeNull();
    expect(undefined).toBeUndefined();
    expect(undefined).not.toBeDefined();
  });
});

describe("수치 검증", () => {
  const value = 2 + 2;
  test("검증값이 기댓값과 일치한다", () => {
    expect(value).toBe(4);
    expect(value).toEqual(4);
  });
  test("검증값이 기댓값보다 크다", () => {
    expect(value).toBeGreaterThan(3); // 4 > 3
    expect(value).toBeGreaterThanOrEqual(4); // 4 >= 4
  });
  test("검증값이 기댓값보다 작다", () => {
    expect(value).toBeLessThan(5); // 4 < 5
    expect(value).toBeLessThanOrEqual(4); // 4 <= 4
  });
  /**
   * 자바스크립트는 소수 계산에 오차가 있다
   * 10진수인 소수를 2진수로 변환할 때 문제 발생
   * => 계산한 소숫값을 검증할 때는 toBeCloseTo 매처를 사용
   */
  test("소수 계산은 정확하지 않다", () => {
    expect(0.1 + 0.2).not.toBe(0.3);
  });
  test("소수 계산 시 지정한 자릿수까지 비교한다", () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3); // 두 번째 인수의 기본값은 2다.
    expect(0.1 + 0.2).toBeCloseTo(0.3, 15);
    expect(0.1 + 0.2).not.toBeCloseTo(0.3, 16);
  });
});

describe("문자열 검증", () => {
  const str = "Hello World";
  const obj = { status: 200, message: str };
  /**
   * toContain : 등가 비교 혹은 문자열 일부가 일치하는 지 검증
   * toMatch : 정규 표현식 검증
   * toHave : 문자열 길이 검증
   * stringContaining, stringMatching : 객체에 포함된 문자열을 검증할 때 사용
   *  검증할 객체의 property 중 기댓값으로 지정한 문자열의 일부가 포함됐으면 테스트 성공
   */
  test("검증값이 기댓값과 일치한다", () => {
    expect(str).toBe("Hello World");
    expect(str).toEqual("Hello World");
  });
  test("toContain", () => {
    expect(str).toContain("World");
    expect(str).not.toContain("Bye");
  });
  test("toMatch", () => {
    expect(str).toMatch(/World/);
    expect(str).not.toMatch(/Bye/);
  });
  test("toHaveLength", () => {
    expect(str).toHaveLength(11);
    expect(str).not.toHaveLength(12);
  });
  test("stringContaining", () => {
    expect(obj).toEqual({
      status: 200,
      message: expect.stringContaining("World"),
    });
  });
  test("stringMatching", () => {
    expect(obj).toEqual({
      status: 200,
      message: expect.stringMatching(/World/),
    });
  });
});

describe("배열 검증", () => {
  /**
   * toContain : 특정 값이 포함됐는 지 검증
   * toHaveLength : 배열의 길이 검증
   */
  describe("원시형 값들로 구성된 배열", () => {
    const tags = ["Jest", "Storybook", "Playwright", "React", "Next.js"];
    test("toContain", () => {
      expect(tags).toContain("Jest");
      expect(tags).toHaveLength(5);
    });
  });
  /**
   * toContainEqual : 특정 객체가 배열에 포함됐는 지 검증
   * arrayContaining : 인수로 넘겨준 배열의 요소들이 전부 포함
   *
   * => 둘 다 등가비교
   */
  describe("객체들로 구성된 배열", () => {
    const article1 = { author: "taro", title: "Testing Next.js" };
    const article2 = { author: "jiro", title: "Storybook play function" };
    const article3 = { author: "hanako", title: "Visual Regression Testing" };
    const articles = [article1, article2, article3];
    test("toContainEqual", () => {
      expect(articles).toContainEqual(article1);
    });
    test("arrayContaining", () => {
      expect(articles).toEqual(expect.arrayContaining([article1, article3]));
    });
  });
});

describe("객체 검증", () => {
  const author = { name: "taroyamada", age: 38 };
  const article = {
    title: "Testing with Jest",
    author,
  };
  /**
   * toMathObject : 부분적으로 프로퍼티가 일치한 지 검증
   * toHaveProperty : 객체에 특정 프로퍼티가 있는 지 검증
   * objectContaining : 객체 내 또 다른 객체를 검증해 부분적으로 일치하면 테스트 성공
   */
  test("toMatchObject", () => {
    expect(author).toMatchObject({ name: "taroyamada", age: 38 });
    expect(author).toMatchObject({ name: "taroyamada" });
    expect(author).not.toMatchObject({ gender: "man" });
  });
  test("toHaveProperty", () => {
    expect(author).toHaveProperty("name");
    expect(author).toHaveProperty("age");
  });
  test("objectContaining", () => {
    expect(article).toEqual({
      title: "Testing with Jest",
      author: expect.objectContaining({ name: "taroyamada" }),
    });
    expect(article).toEqual({
      title: "Testing with Jest",
      author: expect.not.objectContaining({ gender: "man" }),
    });
  });
});

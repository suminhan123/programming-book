import { checkLength } from ".";
import * as Fetchers from "../fetchers";
import { postMyArticle } from "../fetchers";
import { httpError, postMyArticleData } from "../fetchers/fixtures";
import { ArticleInput } from "../fetchers/type";

jest.mock("../fetchers");

/**
 * 입력값을 검증한 후 응답 데이터를 교체하는 mock 객체
 */
function mockPostMyArticle(input: ArticleInput, status = 200) {
  if (status > 299) {
    return jest
      .spyOn(Fetchers, "postMyArticle")
      .mockRejectedValueOnce(httpError);
  }
  try {
    checkLength(input.title);
    checkLength(input.body);
    return jest
      .spyOn(Fetchers, "postMyArticle")
      .mockResolvedValue({ ...postMyArticleData, ...input });
  } catch (err) {
    return jest
      .spyOn(Fetchers, "postMyArticle")
      .mockRejectedValueOnce(httpError);
  }
}

/**
 * 입력으로 보낼 값을 동적으로 생성할 수 있도록 하는 팩토리 함수
 */
function inputFactory(input?: Partial<ArticleInput>) {
  return {
    tags: ["testing"],
    title: "타입스크립트를 사용한 테스트 작성법",
    body: "테스트 작성 시 타입스크립트를 사용하면 테스트의 유지 보수가 쉬워진다",
    ...input,
  };
}

test("유효성 검사에 성공하면 성공 응답을 반환한다", async () => {
  // 유효성 검사에 통과하는 입력을 준비
  const input = inputFactory();

  // 입력값을 포함한 성공 응답을 반환하는 mock 객체를 만든다
  const mock = mockPostMyArticle(input);

  // api 호출
  const data = await postMyArticle(input);

  // 해당 데이터에 입력 내용이 포함되었는 지 검증
  expect(data).toMatchObject(expect.objectContaining(input));

  // mock 함수가 호출됐는 지 검증
  expect(mock).toHaveBeenCalled();
});

/**
 * 목 객체는 성공 응답을 반환하도록 설정되어 있지만, 입력값은 유효성 검사에 통과하지 X
 */
test("유효성 검사에 실패하면 reject된다", async () => {
  expect.assertions(2);
  // 유효성 검사에 통과하지 못하는 입력을 준비
  const input = inputFactory({ body: "", title: "" });

  // 입력값을 포함한 성공 응답을 반환하는 목 객체를 만든다
  const mock = mockPostMyArticle(input);

  try {
    await postMyArticle(input);
  } catch (err) {
    expect(err).toMatchObject({ err: { message: expect.anything() } });
    expect(mock).toHaveBeenCalled();
  }
});

test("유효성 검사에 실패하면 reject된다", async () => {
  expect.assertions(2);
  // 유효성 검사에 통과하지 못하는 입력을 준비
  const input = inputFactory({ body: "", title: "" });

  // 입력값을 포함한 성공 응답을 반환하는 목 객체를 만든다
  const mock = mockPostMyArticle(input);

  // 유효성 검사에 통과하지 못하고 reject 됐는 지 검증
  await postMyArticle(input).catch((err) => {
    expect(err).toMatchObject({ err: { message: expect.anything() } });
    expect(mock).toHaveBeenCalled();
  });
});

test("데이터 취득에 실패하면 reject된다", async () => {
  expect.assertions(2);
  const input = inputFactory();

  const mock = mockPostMyArticle(input, 500);

  await postMyArticle(input).catch((err) => {
    expect(err).toMatchObject({ err: { message: expect.anything() } });
    expect(mock).toHaveBeenCalled();
  });
});

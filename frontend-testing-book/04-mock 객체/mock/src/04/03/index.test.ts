import { getGreet } from ".";
import * as Fetchers from "../fetchers";
import { httpError } from "../fetchers/fixtures";

jest.mock("../fetchers");

/**
 * 데이터 취득 성공을 재현한 테스트
 */
test("데이터 취득 성공 시 : 사용자 이름이 없는 경우", async () => {
  // getMyProfile이 resolve됐을 때의 값을 재현
  jest.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
    id: "xxxxxxx-123456",
    email: "taroyamada@myapi.testing.com",
  });

  await expect(getGreet()).resolves.toBe("Hello, anonymous user!");
});

test("데이터 취득 성공 시 : 사용자 이름이 있는 경우", async () => {
  jest.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
    id: "xxxxxxx-123456",
    email: "taroyamada@myapi.testing.com",
    name: "taroyamada",
  });

  await expect(getGreet()).resolves.toBe("Hello, taroyamada!");
});

/**
 * 데이터 취득 실패를 재현한 테스트
 */
test("데이터 취득 실패 시", async () => {
  // getMyProfile이 reject됐을 때의 값을 재현
  jest.spyOn(Fetchers, "getMyProfile").mockRejectedValueOnce(httpError);

  await expect(getGreet()).rejects.toMatchObject({
    err: { message: "internal server error" },
  });
});

/**
 * 예외가 발생하고 있는 지 검증하는 테스트
 */
test("데이터 취득 실패 시 에러가 발생한 데이터와 함께 예외가 throw된다", async () => {
  expect.assertions(1);
  jest.spyOn(Fetchers, "getMyProfile").mockRejectedValueOnce(httpError);
  try {
    await getGreet();
  } catch (err) {
    expect(err).toMatchObject(httpError);
  }
});

import { render, screen } from "@testing-library/react";
import { mockPostMyAddress } from "./fetchers/mock";
import { RegisterAddress } from "./RegisterAddress";
import {
  clickSubmit,
  inputContactNumber,
  inputDeliveryAddress,
} from "./testingUtils";

jest.mock("./fetchers");

async function fillValuesAndSubmit() {
  const contactNumber = await inputContactNumber();
  const deliveryAddress = await inputDeliveryAddress();
  const submitValues = { ...contactNumber, ...deliveryAddress };
  await clickSubmit();
  return submitValues;
}

async function fillInvalidValuesAndSubmit() {
  const contactNumber = await inputContactNumber({
    name: "배언수",
    phoneNumber: "abc-defg-hijkl",
  });
  const deliveryAddress = await inputDeliveryAddress();
  const submitValues = { ...contactNumber, ...deliveryAddress };
  await clickSubmit();
  return submitValues;
}

beforeEach(() => {
  jest.resetAllMocks();
});

/**
 * 응답 성공 테스트
 */
test("성공하면 '등록됐습니다'가 표시된다", async () => {
  const mockFn = mockPostMyAddress();
  render(<RegisterAddress />);

  // mock 함수가 실행됨
  const submitValues = await fillValuesAndSubmit();
  expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(submitValues));
  expect(screen.getByText("등록됐습니다")).toBeInTheDocument();
});

/**
 * 응답 실패 테스트
 */
test("실패하면 '등록에 실패했습니다'가 표시된다", async () => {
  // mock 객체 준비
  const mockFn = mockPostMyAddress(500);
  render(<RegisterAddress />);

  // 올바른 값 초기화 및 제출
  const submitValues = await fillValuesAndSubmit();

  // api 호출 시 mockFn 인자 값 검증
  expect(mockFn).toHaveBeenCalledWith(expect.objectContaining(submitValues));
  expect(screen.getByText("등록에 실패했습니다")).toBeInTheDocument();
});

/**
 * 유효성 검사 오류 테스트
 * 준비 -> 실행 -> 검증 3단계로 정리한 테스트 코드 : AAA패턴
 */
test("유효성 검사 에러가 발생하면 '올바르지 않은 값이 포함되어 있습니다'가 표시된다", async () => {
  render(<RegisterAddress />); // 준비

  // invalid 한 값을 초기화하고 제출 버튼 클릭
  await fillInvalidValuesAndSubmit(); // 실행

  expect(
    screen.getByText("올바르지 않은 값이 포함되어 있습니다")
  ).toBeInTheDocument(); // 검증
});

/**
 * 알 수 없는 오류 테스트
 * mock 함수를 실행하지 않은 테스트에서는 웹 api 요청을 처리할 수 없어 오류가 발생
 */

test("원인이 명확하지 않은 에러가 발생하면 '알 수 없는 에러가 발생했습니다'가 표시된다", async () => {
  render(<RegisterAddress />);
  await fillValuesAndSubmit();
  expect(
    screen.getByText("알 수 없는 에러가 발생했습니다")
  ).toBeInTheDocument();
});

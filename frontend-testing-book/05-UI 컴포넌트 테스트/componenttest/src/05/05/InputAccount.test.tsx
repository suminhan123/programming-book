import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputAccount } from "./InputAccount";

/**
 * userEvent 로 문자열 입력 테스트
 * userEvent.setup 으로 api를 호출할 user 인스턴스 생성
 * userEvent 를 사용한 모든 인터랙션은 완료될 때까지 기다려야 하는 비동기 처리
 */
const user = userEvent.setup();

test("fieldset의 접근 가능한 이름을 legend에서 인용합니다", () => {
  render(<InputAccount />);
  expect(
    screen.getByRole("group", { name: "계정정보 입력" })
  ).toBeInTheDocument();
});

/**
 * 메일 주소 입력란 테스트
 * input type="text" => textbox
 */
test("메일주소 입력란", async () => {
  render(<InputAccount />);
  // 메일 주소 입력란 취득
  const textbox = screen.getByRole("textbox", { name: "메일주소" });
  const value = "taro.tanaka@example.com";

  // textbox에 value를 입력
  await user.type(textbox, value);
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

/**
 * 비밀번호 input type="password"는 역할을 가지지 X => 아래 테스트 오류 발생
 */
test("비밀번호 입력란", async () => {
  render(<InputAccount />);
  const textbox = screen.getByRole("textbox", { name: "비밀번호" });
  expect(textbox).toBeInTheDocument();
});

/**
 * placeholder 값을 참조하는 getByPlacehoderText 사용하면 비밀번호 입력란을 취득할 수 있다
 */
test("비밀번호 입력란", async () => {
  render(<InputAccount />);
  const password = screen.getByPlaceholderText("8자 이상");
  const value = "1234";

  await user.type(password, value);
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

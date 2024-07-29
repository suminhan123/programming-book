import { render, screen } from "@testing-library/react";
import { Agreement } from "./Agreement";

/**
 * legend 에 있는 문자를 fieldset 의 접근가능한 이름으로 인용할 수 있는 검증하는 테스트
 */
test("fieldset의 접근 가능한 이름을 legend에서 인용합니다", () => {
  render(<Agreement />);
  expect(
    screen.getByRole("group", { name: "이용 약관 동의" })
  ).toBeInTheDocument();
});

/**
 * 체크 박스의 초기 상태 검증
 */
test("체크 박스가 체크되어 있지 않습니다", () => {
  render(<Agreement />);
  expect(screen.getByRole("checkbox")).not.toBeChecked();
});

test("이용 약관 링크가 있다", () => {
  render(<Agreement />);
  expect(screen.getByRole("link")).toBeInTheDocument();
  expect(screen.getByRole("link")).toHaveTextContent("이용 약관");
  expect(screen.getByRole("link")).toHaveAttribute("href", "/terms");
  expect(screen.getByRole("link", { name: "이용 약관" })).toHaveAttribute(
    "href",
    "/terms"
  );
});

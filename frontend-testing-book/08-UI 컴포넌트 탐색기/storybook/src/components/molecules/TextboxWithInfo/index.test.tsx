import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { TextboxWithInfo } from ".";
import * as stories from "./index.stories";
const { FullProps } = composeStories(stories);

/**
 * TextboxWithInfo 컴포넌트 내부에서 사용하는 Textbox 컴포넌트 현재 상태를 aria 속성으로 판단
 * aria-invalid와 aria-errormessage 는 입력 내용에 오류가 있다는 것을 알리는 속성
 *
 * 접근성 대응이 충분한지 검증하는 매처 사용
 */
test("TextboxWithInfo", async () => {
  render(<FullProps />);
  expect(screen.getByRole("textbox")).toHaveAccessibleName("제목");
  expect(screen.getByRole("textbox")).toHaveAccessibleDescription(
    "영문과 숫자를 조합하여 64자 이내로 입력해주세요"
  );
  expect(screen.getByRole("textbox")).toHaveErrorMessage(
    "유효하지 않은 문자가 포함되어 있습니다"
  );
});

test("TextboxWithInfo", async () => {
  const args = {
    title: "제목",
    info: "0 / 64",
    description: "영문과 숫자를 조합하여 64자 이내로 입력해주세요",
    error: "유효하지 않은 문자가 포함되어 있습니다",
  };
  render(<TextboxWithInfo {...args} />);
  const textbox = screen.getByRole("textbox");
  // label의 htmlFor와 연관돼 있다.
  expect(textbox).toHaveAccessibleName(args.title);
  // aria-describedby와 연관돼 있다.
  expect(textbox).toHaveAccessibleDescription(args.description);
  // aria-errormessage와 연관돼 있다.
  expect(textbox).toHaveErrorMessage(args.error);
});

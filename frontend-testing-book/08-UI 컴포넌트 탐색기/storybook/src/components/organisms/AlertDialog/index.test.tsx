import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import * as stories from "./index.stories";

/**
 * 테스트에 스토리를 import (재활용)하려면 @storybook/testing-react 를 사용
 * => 이렇게 제스트를 사용하는 테스트에 스토리 파일을 불러온다
 */

/**
 * 제스트에서 스토리를 재사용할 때의 장점
 * - mock 모듈 혹은 스파이가 필요한 테스트를 작성할 수 있다
 * - 실행 속도가 빠르다
 *
 * 테스트 러너의 장점
 * - 테스트 파일을 따로 만들지 않아도 된다
 * - 실제 환경과 유사성이 높다
 */
const { Default, CustomButtonLabel, ExcludeCancel } = composeStories(stories);

describe("AlertDialog", () => {
  test("Default", () => {
    // 해당 스토리를 렌더링
    render(<Default />);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });

  test("CustomButtonLabel", () => {
    // 해당 스토리를 렌더링
    render(<CustomButtonLabel />);
    expect(screen.getByRole("button", { name: "OK" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "CANCEL" })).toBeInTheDocument();
  });

  test("ExcludeCancel", () => {
    // 해당 스토리를 렌더링
    render(<ExcludeCancel />);
    expect(screen.getByRole("button", { name: "OK" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "CANCEL" })
    ).not.toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { Header } from "./";

const user = userEvent.setup();

/**
 * 헤더 컴포넌트는 라우터를 사용하며, 테스트는 렌더링 및 요소 취득 뿐 아니라 URL 재현까지 해야한다
 * => 설정 함수를 생성하면 한곳에서 간편하게 처리 가능
 */
function setup(url = "/my/posts?page=1") {
  mockRouter.setCurrentUrl(url);
  render(<Header />);
  const combobox = screen.getByRole("combobox", { name: "공개 여부" });
  async function selectOption(label: string) {
    await user.selectOptions(combobox, label);
  }
  return { combobox, selectOption };
}

test("기본값으로 '모두'가 선택되어 있다", async () => {
  const { combobox } = setup();
  expect(combobox).toHaveDisplayValue("모두");
});

test("status?=public으로 접속하면 '공개'가 선택되어 있다", async () => {
  const { combobox } = setup("/my/posts?status=public");
  expect(combobox).toHaveDisplayValue("공개");
});

test("staus?=private으로 접속하면 '비공개'가 선택되어 있다", async () => {
  const { combobox } = setup("/my/posts?status=private");
  expect(combobox).toHaveDisplayValue("비공개");
});

/**
 * 사용자 인터랙션 테스트
 * user.selectOptions으로 셀렉트 박스(combobox)에서 임의의 항목을 선택
 */

test("공개 여부를 변경하면 status가 변한다", async () => {
  const { selectOption } = setup();
  expect(mockRouter).toMatchObject({ query: { page: "1" } });

  // '공개'를 선택하면 ?status=public이 된다.
  // 기존의 page=1이 그대로 있는지도 함께 검증한다.
  await selectOption("공개");
  expect(mockRouter).toMatchObject({
    query: { page: "1", status: "public" },
  });

  // '비공개'를 선택하면 ?status=private이 된다.
  await selectOption("비공개");
  expect(mockRouter).toMatchObject({
    query: { page: "1", status: "private" },
  });
});

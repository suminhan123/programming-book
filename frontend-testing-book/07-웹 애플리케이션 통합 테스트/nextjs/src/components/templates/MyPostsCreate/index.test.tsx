import * as MyPosts from "@/services/client/MyPosts/__mock__/msw";
import * as MyProfile from "@/services/client/MyProfile/__mock__/msw";
import { mockUploadImage } from "@/services/client/UploadImage/__mock__/jest";
import { selectImageFile, setupMockServer } from "@/tests/jest";
import { composeStories } from "@storybook/testing-react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import * as stories from "./index.stories";

const { Default } = composeStories(stories);
const user = userEvent.setup();

/**
 * typeTitle : 제목을 입력하는 함수
 * saveAsPublished : 공개 상태로 저장하는 함수
 * saveAsDraft : 비공개 상태로 저장하는 함수
 * clickButton : AlertDialog 의 네 혹은 아니오를 선택하는 함수
 * selectImage : 기사의 메인 이미지를 선택하는 함수
 */
async function setup() {
  const { container } = render(<Default />);
  const { selectImage } = selectImageFile();
  async function typeTitle(title: string) {
    await user.type(screen.getByRole("textbox", { name: "제목" }), title);
  }
  async function saveAsPublished() {
    await user.click(screen.getByRole("switch", { name: "공개 여부" }));
    await user.click(screen.getByRole("button", { name: "공개하기" }));
    await screen.findByRole("alertdialog");
  }
  async function saveAsDraft() {
    await user.click(
      screen.getByRole("button", { name: "비공개 상태로 저장" })
    );
  }
  async function clickButton(name: "네" | "아니오") {
    await user.click(screen.getByRole("button", { name }));
  }
  return {
    container,
    typeTitle,
    saveAsPublished,
    saveAsDraft,
    clickButton,
    selectImage,
  };
}

setupMockServer(...MyPosts.handlers, ...MyProfile.handlers);
beforeEach(() => {
  mockUploadImage();
  mockRouter.setCurrentUrl("/my/posts/create");
});

/**
 * AlertDialog 렌더링 테스트
 */
describe("AlertDialog", () => {
  test("공개를 시도하면 AlertDialog가 표시된다", async () => {
    const { typeTitle, saveAsPublished, selectImage } = await setup();
    await typeTitle("201");
    await selectImage();
    await saveAsPublished();

    expect(
      screen.getByText("기사를 공개합니다. 진행하시겠습니까?")
    ).toBeInTheDocument();
  });

  test("[아니오] 버튼을 누르면 AlertDialog가 사라진다", async () => {
    const { typeTitle, saveAsPublished, clickButton, selectImage } =
      await setup();
    await typeTitle("201");
    await selectImage();
    await saveAsPublished();
    await clickButton("아니오");
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });

  test("유효하지 않은 내용을 포함한 채로 제출하면 AlertDialog가 사라진다", async () => {
    const { saveAsPublished, clickButton, selectImage } = await setup();
    // await typeTitle("201");　제목을 입력하지 않은 상태
    await selectImage();
    await saveAsPublished();
    await clickButton("네");
    // 제목 입력란이 invalid 상태가 된다.
    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "제목" })).toBeInvalid();
    });

    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  });
});

/**
 * Toast 렌더링 테스트
 */
describe("Toast", () => {
  test("API 통신을 시도하면 '저장 중입니다...'가 표시된다", async () => {
    const { typeTitle, saveAsPublished, clickButton, selectImage } =
      await setup();
    await typeTitle("201");
    await selectImage();
    await saveAsPublished();
    await clickButton("네");
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("저장 중입니다...");
    });
  });

  test("공개에 성공하면 '공개됐습니다'가 표시된다", async () => {
    const { typeTitle, saveAsPublished, clickButton, selectImage } =
      await setup();
    await typeTitle("hoge");
    await selectImage();
    await saveAsPublished();
    await clickButton("네");
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("공개됐습니다")
    );
  });

  test("공개에 실패하면 '공개에 실패했습니다'가 표시된다", async () => {
    const { typeTitle, saveAsPublished, clickButton, selectImage } =
      await setup();
    await typeTitle("500");
    await selectImage();
    await saveAsPublished();
    await clickButton("네");
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("공개에 실패했습니다")
    );
  });
});

describe("화면이동", () => {
  test("비공개 상태로 저장 시 비공개한 기사 페이지로 이동한다", async () => {
    const { typeTitle, saveAsDraft, selectImage } = await setup();
    await typeTitle("201");
    await selectImage();
    await saveAsDraft();
    await waitFor(() =>
      expect(mockRouter).toMatchObject({ pathname: "/my/posts/201" })
    );
  });

  test("공개에 성공하면 화면을 이동한다", async () => {
    const { typeTitle, saveAsPublished, clickButton, selectImage } =
      await setup();
    await typeTitle("201");
    await selectImage();
    await saveAsPublished();
    await clickButton("네");
    await waitFor(() =>
      expect(mockRouter).toMatchObject({ pathname: "/my/posts/201" })
    );
  });
});

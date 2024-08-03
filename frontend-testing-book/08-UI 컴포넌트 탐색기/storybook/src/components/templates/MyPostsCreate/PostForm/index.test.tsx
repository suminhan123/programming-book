import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { mockUploadImage } from "@/services/client/UploadImage/__mock__/jest";
import { selectImageFile, setupMockServer } from "@/tests/jest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostForm } from ".";

/**
 * 작성하는 폼은 전송 전에 유효성 검사를 실시
 */
const user = userEvent.setup();

function setup() {
  const onClickSave = jest.fn();
  const onValid = jest.fn();
  const onInvalid = jest.fn();
  render(
    <PostForm
      title="신규 기사"
      onClickSave={onClickSave}
      onValid={onValid}
      onInvalid={onInvalid}
    />
  );

  // 제목을 입력하는 인터렉션 함수
  async function typeTitle(title: string) {
    const textbox = screen.getByRole("textbox", { name: "제목" });
    await user.type(textbox, title);
  }

  // 기사를 공개하는 인터렉션 함수
  async function saveAsPublished() {
    await user.click(screen.getByRole("switch", { name: "공개 여부" }));
    await user.click(screen.getByRole("button", { name: "공개하기" }));
  }

  // 비공개 상태로 저장하는 인터렉션 함수
  async function saveAsDraft() {
    await user.click(
      screen.getByRole("button", { name: "비공개 상태로 저장" })
    );
  }

  return {
    typeTitle,
    saveAsPublished,
    saveAsDraft,
    onClickSave,
    onValid,
    onInvalid,
  };
}

setupMockServer(handleGetMyProfile());

/**
 * onInValid가 실행되는 테스트
 */
test("유효하지 않은 내용을 포함해 '비공개 상태로 저장'을 시도하면 유효성 검사 에러가 표시된다", async () => {
  const { saveAsDraft } = setup();
  await saveAsDraft();

  // 제목이 공란이므로 유효성 검사 오류가 나타난다
  // 유효성 검사 오류가 나타나는 데 시간이 걸리므로 waitFor 계속 재시도
  await waitFor(() => {
    expect(screen.getByRole("textbox", { name: "제목" })).toHaveErrorMessage(
      "한 글자 이상의 문자를 입력해주세요"
    );
  });
});

test("유효하지 않은 내용을 포함해 '비공개 상태로 저장'을 시도하면 onInvalid 이벤트 핸들러가 실행된다", async () => {
  const { saveAsDraft, onClickSave, onValid, onInvalid } = setup();
  await saveAsDraft();
  expect(onClickSave).toHaveBeenCalled();
  expect(onValid).not.toHaveBeenCalled();
  expect(onInvalid).toHaveBeenCalled();
});

/**
 * onValid가 실행되는 테스트
 */
test("유효한 입력 내용으로 '비공개 상태로 저장'을 시도하면 onValid 이벤트 핸들러가 실행된다", async () => {
  mockUploadImage();
  const { typeTitle, saveAsDraft, onClickSave, onValid, onInvalid } = setup();

  const { selectImage } = selectImageFile();
  await typeTitle("나의 기사"); // 제목 입력
  await selectImage(); // 이미지 선택
  await saveAsDraft();

  expect(onClickSave).toHaveBeenCalled();
  expect(onValid).toHaveBeenCalled();
  expect(onInvalid).not.toHaveBeenCalled();
});

test("유효한 입력 내용으로 '공개하기'를 시도하면 onClickSave 이벤트 핸들러만 실행된다", async () => {
  const { typeTitle, saveAsPublished, onClickSave, onValid, onInvalid } =
    setup();
  await typeTitle("나의 기사");
  await saveAsPublished();
  expect(onClickSave).toHaveBeenCalled();
  expect(onValid).not.toHaveBeenCalled();
  expect(onInvalid).not.toHaveBeenCalled();
});

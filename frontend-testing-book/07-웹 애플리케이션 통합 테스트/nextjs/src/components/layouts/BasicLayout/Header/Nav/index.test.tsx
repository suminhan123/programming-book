import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { Nav } from "./";

/**
 * 라우터 부분을 테스트하려면 mock 객체를 사용
 * => next-router-mock 은 Next.js 의 라우터를 테스트할 수 있도록 mock 객체를 제공하는 라이브러리
 *
 * <Link /> 컴포넌트에서 발생하는 라우터 변화, useRouter 활용한 url 참조 혹은 변경 에 대한 통합 테스트를 jsdom에서 실행 가능
 */

// setCurrentUrl 호출하면 테스트 환경에서 URL 설정 가능
test("현재 위치는 My Post이다", () => {
  mockRouter.setCurrentUrl("/my/posts");
});

// toHaveAttribue 를 통해 설정한 url에 aria-current 속성을 검증해 테스트
test("현재 위치는 'My Posts'이다", () => {
  mockRouter.setCurrentUrl("/my/posts");
  render(<Nav onCloseMenu={() => {}} />);
  expect(screen.getByRole("link", { name: "My Posts" })).toHaveAttribute(
    "aria-current",
    "page"
  );
});

test("현재 위치는 'Create Post'이다", () => {
  mockRouter.setCurrentUrl("/my/posts/create");
  render(<Nav onCloseMenu={() => {}} />);
  const link = screen.getByRole("link", { name: "Create Post" });
  expect(link).toHaveAttribute("aria-current", "page");
});

/**
 * 동일한 테스트를 매개변수만 변경해 반복하고 싶다면 test.each 를 사용
 */
test.each([
  { url: "/my/posts", name: "My Posts" },
  { url: "/my/posts/123", name: "My Posts" },
  { url: "/my/posts/create", name: "Create Post" },
])("$url 의 현재 위치는 $name 이다", ({ url, name }) => {
  mockRouter.setCurrentUrl(url);
  render(<Nav onCloseMenu={() => {}} />);

  expect(screen.getByRole("link", { name })).toHaveAttribute(
    "aria-current",
    "page"
  );
});

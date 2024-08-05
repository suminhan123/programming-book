import { test, expect } from "@playwright/test";

/**
 * 브라우저 자동화 테스트는 테스트마다 브라우저를 열어 지정된 url로 접속한다
 */

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // 페이지 제목에 "Playwright"가 포함됐는지 검증한다.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // "Get started"라는 접근 가능한 이름을 가진 링크를 취득하고, 링크를 클릭한다.
  await page.getByRole("link", { name: "Get started" }).click();

  // 페이지 URL에 "intro"가 포함됐는지 검증한다.
  await expect(page).toHaveURL(/.*intro/);
});

/**
 * 로케이터 : 플레이라이트의 핵심 api => 현재 페이지에서 특정 요소를 가져온다
 * 신체적, 정신적 특성에 따른 차이 없이 동등하게 정보에 접근할 수 있도록 접근성 기반 로케이터를 우선적으로 사용하는 것을 권장
 */

test("Locator", async ({ page }) => {
  await page.getByLabel("User Name").fill("John"); // 인터랙션은 비동기 함수이므로 await 로 완료될 때까지 기다린다
  await page.getByLabel("Password").fill("secret-password");
  await page.getByRole("button", { name: "Sign in" }).click();
});

test("Locator를 사용한 단언문 작성법", async ({ page }) => {
  // 특정 문자열을 가진 요소를 취득해서 화면에 보이는 상태인지 검증한다.
  await expect(page.getByText("Welcome, John!")).toBeVisible();
  // 체크박스체크 박스를 취득해서 체크되어 있는지됐는지 검증한다.
  await expect(page.getByRole("checkbox")).toBeChecked();
  // not으로 진릿값을 반전시킨다.
  await expect(page.getByRole("heading")).not.toContainText("some text");
});

test("페이지를 사용한 단언문 작성법", async ({ page }) => {
  // 페이지 URL에 "intro"가 포함됐는지 검증한다.
  await expect(page).toHaveURL(/.*intro/);
  // 페이지 제목에 "Playwright"가 포함됐는지 검증한다.
  await expect(page).toHaveTitle(/Playwright/);
});

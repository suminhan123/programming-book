import { render, screen, within } from "@testing-library/react";
import { ArticleList } from "./ArticleList";
import { items } from "./fixture";

/**
 * getAllByRole 은 지정한 역할과 일치하는 모든 요소를 배열로 취득하는 api
 * => 3개의 li 요소가 표시되는 지 확인
 */
test("items의 수만큼 목록을 표시한다", () => {
  render(<ArticleList items={items} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("제목을 표시한다", () => {
  render(<ArticleList items={items} />);
  expect(
    screen.getByRole("heading", { name: "기사 목록" })
  ).toBeInTheDocument();
});

/**
 * ul 요소가 존재하는 지 검증
 */
test("목록을 표시한다", () => {
  render(<ArticleList items={items} />);
  expect(screen.getAllByRole("list")).toBeInTheDocument();
});

/**
 * 큰 컴포넌트를 다룰 때 취득한 list 노드로 범위를 좁혀 포함된 listitem 요소 숫자를 검증
 * 대상 범위를 좁혀서 취득하고 싶다면 within 함수를 사용
 */
test("items의 수만큼 목록을 표시한다", () => {
  render(<ArticleList items={items} />);
  const list = screen.getByRole("list");
  expect(list).toBeInTheDocument();
  expect(within(list).getAllByRole("listitem")).toHaveLength(3);
});

/**
 * getByRole 이나 getByLabelText 는 존재하지 않은 요소를 취득하려하면 오류
 * 존재하지 않음을 테스트하기 위해 queryBy 접두사를 붙인 api 를 사용
 * => 취득할 수 없으면 null 반환
 * => not.toBeInTheDocument , toBeNull 로 검증
 */
test("목록에 표시할 데이터가 없으면 '게재된 기사가 없습니다'를 표시한다", () => {
  render(<ArticleList items={[]} />);
  const list = screen.queryByRole("list");
  expect(list).toBeNull();
  expect(list).not.toBeInTheDocument();
  expect(screen.getByText("게재된 기사가 없습니다")).toBeInTheDocument();
});

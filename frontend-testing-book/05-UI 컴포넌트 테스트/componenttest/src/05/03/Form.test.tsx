import { fireEvent, render, screen } from "@testing-library/react";
import { Form } from "./Form";

/**
 * render 함수를 사용해 매개변수 name 이 할다한 값이 제대로 표시되는 가 테스트
 */
test("이름을 표시한다", () => {
  render(<Form name="taro" />);
});

/**
 * 렌더링된 요소 중 특정 DOM 요소를 취득하려면 screen.getByText 를 사용
 * => 일치한 문자열을 가진 한 개의 텍스트 요소를 찾는 api
 */
test("이름을 표시한다", () => {
  render(<Form name="taro" />);
  console.log(screen.getByText("taro"));
});

/**
 * toBeInTheDocument() 는 해당 요소가 DOM에 존재하는 가를 검증하는 커스텀 매처
 * => props 에 넘겨준 이름이 표시되는 가를 테스트할 수 있다
 */
test("이름을 표시한다", () => {
  render(<Form name="taro" />);
  expect(screen.getByText("taro")).toBeInTheDocument();
});

/**
 * screen.getByRole 함수는 특정 DOM요소를 역할로 취득할 수 있다
 */
test("버튼을 표시한다", () => {
  render(<Form name="taro" />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});

/**
 * heading 을 screen.getByRole 로 취득하면 h2 참조를 얻을 수 있다
 * h2에 원하는 문자가 포함됐는 지 테스트 가능
 */
test("heading을 표시한다", () => {
  render(<Form name="taro" />);
  expect(screen.getByRole("heading")).toHaveTextContent("계정 정보");
});

/**
 * 테스트 라이브러리는 암묵적 영학을 활용할 쿼리를 우선적으로 사용하도록 권장
 */

/**
 * 이벤트 핸들러 호출은 함수를 목함수로 검증
 * fireEvent 를 사용하면 임의의 DOM이벤트 발생이 가능
 */
test("버튼을 클릭하면 이벤트 핸들러가 실행된다", () => {
  const mockFn = jest.fn();
  render(<Form name="taro" onSubmit={mockFn} />);
  fireEvent.click(screen.getByRole("button"));
  expect(mockFn).toHaveBeenCalled();
});

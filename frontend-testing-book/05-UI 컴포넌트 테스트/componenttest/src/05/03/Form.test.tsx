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

/**
 * UI 컴포넌트가 예기치 않게 변경됐는 지 검증하고 싶다면 스냅숏 테스트
 * UI 컴포넌트를 HTML 문자열로 해당 시점의 렌더링 결과를 외부 파일에 저장
 */
test("Snapshot : 계정명인 'taro' 가 표시된다", () => {
  const { container } = render(<Form name="taro" />);
  expect(container).toMatchSnapshot();
});

/**
 * 회귀 테스트 발생시키기
 * 이미 커밋된 .snap 파일과 현시점의 스냅숏 파일을 비교하여 차이점이 발견되면 테스트가 실패
 */
test("Snapshot : 계정명인 'taro' 가 표시됐는 지 확인한다", () => {
  const { container } = render(<Form name="jiro" />);
  expect(container).toMatchSnapshot();
});

/**
 * 실패한 스냅숏을 갱신하기 위해
 * npx jest --updateSnapshot
 */

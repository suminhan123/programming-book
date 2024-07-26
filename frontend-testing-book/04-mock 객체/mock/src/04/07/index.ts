/**
 * 현재 시각에 의존하는 로직이 테스트 포함돼면 테스트 결과가 실행 시각에 의존
 * => 테스트 실행 환경의 현재 시각을 고정하면 언제 실행해도 같은 결과를 얻을 수 있다
 */

export function greetByTime() {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "좋은 아침입니다";
  } else if (hour < 18) {
    return "식사는 하셨나요";
  }
  return "좋은 밤 되세요";
}

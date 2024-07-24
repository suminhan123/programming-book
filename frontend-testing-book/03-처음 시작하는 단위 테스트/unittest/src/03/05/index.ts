/* 코드 3-20 원서 저장소에는 HttpError는 없음 */
export class HttpError extends Error {}
export class RangeError extends Error {}

// export function add(a: number, b: number) {
//   const sum = a + b;
//   if (sum > 100) {
//     return 100;
//   }
//   return sum;
// }

//add("1", "2"); // 타입 어노테이션이 있는 경우 다른 타입에 대해 실행 전 에러가 발생 => 예외 발생시키는 처리를 추가하지 X

// 특정 범위로 입력값을 제한하고 싶을 때 런타임에 예외 발생시키는 처리를 추가
// 에지 케이스 검증 코드
export function addRange(a: number, b: number) {
  if (a < 0 || a > 100) {
    throw new Error("0〜100 사이의 값을 입력해주세요");
  }
  if (b < 0 || b > 100) {
    throw new Error("0〜100 사이의 값을 입력해주세요");
  }
  const sum = a + b;
  if (sum > 100) {
    return 100;
  }
  return sum;
}

// Error 클래스를 더욱 구체적인 상황에 맞춰 작성해보자

// if (err instanceof HttpError) {
//   // 발생한 에러가 HttpError인 경우
// }
// if (err instanceof RangeError) {
//   // 발생한 에러가 RangeError인 경우
// }

// 0~100 사이의 값이 아니면 RangeError 인스턴스를 throw
function checkRange(value: number) {
  if (value < 0 || value > 100) {
    throw new RangeError("0〜100 사이의 값을 입력해주세요");
  }
}

export function add(a: number, b: number) {
  // 예외 발생시키는 부분 한 곳에서 처리
  checkRange(a);
  checkRange(b);
  const sum = a + b;
  if (sum > 100) {
    return 100;
  }
  return sum;
}

export function sub(a: number, b: number) {
  checkRange(a);
  checkRange(b);
  const sum = a - b;
  if (sum < 0) {
    return 0;
  }
  return sum;
}

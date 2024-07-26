import { getMyProfile } from "../fetchers";

export async function getGreet() {
  /**
   * getMyProfile 함수를 호출하면 웹 api 클라이언트를 호출하게 된다
   * => 응답할 api 서버가 없으면 getGreet 함수는 테스트가 불가능
   * => getMyProfile 함수를 스텁으로 대체하면 실제 서버의 응답 여부 상관없이 테스트 가능!!
   */
  const data = await getMyProfile();
  if (!data.name) {
    // 1. name이 없으면 하드코딩된 인사말을 반환한다.
    return `Hello, anonymous user!`;
  }
  // 2. name이 있으면 name을 포함한 인사말을 반환한다.
  return `Hello, ${data.name}!`;
}

// export function getMyProfile(): Promise<Profile> {
//   return fetch("https://myapi.testing.com/my/profile").then(async (res) => {
//     const data = await res.json();
//     if (!res.ok) {
//       // 200번대 이외의 응답인 경우
//       throw data;
//     }
//     return data;
//   });
// }

// export async function getGreet() {
//   // 테스트하고 싶은 것은 이 라인에서의 데이터 취득 여부와
//   const data = await getMyProfile();
//   // 취득한 데이터를 이 라인에서 사용할 수 있는지다.
//   if (!data.name) {
//     return `Hello, anonymous user!`;
//   }
//   return `Hello, ${data.name}!`;
// }

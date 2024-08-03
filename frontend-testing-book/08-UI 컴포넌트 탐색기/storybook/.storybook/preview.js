import { handleGetMyProfile } from "@/services/client/MyProfile/__mock__/msw";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { withScreenshot } from "storycap";

/**
 * Global 단계 : 모든 스토리에 적용할 설정 => .storybook/preview.js
 * Component 단계 : 스토리 파일에 적용할 설정 => export default
 * Story 단계 : 개별 스토리에 적용할 설정 => export const
 */

// 공통 msw 설정
// export const parameters = {
//   // 기타 설정 생략
//   msw: {
//     handlers: [
//       rest.get("/api/my/profile", async (_, res, ctx) => {
//         return res(
//           ctx.status(200),
//           ctx.json({
//             id: 1,
//             name: "EonsuBae",
//             bio: "프런트엔드 엔지니어. 타입스크립트와 UI 컴포넌트 테스트에 관심이 있습니다.",
//             twitterAccount: "eonsu-bae",
//             githubAccount: "eonsu-bae",
//             imageUrl: "/__mocks__/images/img01.jpg",
//             email: "eonsubae@example.com",
//             likeCount: 1,
//           })
//         );
//       }),
//     ],
//   },
// };

export const parameters = {
  // Actions를 활용한 이벤트 검증
  // on으로 시작하는 모든 이벤트 핸들러 자동적으로 Actions 패널에 로그를 출력
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  //모든 스토리에 로그인한 사용자 정보가 필요하다면 로그인한 사용자 정보를 반환하는 msw 핸들러를 설정
  msw: { handlers: [handleGetMyProfile()] },
  layout: "fullscreen",
};
// mswDecorator 모든 스토리에 필요하므로 설정
export const decorators = [mswDecorator, withScreenshot];

// initialize 함수를 실행해 msw 를 활성화
initialize();

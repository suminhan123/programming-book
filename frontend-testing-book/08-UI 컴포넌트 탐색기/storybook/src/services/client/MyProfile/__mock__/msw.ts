import { rest } from "msw";
import { path } from "..";
import { getMyProfileData } from "./fixture";

/**
 * 고차함수로 요청 핸들러 리팩토링
 * 웹 api에 의존하는 컴포넌트에서 요청 핸들러 작성하는 부분이 훨씬 간결해진다
 */
export function handleGetMyProfile(args?: {
  mock?: jest.Mock<any, any>;
  status?: number;
}) {
  return rest.get(path(), async (_, res, ctx) => {
    args?.mock?.();
    if (args?.status) {
      return res(ctx.status(args.status));
    }
    return res(ctx.status(200), ctx.json(getMyProfileData));
  });
}

export const handlers = [handleGetMyProfile()];

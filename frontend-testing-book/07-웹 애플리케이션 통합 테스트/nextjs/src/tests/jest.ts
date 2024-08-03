import type { RequestHandler } from "msw";
import { setupServer } from "msw/node";

/**
 * setupServer 함수에 가변 인수로 넘기면 요청을 가로챌 수 있다
 * => 테스트할 때마다 서버를 초기화
 */
export function setupMockServer(...handlers: RequestHandler[]) {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return server;
}

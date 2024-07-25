import { timeout, wait } from ".";
/**
 * 비동기 처리 테스트
 */
describe("wait", () => {
  describe("Promise를 반환하는 테스트 방법", () => {
    /**
     * Promise 를 반환하면서 then에 전달할 함수에 단언문을 작성
     * wait 함수를 실행하면 Promise 인스턴스가 생성
     * => 해당 인스턴스를 테스트 함수의 반환값으로 return 하면 Promise 가 처리 중인 작업이 완료될 때까지 테스트 유예
     */
    test("지정 시간을 기다린 뒤 경과 시간과 함께 resolve 된다", () => {
      return wait(50).then((duration) => {
        expect(duration).toBe(50);
      });
    });

    /**
     * resolves 매처를 사용하는 단언문을 return
     * => wait 함수가 resolve 됐을 때 값을 검증
     */
    test("지정 시간을 기다린 뒤 경과 시간과 함께 resolve 된다", () => {
      return expect(wait(50)).resolves.toBe(50);
    });
  });

  describe("async/await 를 활용한 테스트 방법", () => {
    /**
     * 테스트 함수를 async 함수로 만들고 함수 내에서 Promise 가 완료될 때까지 기다리는 방법
     */
    test("지정 시간을 기다린 뒤 경과 시간과 함께 resolve 된다", async () => {
      await expect(wait(50)).resolves.toBe(50);
    });

    /**
     * 검증값인 Promise 가 완료되는 것을 기다린 뒤 단언문을 실행
     */
    test("지정 시간을 기다린 뒤 경과 시간과 함께 resolve 된다", async () => {
      expect(await wait(50)).resolves.toBe(50);
    });
  });
});

/**
 * reject 검증 테스트
 */
describe("timeout", () => {
  test("지정 시간을 기다린 뒤 경과 시간과 함께 reject된다", () => {
    return timeout(50).catch((duration) => {
      expect(duration).toBe(50);
    });
  });

  /**
   * rejects 매처를 사용하는 단언문을 return
   */
  test("지정 시간을 기다린 뒤 경과 시간과 함께 reject된다", () => {
    return expect(timeout(50)).rejects.toBe(50);
  });

  /**
   * async/await 활용
   */
  test("지정 시간을 기다린 뒤 경과 시간과 함께 reject된다", async () => {
    await expect(timeout(50)).rejects.toBe(50);
  });

  /**
   * try-catch 문을 사용
   */
  test("지정 시간을 기다린 뒤 경과 시간과 함께 reject된다", async () => {
    expect.assertions(1); // 실행되어야 하는 단언문의 횟수를 인자로 받아 기대한 횟수 만큼 단언문이 호출됐는 지 검증

    try {
      await timeout(50);
    } catch (err) {
      expect(err).toBe(50);
    }
  });
});

/**
 * 비동기 처리를 테스트 할 때 테스트 함수가 동기함수라면 반드시 단언문을 return 해줘야 한다
 * - 비동기 처리가 포함된 부분을 테스트할 때는 테스트 함수를 async 함수로 만든다
 * - .resolves 나 .rejects 가 포함된 단언문은 await
 * - try-catch 문의 예외 발생 검층할 때는 expect.assertions 사용
 */

test("return하고 있지 않으므로 Promise가 완료되기 전에 테스트가 종료된다", () => {
  // 실패할 것을 기대하고 작성한 단언문
  expect(wait(2000)).resolves.toBe(3000);
  // 올바르게 고치려면 다음 주석처럼 단언문을 return해야 한다
  // return expect(wait(2000)).resolves.toBe(3000);
});

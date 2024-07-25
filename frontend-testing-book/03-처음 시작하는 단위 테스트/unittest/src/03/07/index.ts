/**
 * 인수에 대기 시간을 지정하면 지정한 시간만큼 대기하고, 경과시간을 반환값으로 resolve 하는 함수
 */

export function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(duration);
    }, duration);
  });
}

/**
 * 인수에 대기 시간을 지정하면 지정한 시간만큼 대기하고, 경과시간을 반환값으로 reject 하는 함수
 */
export function timeout(duration: number) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(duration);
    }, duration);
  });
}

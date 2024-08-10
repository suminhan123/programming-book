# Javascript Bundle Diet

https://toss.im/slash-21/sessions/3-2

## 왜 번들 사이즈가 중요할까?

![image](https://github.com/user-attachments/assets/0fabd804-293f-4a7f-ba22-8336b2d0df13)
페이지 로딩 속도와 페이지 이탈률의 관계를 나타내는 그래프

=> 웹 사이트 로딩 속도는 고객 획득에 큰 영향을 준다

웹 사이트에 api 콜이 너무 많거나, 리소스가 큰 등의 원인으로 느려질 수 있다

그 중 느려지는 원인인 **번들 사이즈에 집중**해볼 것이다

![image](https://github.com/user-attachments/assets/1b2a95a9-0a00-4e0f-add8-d38e42ea7bb7)

javascript 파일과 이미지 파일을 비교해보면

이미지는 파일을 다운로드한 후 디코딩만 하면 된다

자바스크립트는 파일을 다운로드한 후 파싱을 거치고 컴파일, 실행까지 여러 단계를 거치기에 처리 비용이 높다

=> 그렇기에 자바스크립트 번들 최적화는 매우 중요하다!

### 번들 사이즈 줄이기

### 원인 찾기

- webpack analyse
- webpack visualizer
- webpack bundle analyzer(추천)

#### webpack bundle analyzer

용량별로 시각화해주기 때문에 어떠한 라이브러리가 많이 사용되고 있는 지를 알 수 있다

### 라이브러리 중복 줄이기

종종 같은 라이브러리지만 버전이 다른 경우를 발견할 수 있다

=> 원인은 **npm 특성**!

![image](https://github.com/user-attachments/assets/b057a228-6089-4083-b1f5-6a0d8fe3053d)

npm과 같은 패키지 매니저들은 라이브러리의 관계를 분석하고, 필요한 라이브러리를 다운로드

A,B 라이브러리를 사용하고 A,B가 같은버전 C 라이브러리를 사용하면 패키지 매니저는 A, B, C를 모두 다운로드 받아둘 것이다.

#### dependency conflict

![image](https://github.com/user-attachments/assets/968fd358-3560-4b3d-9380-ae44fe0a7e4a)

여러 라이브러리가 같은 라이브러리의 서로 다른 버전을 참조하는 경우가 있다

=> 이러한 문제를 패키지 매니저 마다 다양한 방식으로 해결

![image](https://github.com/user-attachments/assets/bf002800-60d0-4c91-a304-3213fec6468a)

npm의 해결책은 다른 패키지 매니저와 다르게 **tree 구조로 필요한 버전을 모두 받는 방식**을 선택

한 라이브러리에 dependency가 있다면 그 라이브러리 아래에 또 node_modules 폴더를 만들어서 그곳에 dependency 의 dependency를 저장

=> node 런타임이 상황에 맞게 부모의 node_modules 를 가져갈 지 자식의 node_modules 를 가져갈 지 적합한 폴더를 잘 선택

=> webpack도 같은 방식으로 번들링

서로 다른 두 버전이라 할 지라도, 모두 번들되어 요청에 따라 각각 다른 버전의 라이브러리를 사용

**npm의 장점**

- dependency 를 더 편하게 관리

- 작성자가 의도한 버전대로 동작

**npm의 단점**

- 중복된 라이브러리가 쌓이게 되면 번들사이즈가 커지고, tree 구조로 라이브러리를 계속 저장하게 되면 node_modules 도 과도하게 큰 용량을 차지하게 된다

<br />

![image](https://github.com/user-attachments/assets/b1c05291-845e-446b-8df2-9592afa48357)

node_modules 가 과도하게 커지는 문제를 해결하기 위해 npm은 라이브러리들이 시멘틱 버전 semver 를 지킨다고 가정

=> 메이저 버전이 바뀌지 않는 한 더 높은 버전을 사용해도 문제가 없으니 둘 중 더 높은 버전만 받아 중복 라이브러리를 줄이고 있다

하지만 항상 잘 동작X

#### npm dedupe

중복된 모듈을 줄일 수 있는 명령어

dedupe 을 사용하면 설치과정에서 놓친 중복된 라이브러리의 버전을 확인하고 적합한 버전으로 통합

### yarn의 경우

yarn 은 라이브러리 설치 과정에서 완벽히 처리하기에 신경쓸 필요X

하지만 완벽하지 않기에 **yarn dedupelicate 라는 라이브러리를 이용해 중복된 라이브러리를 제거**

### lodash의 경우

lodash를 사용하지 않더라도 다른 서브 파티 라이브러리로 인해 lodash가 번들에 포함된 경우가 많이 있다

=> lodash 최적화가 유용

다양한 버전의 lodash가 존재
또한 각 기능별로도 단독 패키지가 존재

=> webpack의 alias 기능을 이용하면 라이브러리를 lodash만 이용하도록 만들 수 있다

일부 라이브러리는 버전을 맞추거나, 동일한 기능을 하는 라이브러리로 변환하여 중복된 구현을 피할 수 있다

#### 필요한 코드만 사용하도록 수정

lodash는 tree shaking 을 지원X => 꼭 필요한 코드만 사용하도록 수정

babel-lodash-plugin을 사용해 사용적인 부분만 가려낼 수 있다

비슷한 문제는 babel-plugin-transform-imports 를 사용하여 소스코드를 수정하지 않고도 결과물을 최적화할 수 있다

### 더 가벼운 라이브러리 사용하기

lodash는 생각보다 용량이 크다 (groupBy : 6kB)

그 이유는 shorthands 표현 캐싱 등을 지원

따라서 더 가벼운 라이브러리를 찾아야 한다

webpack은 브라우저와 node 환경을 최대한 맞추기 위해 필요할 경우 polyfill을 추가할 수 있다

=> 라이브러리 자체 용량이 적어 사용해보니 polyfill이 추가될 경우 더 느려지는 경우도 있다

가끔 polyfill이 들어갈 수 있어 명시적으로 끄거나, 브라우저를 잘 판단하는 라이브러리 사용을 권장

### Bundle Phobia

설치전 라이브러리를 잘 고르고 비교하기 위한 사이트

gzip으로 압축되었을 때 용량과 다운로드 속도, 각 버전 별 용량을 쉽게 확인할 수 있다

![image](https://github.com/user-attachments/assets/9c4037f6-9c16-4b80-93e2-7a499b034fb5)

라이브러리의 dependency를 미리 확인할 수 있다.

용량이 크더라도 이미 사용하고 있는 라이브러리와 많이 겹친다면 용량 변화는 미미할 테니 사용을 고려할 수 있다

**Exports Analysis**

tree-shaking이 되었을 때, 함수 별로 얼마나 용량을 차지할 지 미리 확인해볼 수 있다

### 더 가벼운 라이브러리 만들기

#### tree-shaking

라이브러리 제작자 관점에서 중요한 것은 tree-shaking

tree-shaking 은 불필요한 코드를 정적 분석을 통해 제거하는 기술

tree-shaking 을 지원한다면 정말로 사용하는 코드만 번들에 포함되기에 더 가벼운 번들을 만들 수 있다

```javascript
export const a = foo();
export const b = bar();
```

```javascript
import { b } from "./boo";
```

a와 b를 export 하는데 b만 사용하고 있다

=> a를 번들에서 빼도 될까?

side effect(순서나 호출 위치에 따라 동작이 달라지는 경우)가 없을 때만 가능 ,안그러면 동작이 달라질 수 있다

번들러는 side effect 를 얼마나 잘 판단하는 지에 따라서 tree-shaking 을 잘할 수도 못할 수 있다

=> webpack은 side effect 판단을 어려워 하는 편

![image](https://github.com/user-attachments/assets/e8fc6563-cd59-40ad-b71e-c093a989c5f2)

라이브러리를 만들 때에는 webpack에게 side effect 여부를 알려줘야 한다

webpack은 package.json에 sideEffects 를 참고해 어떤 파일에 side effect 가 있는 지를 확인

=> side effect 가 없다면 오른쪽 처럼 side effect 가 없는 라이브러리라고 명시

사용자 의도와 달리 side effect 가 발생할 수 있어 webpack이 모두 신뢰X

=> webpack은 side effecs 필드가 있을 때만 코드를 확인하고 tree-shaking 을 시도

![image](https://github.com/user-attachments/assets/f4362800-8678-4efa-9892-590ed9802021)

rollup 번들러는 하나의 output 을 만들어준다

하지만 preserveModules 옵션을 켜주면 오른 쪽 처럼 원본 소스코드와 유사한 구조의 output이 나온다

왼쪽의 경우 단일 output 파일의 경우 원본 파일의 일부에 tree-shaking 이 불가능한 코드가 섞여 있다면 최종 output 은 한 파일이므로 파일 전체가 tree-shaking에 실패

preserveModules 옵션으로 빌드한다면 이런 경우에도 일부 파일만 tree-shaking 에 실패하므로 문제 완화

### 컴파일 툴, terser

webpack에서 직접 dead 코드를 제거하기도 하지만 프로덕션 빌드에선 다른 라이브러리의 도움을 받기도 한다

terser는 side effect 유무를 판단하여 코드를 지운다
![image](https://github.com/user-attachments/assets/f4e4d77a-59ba-4a61-9e03-0ee5282cf3ac)
=> terser의 판단을 돕는 것이 pure annotation

pure 주석을 보면 이 코드는 side effect 가 없다고 판단

=> 바벨을 이용해 컴파일하는 것을 권장

babel-plugin-transform-react-pure-annotations 덕분에 pure annotation이 자동으로 삽입

### webpack stats

라이브러리가 의도와 다르게 side effect 가 발생한다면 문제 원인을 찾기 위한 기능

웹팩이 번들링 도중에 분석한 다양한 정보를 json 포맷으로 저장가능

### 라이브러리 영향 줄이기

라이브러리 용량을 줄이기 어렵다면 무거운 라이브러리 영향을 최소화

#### single common chunk

![image](https://github.com/user-attachments/assets/4f0acec4-e4b6-447c-bace-21f8c72b031f)

단일 청크나, vender/유저 청크 두가지 output

=> 라이브러리가 추가되면 모든 페이지의 용량이 한번에 증가

#### granular chunks

![image](https://github.com/user-attachments/assets/797c407c-fa45-4459-b5e0-78146e1d7cae)

문제를 해결하기 위해 nextjs 는 청크를 나누고 있다

- framework : react, react-dom, next
- commons: 모든 페이지에서 사용하는 코드를 모아둔 청크

  모든 페이지에서 받아지며 먼저 진입한 페이지에서 캐싱되어 효율적으로 리소스 관리가 가능

- shared 청크 : 두 페이지 이상 공유하는 코드를 모아둔 청크

- 특정 페이지에서만 사용하는 청크

청크를 나누면 무거운 라이브러리를 사용하더라도 라이브러리를 사용하는 페이지에서만 받기 때문에 영향을 최소화 가능

또한, 페이지를 이동할 때 필요한 청크만 받을 수 있다

#### dynamic import

```javascript
import dynamic from "next/dynamic";

const PageA = () => dynamic(() => import("./PageA"));
const PageB = () =>
  /* webpackPrefetch: true */ dynamic(() => import("./PageB"));
```

필요할 때만 받는 dynamic import

webpack magic comment 를 이용하면 prefetch 기능을 이용 할 수 있다

prefetch 기능은 여유로운 시간에 미리 받아두기 때문에 사용자에게 최소한의 지연시간을 줄 수 있다

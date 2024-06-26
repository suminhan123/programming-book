## 1. 모노 레포란?

> 모노 레포란 버전 관리 시스템에서 두 개 이상의 프로젝트 코드가 동일한 저장소에 저장되는 소프트웨어 개발 전략이다.

이 개발 전략은 고전적 소프트 웨어 개발 방식인 모놀리식 애플리케이션의 한계에 대한 비판에서 출발한다.

### 1-1. 모놀리식 애플리케이션의 한계

> 소프트웨어 엔지니어링에서 모놀리식 애플리케이션이란 모듈화 없이 설계된 소프트웨어 애플리케이션을 말한다.

![](https://velog.velcdn.com/images/hansoom3315/post/50262f0f-57cd-4dd1-998b-fa786c7a8cb6/image.png)

거대 서비스를 개발할 때, 소스 코드가 모듈화 없이 하나의 프로젝트로 구성된다면 어떻게 될까? 코드가 서로 직접적으로 의존하며 단 하나의 버전으로 관리 관심분리가 어려워진다.
또한, 설계, 리팩토링, 배포 등의 작업을 매번 거대한 단위로 처리해야 하므로 개발 상 많은 제약과 비효율이 존재한다.

### 1-2. 모듈화와 재사용성

모놀리식 구조의 한계는 모듈화를 통해 해결할 수 있다. 일반적으로 모듈식 프로그래밍은 애플리케이션 로직의 일부를 재사용할 수 있도록 지원하고 전체 교체없이 애플리케이션의 일부를 수정 또는 교체할 수 있게 해 유지 관리를 용이하게 한다.

![](https://velog.velcdn.com/images/hansoom3315/post/60b9be2f-3e4c-4767-9693-aadcd98af952/image.png)

그런데 이렇게 만든 모듈이 다른 애플리케이션에도 사용될 수 있다면 소스를 어디에 위치시켜야 할까?
아마도 해당 모듈을 위한 독자적인 저장소가 있다면 좀 더 관리하기 쉬울 것이다. 이 구조가 **멀티레포**이다.

### 1-3. 멀티 레포

멀티레포 구조는 폴리레포 구조라고도 부른다. 앞선 예시의 분리된 각 모듈은 멀티레포 구조에서 고유한 저장소가 있는 독자적 프로젝트가 된다. 각 프로젝트는 자율성이 높으며 독립적인 개발, 린트, 테스트, 빌드, 게시, 배포 파이프라인이 존재한다.
![](https://velog.velcdn.com/images/hansoom3315/post/8287950f-e090-4bd8-973c-37c29f3518a4/image.png)

멀티 레포는 현재 대부분의 애플리케이션을 개발하는 표준적인 방법이다. 애플리케이션 개발의 라이프 사이클을 스스로 결정할 수 있기에 자율성을 가지고 있다.
![](https://velog.velcdn.com/images/hansoom3315/post/abcb8578-3b9c-4525-ba24-62d394f6f917/image.png)

하지만 여기에도 문제가 존재한다. 자율성은 고립에 의해 제공되고 고립은 협업을 방해한다.
멀티레포를 통해 모놀리식 구조의 문제를 해결했지만 다음과 같은 새로운 문제가 생긴다.

### 1-4. 멀티 레포의 문제

- 번거러운 프로젝트 생성
  새로운 공유 패키지를 생성할 때마다 다음과 같은 번거로운 과정을 거져야 한다.
  > 저장소 생성 > 커미터 추가 > 개발 환경 구축 > CI/CD 구축 > 빌드 > 패키지 저장소에 publish

![](https://velog.velcdn.com/images/hansoom3315/post/7bc51092-63f9-4565-951a-c25d8bb0a69b/image.png)

- 관리 포인트 증가
  늘어난 프로젝트 저장소의 수만큼 관리 포인트가 늘어난다. 린트, 테스트, 개발 모드 실행, 빌드, 게시, 배포 등의 과정을 저장소의 수만큼 반복해야한다.

- 일관성 없는 개발자 경험(DX)
  각 프로젝트는 테스트 실행, 빌드, 테스트, 린트, 배포 등을 위해 고유한 명령 집합을 사용한다. 이러한 불일치는 여러 프로젝트에서 사용할 명령을 기억해야하는 정신적 오버헤드를 만든다.

- 다른 패키지의 변경 사항 파악
  관련 패키지의 변화를 지켜보거나 통지를 받지 않으면 문제가 발생할 수 있다.

- 교차 저장소의 리팩토링 비용
  관련 패키지의 변화가 있을 때 여러 저장소에 걸쳐 변화를 반영하는 것은 쉬운 일이 아니다. 또한 이렇게 리팩토링 된 각 패키지의 버전은 어떻게 관리해야 할까..

그렇다면 모듈을 적절히 분리하여 관심 분리를 이루면서, 동시에 분리된 모듈을 쉽게 참조하고 테스트, 빌드, 배포 과정도 쉽게 한 번에 할 수는 없을까?

### 1-5 모노레포가 해결하는 문제

#### 모노 레포의 특징

모노레포 구조는 앞서 말했든 2개 이상의 프로젝트가 동일한 저장소에 저장되는 소프트웨어 개발 전략이다.
앞선 예시의 분리된 모듈들은 모노 레포에서 여전히 독자 프로젝트로 존재하지만, 저장소는 같은 곳을 사용한다.

![](https://velog.velcdn.com/images/hansoom3315/post/45c74191-076a-49ec-8976-5b2bad5926d8/image.png)

모노 레포의 또 다른 중요한 특징 중 하나는 **프로젝트 간의 관계**이다. 단순히 여러 프로젝트가 하나의 저장소를 사용한다고 해서 모노 레포 구조라고 부르기에는 부족하다.
흔히 모노레포에서는 프로젝트 사이에 의존성이 존재하거나 같은 제품군이거나 하는 정의된 관계가 존재한다.

아래에서 소개할 모노레포 관리 도구는 모두 이러한 관계를 효율적으로 관리해주는 도구하라고 할 수 있다.

#### 모노 레포가 해결하는 멀티레포의 문제

- 더 쉬운 프로젝트 생성
  멀티 레포에서 공유 패키지를 만들 때 다음과 같은 과정을 거친다.
  > 저장소 생성 > 커미터 추가 > 개발 환경 구축 > CI/CD 구축 > 빌드 > 패키지 저장소에 publish

모노 레포에서는 저장소 생성 및 커미터 추가 과정이 필요 없고, 개발 환경, CI/CD, 빌드, 게시 등의 과정에 기존 DevOps 를 이용므로 새 프로젝트 생성에 대한 오버헤드가 없다.

- 더 쉬운 의존성 관리
  의존성 패키지가 같은 저장소에 있으므로 버전이 지정된 패키지를 publish 할 필요가 없다.

- 단일화된 관리 포인트
  개발환경 및 DevOps 에 대한 업데이터를 한 번에 반영할 수 있다.

- 일관된 개발자 경험 제공
  애플리케이션을 일관되게 구축하고 테스트할 수 있다.

- 프로젝트들에 걸친 원차적 커밋
  커밋할 때마다 모든 것이 함께 작동한다. 변경 사항의 영향을 받는 조직에서 쉽게 변화를 확인할 수 있다.
- 서로 의존하는 저장소들의 리팩터링 비용 감소
  모노 레포는 대규모 변경을 훨씬 더 간단하게 만든다. 100개의 라이브러리로 만든 10개의 앱을 리팩토링하고 변경을 커밋하기 전에 모두 작동하는 지 확인할 수 있다.

#### 모노 레포 오해

- 다른 팀이 내가 모르는 사이에 내 코드를 변경한다면?
  이를 위해서는 GitHubd에서 GODEOWNERS 와 같은 기능을 사용하여 폴더 기반으로 소유권을 구성할 수 있다.

## 2. 모노레포 vs 멀티 레포

항상 모노레포가 멀티레포보다 항상 나은 방법이라고 할 수 없다!!
멀티레포의 단점이 모노레포의 장점이고 장단점이 교차하기 때문에 적절한 상황에서 사용해야 한다.

모노레포가 적절한 상황

- 유사한 제품의 집합
- 여러 프로젝트의 변화를 한눈에 파악해야 할 때
- 호스트 애플리케이션을 플러그인 등으로 확장할 때
- 공통 기능을 재사용하는 관련된 프로젝트의 집합
- 유사한 DevOps 로 구성된 프로젝트의 집합

## 3. 모노 레포 구축을 도와주는 도구

- Yarn
  - React
  - React-router
  - Babel (Yarn Berry)
- Lerna + Yarn
  - Next.js
  - Babel (v7.12.12)
  - Jest
  - Create React App
  - Storybook
  - Vue-cli
  - Nuxt.js
  - Webpack-cli
- Lerna + Npm
  - Apollo-server
- Nx
  - Storybook
  - FluentUI
  - NgRx
- Turborepo
  - Vercel
  - Lattice
  - TeeSpring
  - MakeSwift
  - On Deck
  - Astro
- Pnpm
  - Vue 3

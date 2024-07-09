## Intersection Observer 란

### 무한 스크롤 성능 문제

기존에는 `스크롤 이벤트`를 활용하여 스크롤을 할 때마다 이벤트를 발생시키는 방법(addEventListener 가 중복해서 쌓이고 복잡한 로직이 섞여 있으면 성능 이슈가 발생!!)으로 요소가 화면에 나타나는지 여부를 확인했다.

스크롤 이벤트로 무한 스크롤을 구현하게 된다면, 스크롤 이벤트 핸들러가 실행되는 동안에는 브라우저가 다른 작업을 처리하지 못할 수 있어 즉, **동기적으로 실행**이 되기 때문에 메인 스레드에 영향을 준다.

예를 들어,

```
<StyledCardListContainer onScroll={handleScroll}>
  {comments.map((comment) => (
    <Card key={comment.id} comment={comment} />
  ))}
</StyledCardListContainer>
```

기존 스크롤 바를 기반으로 무한 스크롤을 구현하면 **스크롤이 될 때마다 handleScroll 함수가 동작**하게 된다.

handleScroll 메서드는 결국 자바스크립트의 메인엔진에서 실행이 되어야하므로 많은 부하가 걸리게 된다.

### 자바스크립트로 무한 스크롤을 구현

자바스크립트로 무한스크롤을 구현해보면서 성능의 문제를 파악해볼 것이다!

`Element.getBoundingClientRect() 메서드`는 element 의 크기와 뷰포트에 상대적인 위치 정보를 제공하는 DOMRect 객체를 반환하는데, getBoundingClientRect() 를 통해 우리가 원하는 특정 위치를 정할 수 있다.

document 에 스크롤 이벤트 `addEventListener()의 scroll 이벤트`를 등록하여 element 의 현재 지점을 관찰하고 element 가 특정 위치에 도달했을 때 실행할 콜백함수를 등록하여 구현할 수 있다.

```javascript
<!-- 빈 리스트 -->
<ul id='infinite-list'>
</ul>
// 빈 리스트 선택
const listElem = document.querySelector('#infinite-list');

// 20개의 아이템 추가 함수
let nextItem = 1;

const loadMore = function() {
  for (let i = 0; i < 20; i++) {
    let item = document.createElement('li');
    item.innerText = 'List Item #' + nextItem++;
    listElm.appendChild(item);
  }
}

// ul 리스트 바닥까지 스크롤 했는지 확인
listElm.addEventListener('scroll', function() {
  if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
    loadMore();
  }
});

// 아이템 20개씩 더 가져오는 loadMore함수 실행
loadMore();
```

### 기존 scroll 의 문제점

**scroll 이벤트**를 사용하거나, 요소 위치를 계산하는 **getBoundingClientRect()** 와 같은 메서드를 사용하면 성능 문제가 발생

**1. scroll 이벤트**
scroll 이벤트는 동기적으로 실행된다. 뿐아니라 element 마다 이벤트가 등록되어 있는 경우, 사용자가 스크롤을 할 때마다 이벤트가 끊임 없이 호출되기 때문에 몇배로 성능 문제가 발생

**2. getBoundingClientRect()**
특정 지점을 관찰하는 getBoundingClientRect() 계산을 할 때마다 reflow 현상이 일어난다는 단점이 있다.

=> 위의 2가지 모든 코드는 메인 스레드에서 실행되기 때문에 이 중 하나라도 호출되면 성능 문제를 일으킬 수 있다.

> **리플로우(reflow)** : 문서 내 요소의 위치와 도형을 다시 계산하기 위한 웹 브라우저 프로세스의 이름으로, 문서의 일부 또는 전체를 다시 렌더링 하는 데 사용된다. 간혹 문서에 있는 단일 요소를 리플로우하려면 상위 요소 및 이어지는 모든 요소도 리플로우 할 수 있다.

### Intersection Observer 개념

위의 문제를 해결할 방법이 바로 이 intersection observer 이다.

1. intersection observer 는 **브라우저 뷰포트(Viewport)**와 **원하는 요소(Element)의 교차점**을 관찰하며, 요소가 뷰포트에 포함되는 지 아닌 지 구별하는 기능을 제공한다.
   (=> 특정 요소가 사용자 화면에 보이는 지 안보이는 지를 판단함)

2. getBoundingClientRect() 대신에 **IntersectionObserverEntry 의 속성**을 활용하여 요소들의 위치를 알 수 있기 때문에, **리플로우 현상을 방지**할 수 있다.

3. 스크롤이 일어날 때마다 자바스크립트 코드를 돌려야하는 이전과 달리,
   이 intersection observer 를 사용하면 자바스크립트 엔진과는 상관없이 브라우저단에서만 무한스크롤 로직을 검사하고, 조건을 통과하는 경우에는 자바스크립트 코드로 데이터를 불러오면 된다.

4. **비동기적으로 실행**되기 때문에, 메인 스레드에 영향을 주지 않으면서 요소들의 변경 사항들을 관찰할 수 있다.

> **Intersection Observer 를 사용하는 경우**

- 페이지가 스크롤 되는 도중에 발생하는 이미지나 다른 컨텐츠의 지연 로딩 (lazy loading)
- 스크롤 시에, 더 많은 컨텐츠가 로드 및 렌더링 되어 사용자가 페이지를 이동하지 않아도 되게 infinite-scroll 구현
- 광고 수익을 계산하기 위한 용도로 광고의 가시성 보고
- 사용자에게 결과가 표시되는 여부에 따라 작업이나 애니메이션을 수행할 지 여부를 결정

### IntersectionObserver의 흐름

`관찰자(observer)` 와 `관찰 대상(entry)`, `옵션(조건)` 그리고 `콜백함수(로직)`가 존재한다.

1. `관찰자`를 생성한다.
2. `관찰 대상`을 생성한다.
3. `관찰자`는 `관찰 대상`을 관찰한다
4. `관찰 대상`이 조건을 만족하는 상태에 놓이게 된다면 `콜백 함수`를 실행한다.

### Intersection Observer 실제 구현

먼저, **관찰자를 생성**해준다.

```typescript
const observer = new IntersectionObserver(callback, options);
```

- callback : 조건이 만족하면 실행할 함수

  > ```typescript
  > let callback = (entries, observer) => {
  >   entries.forEach(entry => {
  > ```

      // Each entry describes an intersection change for one observed
      // target element:
      //   entry.boundingClientRect
      //   entry.intersectionRatio
      //   entry.intersectionRect
      //   entry.isIntersecting
      //   entry.rootBounds
      //   entry.target
      //   entry.time

  });
  };

  ```
  조건을 만족하게 되면, 콜백함수에게 entries 를 주게된다. 그리고 그 entries 가 곧 관찰 대상의 리스트이다.
  => 따라서 사용자는 이 관찰 대상의 리스트 에서 지금 조건을 만족한
  관찰 대상을 찾고 우리가 원하는 로직을 실행해주면 된다.

  ```

- options: 각 종 조건들을 넣어줄 수 있다.
  > - threshold : 관찰 대상이 화면에 어느정도 보이면 조건이 참인지를 결정하는 요소

### IntersectionObeserver 리턴 값

- observer : 해당 observer 가 `관찰자` 가 된다.

1. observe : 관찰 대상을 지정할 수 있다. 관찰 대상은 하나 이상일 수 있다.
2. unobserver : 관찰 대상에 대한 관찰을 중지
   <br />

다음, **관찰 대상을 생성**해준다.

```typescript
const target = document.querySelector("#target");
observer.observe(target);
```

이제 `target` 이 특정 조건을 만족하게 되는 경우 `callback` 메서드를 호출한다.

### 실제 무한 스크롤에 Intersection Observer 적용

> 💡 적용 전 알아야 할 세가지

1. Intersection Observer 의 조건 => 스크롤 맨 하단에 도달했을 때 다음 페이지의 새로운 데이터를 받아오기
2. 관찰대상 => 스크롤 맨 하단
3. 콜백 함수 => 다음 페이지의 데이터 호출(**tanstack 에서의 fetchNextPage**)

#### 1. 관찰 대상을 만들기

리스트의 맨 아래에 관찰 대상을 만든다

```typescript
const observeBox = useRef<HTMLDivElement>(null);

...
<DefaultLayout className="mb-6">
  {diaryList.length === 0 && !isPending && <EmptyDiarylistCard />}
  {diaryList.length > 0 && <DiarylistCard diaryList={diaryList} search={text} />}
  {(isPending || isFetching) && <DiaryListSkeletonCard />}
  {/* 여기 아래의 divrk 관찰 대상 */}
  <div ref={observeBox} />
</DefaultLayout>
```

#### 2. 관찰자를 만들기

관찰자를 IntersectionObserver 메서드를 통해 생성하고, entry 속성인 isIntersecting 을 이용해 조건을 검사하고, 콜백함수를 실행한다.

```typescript
const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => entry.isIntersecting && callback()),
  {
    threshold: 1,
  }
);
```

이렇게 하면 관찰자, 관찰대상, 조건, 콜백함수를 다 만들었다.
그럼 이제

#### 3. 관찰대상을 수시로 변경

관찰 대상은 새로운 데이터를 가져올 때마다 수시로 변경해줘야 한다. 이를 위해 useEffect 를 활용해준다.

> 1. 스크롤을 내린다.
> 2. 관찰 대상을 만나고, 조건을 만족시킨다.
> 3. 새로운 데이터를 가져온다.

- 이때 state 의 loading 이 true 이므로 관찰 대상이 사라진다.

4. 새로운 데이터를 리스트에 추가한다.

- loading 이 다시 false 가 되므로 관찰대상이 다시 렌더링이 된다.

5. 관찰 대상이 다시 렌더링 됐지만, 3번 4번의 과정에서 지워지고 새롭게 만들어진다.

- 따라서 지워진 관찰 대상은 관찰 대상 리스트에서 제거해줘야 하고
- 새롭게 관찰 대상을 지정해줘야 한다.

```typescript
useEffect(() => {
  if (!enabled) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => entry.isIntersecting && onIntersect()),
    {
      threshold,
    }
  );
  const element = target && target.current;
  if (!element) {
    return;
  }
  // 5-2
  observer.observe(element);
  // eslint-disable-next-line consistent-return

  // 5-1
  return () => {
    if (element) {
      observer.unobserve(element);
    }
  };
}, [enabled, threshold, target, onIntersect]);
```

이전의 타겟이 남아있게 되기 때문에 callback이 쓸데 없이 더 불러와지는 문제가 있다.(그러나 callback 이 실행되어도 isIntersecting 에서 걸러지기에 걱정이 될 요소는 X!!!) 그렇기에 cleanup을 실행해준다.
(clean up은 useEffect 에서 가장 먼저 실행 => 현재의 로직을 실행하기 전에 클로저로 이전의 데이터가 존재하면 클린업해주는 것)

### useInterSection 커스텀 훅 코드 작성

- target: IntersectionObserver Target을 전달하는 RefObject
- onIntersect - Target이 ViewPort에 보일 경우 실행 할 함수
- threshold - IntersectionObserver 인식 시점을 전달하는 값
- enabled - IntersectionObserver 사용 여부

```typescript
"use client";

import type { RefObject } from "react";
import { useEffect } from "react";

interface UseIntersectionObserverProps {
  root?: null | unknown;
  target: RefObject<HTMLDivElement>;
  onIntersect: () => void;
  threshold?: number;
  enabled?: boolean;
}

export const useIntersectionObserver = ({
  target,
  onIntersect,
  threshold = 1.0,
  enabled = true,
}: UseIntersectionObserverProps) => {
  useEffect(() => {
    // IntersectionObserver 사용 여부 체킹
    if (!enabled) {
      return;
    }

    // IntersectionObserver 생성
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      // 인식 시점에 지정한 event handler 적용
      // entry 의 속성인 isIntersecting 를 이용해 조건을 검사하고, 콜백함수 를 실행
      {
        threshold,
      }
    );
    const element = target && target.current; // IntersectionObserver Target 정의
    if (!element) {
      // IntersectionObserver Target이 없을 경우, 종료
      return;
    }
    observer.observe(element); // IntersectionObserver 실행
    // eslint-disable-next-line consistent-return
    return () => {
      observer.unobserve(element);
    };
  }, [enabled, threshold, target, onIntersect]); // IntersectionObserver Target 업데이트
};
```

### 커스텀 훅 무한 스크롤에 적용

리스트 맨 아래에 빈 태그를 만들고 ref 연결해주기

```typescript
const observeBox = useRef<HTMLDivElement>(null);

const {
  data,
  isSuccess,
  isPending,
  isFetching,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useGetDiaryListInfiniteQuery({
  id: friend.id,
  order,
  q: text,
  tag,
});
const diaryList = data?.pages
  ? data.pages.flatMap((page) => page.data.diaries)
  : [];

useIntersectionObserver({
  target: observeBox,
  onIntersect: fetchNextPage,
  enabled: hasNextPage && !isFetchingNextPage,
});

if (isSuccess && diaryList.length === 0 && text === "" && tag === "") {
  return <NoLengthDiaryListCard />;
}

return (
  <DefaultLayout className="mb-6">
    {diaryList.length === 0 && !isPending && <EmptyDiarylistCard />}
    {diaryList.length > 0 && (
      <DiarylistCard diaryList={diaryList} search={text} />
    )}
    {(isPending || isFetching) && <DiaryListSkeletonCard />}
    {/* 여기 div가 관찰 대상 */}
    <div ref={observeBox} />
  </DefaultLayout>
);
```

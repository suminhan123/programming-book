## Clean Code 란?

출처 : https://www.youtube.com/watch?v=edWbHp_k_9Y 를 보고 정리해서 글을 작성하였습니다.

클린 코드라 하면 '명확한 이름', '중복 줄이기'를 먼저 말한다.
실무에선 이 외에도 조금 더 섬세하게 코드를 정리하는 스킬이 필요하다.

### 1. 실무에서 클린 코드의 의의

"그 코드는 안건드리시는 게 좋을거에요. 일단 제가 만질게요.^^;;"
=> 흐름 파악이 어렵고, 도메인 맥락이 표현이 안되어 동료에게 물어봐야 할 수 있는 코드

=> 이런 코드는 개발할 때 병목되고, 유지 보수할 때 시간이 오려걸리며 심하면 기능 추가가 불가능한 상태

따라서, 클린 코드는 **유지 보수의 시간을 단축**시킬 수 있다. (코드 파악이 쉽고, 디버깅 및 리뷰하기 좋다)

실무에서 **기존 코드에 기능을 추가하는 상황**이 대다수이다! 어떻게 기존코드에 기능을 추가할 수 있을까?

### 2. 안일한 코드 추가의 함정

코드를 안일하게 추가하면 함정에 빠질 수 있다.
다음은 예제입니다.
![](https://velog.velcdn.com/images/hansoom3315/post/463fa2a4-ed84-4781-bfb8-189197db3db7/image.png)
보험에 대한 질문을 입력하는 페이지가 있는데 내 설계사가 있는 경우에 그 설계사 사진이 들어간 팝업을 먼저 띄워달라는 기능 추가이다.

- 기존 코드

```javascript
function QuestionPage() {
  async function handleQuestionSubmit() {
    // 약관 동의 필요하면 팝업 띄우기
    const 약관동의 = await 약관동의_받아오기();
    if (!약관동의) {
      await 약관동의_팝업열기();
    }
    // 질문을 전송하고 선공했다 alert 창을 띄움
    await 질문전송(questionValue);
    alert("질문이 등록되었어요.");
  }

  return (
    <form>
      <textarea placeholder="어떤내용이 궁금하신가요?" />
      //질문하기 버튼 클릭
      <Button onClick={handleQuestionSubmit} />
    </form>
  );
}
```

이 코드에 새 기능을 추가해보자

아래 코드와 같이, onClick 핸들러에 연결 중인 전문가가 있으면 팝업 띄우는 로직을 추가하고 해당 팝업 컴포넌트를 추가해주면 된다.

```javascript
function QuestionPage() {
  const [popupOpened, setPopupOpened] = useState(false); // 팝업 상태
  async function handleQuestionSubmit() {
    // 연결 중인 전문가가 있으면 팝업 띄우기
    const 연결 전문가 = await 연결전문가_받아오기();
    if (연결 전문가 !== null){
      setPopupOpened(true);
    } else {
    const 약관동의 = await 약관동의_받아오기();
    if (!약관동의) {
      await 약관동의_팝업열기();
    }
    await 질문전송(questionValue);
    alert("질문이 등록되었어요.");
    }
  }

  // 팝업 버튼 클릭 핸들러
  async function handleMyExpertQuestionSubmit () {
    await 연결전문가_질문전송(questionValue, 연결전문가.id);
    alert(`${연결전문가.name}에게 질문이 등록되었어요`);
  }

  return (
    <>
    <form>
      <textarea placeholder="어떤내용이 궁금하신가요?" />
      <Button onClick={handleQuestionSubmit} />
    </form>
    //팝업 컴포넌트
    {popupOpened && (
      <연결 전문가 팝업 onSubmit={handleMyExpertQuestionSubmit} />
    )}
    </>
  );
}
```

타당하고 자연스러운 코드 추가처럼 보이지만 나쁜 코드가 되었다.

1. 하나의 목적인 코드가 흩뿌려져있다.
   => 코드가 뚝뚝 떨어져 있어서 나중에 기능을 추가할 때 스크롤을 위아래로 이동하며 미로 찾기를 해야한다.
2. 하나의 함수가 연결전문가, 약관 동의, ... , 여러 가지일을 수행한다.
   => 세부 구현을 모두 읽어야 함수의 역할을 이해할 수 있고, 코드 추가 및 삭제 시간이 더 오래 걸리게 된다.
3. 함수의 세부 구현 단계가 제각각이다.
   handleMyExpertQuestionSubmit 함수와 handleQuestionSubmit 함수 모두 이벤트 핸들링 관련 함수이다.

이렇게 기능을 추가하게 되면서 깔끔했던 코드가 작은 기능 하나를 추가했더니 어지러운 코드가 되었다.

#### 2-1. 큰 그림을 보며 코드 리팩토링

1. 함수 세부 구현 단계 통일
   함수들을 이름을 바꿔 위계를 맞춘다.

```javascript
function QuestionPage() {
  const 연결전문가 = useFetch(연결전문가_받아오기);
  async function handleNewExpertQuestionSubmit() {
    await 질문전송(questionValue);
    alert("질문이 등록되었어요.");
  }

  async function handleMyExpertQuestionSubmit() {
    await 연결전문가_질문전송(questionValue, 연결전문가.id);
    alert(`${연결전문가.name}에게 질문이 등록되었어요`);
  }
}
```

2. 하나의 목적인 코드는 뭉쳐두기
   기존에는 팝업을 여는 버튼과 팝업 코드가 동떨어져 있었는데 팝업 관련 코드를 하나로 모아 PopupTriggerButton 컴포넌트를 생성했다. 그리고 띄워줄 팝업을 prop으로 내려준다.

```javascript
return (
  <>
    <form>
      <textarea placeholder="어떤내용이 궁금하신가요?" />
      <Button onClick={handleQuestionSubmit} />

      {연결전문가.connected ? (
        <PopupTriggerButton
        popup={(
          <연결전문가팝업 onButtonSubmit={handleMyExpertQuestionSubmit} />
        )}>
        질문하기</PopupTriggerButton>
      )}
    </form>
  </>
);
```

3. 함수가 한 가지 일만 하도록 쪼개기

결론,
**클린 코드 != 짧은 코드 == 원하는 로직을 빠르게 찾을 수 있는 코드**

### 3. 로직을 빠르게 찾을 수 있는 코드

원하는 로직을 빠르게 찾으려면?

1. 하나의 목적을 가진 코드가 흩뿌려져 있으면 => 응집도
2. 함수가 여러 가지 일을 하고 있으면 => 단일 책임
3. 함수가 세부 구현 단계가 제각각이면 => 추상화

#### 3-1. 응집도 : 같은 목적의 코드는 뭉쳐 두자

하나의 기능인 팝업을 여는 기능이 코드가 여기 저기 흩뿌려져 있다.
=> 해당 코드는 파악도 한 번에 안되고 버그 발생 위헙도가 높은 코드이다.

- 리팩토링 버전 1
  해당 버전은 커스텀 훅을 사용해서 한 군데로 싹다 뭉쳐버렸다.

```javascript
function QuestionPage() {
  const [openPopup] = useMyExpertPopup(연결전문가.id);

  function handleClick() {
    openPopup();
  }

  return <button onClick={handleClick}>질문하기</button>;
}
```

커스텀 훅이 반환하는 openPopup만 호출만 해도 바로 팝업을 열 수 있다.

=> 그러면 문제가 발생한다!!
오히려 코드 파악하기가 어려워진다. 어떤 내용의 팝업을 띄우는지, 버튼 눌렀을 때 어떤 액션을 하는 지가 훅에 가려져버린다.

뭉치는 것도 무작정 같은 기능하는 코드를 한꺼번에 뭉치면 안된다!(**클린코드!=짧은코드**)

- 무엇을 뭉치지?
  뭉치면 쾌적 : 당장 몰라도 되는 디테일
  뭉치면 답답 : 코드 파악에 필수적인 핵심 정보

그렇다면 어떻게 응집해야 읽기 좋을까?
먼저 남겨야 할 핵심 데이터와 숨겨도 될 세부구현을 나눈다.
이 코드에서 **핵심 데이터**는 팝업 버튼 클릭 시 수행하는 액션과 팝업의 제목과 내용입니다.
또한, 팝업을 열고 닫을 때 사용하는 상태와 컴포넌트의 세부 마크업 그리고 팝업의 버튼 클릭 시 특정함수를 호출해야 한다는 바인딩이 **세부구현**에 해당한다.
![](https://velog.velcdn.com/images/hansoom3315/post/72a24bc5-2add-493f-9152-fee00bf5fc61/image.png)

- 리팩토링 버전 2
  핵심 데이터는 밖에서 전달하고, 나머지는 뭉친다!
  openPopup 커스텀 훅안에 모든 코드를 다 숨기는 것이 아니라, 세부 구현만 숨기고 핵심데이터인 팝업 제목이랑, 내용, 액션은 바깥에서 넘겨준다.
  => 세부 구현을 읽지 않고도 어떤 팝업인지 파악할 수 있다.

```javascript
function QuestionPage() {
  const [openPopup] = usePopup();
  async function handleClick() {
    const confirmed = await openPopup({
      title: "보험질문하기",
      content: <div>전문가가 설명드려오</div>,
    });
    if (confirmed) {
      await submitQuestion();
    }
  }

  async function submitQuestion(연결전문가) {
    await 질문전송(연결전문가.id);
    alert("질문을 전송했습니다.");
  }

  return <button onClick={handleClick}>질문하기</button>;
}
```

#### 선언적 프로그래밍

핵심 데이터만 전달하고 세부구현은 뭉쳐 숨겨 두는 개발 스타일
![](https://velog.velcdn.com/images/hansoom3315/post/5f6d53c6-4047-4682-aeb7-20b6bd087492/image.png)

제목, 내용, 질문 제출 선언을 하면 팝압이 이미 해둔 세부 구현을 바탕으로 해당 내용을 뿌리는 스타일이다.
즉, '무엇'을 하는 함수인지 빠른 이해가 가능하고, 세부 구현은 안쪽에 뭉쳐두어서 신경 쓸 필요가 없다. => 무엇 만 바꿔서 쉽게 재사용이 가능하다.

#### 명령형 프로그래밍

선언형으로 뭉쳐두지 않고, 하나하나 세부 구현을 작성하는 방식
=> 읽는 데 오래 걸리고 재사용이 어렵다.

선언적 코드가 무조건 좋은 건가? => 아니다! 두 방법 모두 상황에 맞게 유동적으로 사용하면 된다

#### 3-2. 단일 책임

하나의 일을 하는 뚜렷한 이름의 함수를 만들자

##### 예제1 - button

- before
  버튼 클릭 함수에 로그를 찍는 함수, API 콜이 섞여 있다.

```javascript
<button
  onClick={async () => {
    log("클릭");
    await openConfirm();
  }}
/>
```

- after
  LogClick 컴포넌트를 만들어 버튼을 감싸 클릭하면 자동으로 클릭 로그가 전송되도록 책임을 분리한다.

```javascript
<LogClick message="클릭">
  <button
    onClick={async () => {
      await openConfirm();
    }}
  />
</LogClick>
```

##### 예제2 - intersection observer

- before
  옵저버 세부 구현과 API콜이 함께 섞여 있는 코드이다.

```javascript
const target = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersectiong) {
      fetchCats(nextPage);
    }
  });

  return () => {
    observer.unobserve(target.current);
  };
});

return <div ref={target}>더보기</div>;
```

- after
  Impression 옵저버 세부 구현은 감싼 컴포넌트에 숨겨두고, 사용하는 입장에서 Impression 시 API 콜만 신경 쓸 수 있다.

```javascript
<IntersectionArea onImpression={() => fetchCats(nextPage)}>
  더보기
</IntersectionArea>
```

#### 3-3. 추상화 : 핵심 개념 뽑아내기

##### 예제1 - 컴포넌트로 추상화

왼쪽은 팝업 컴포넌트 코드를 제로부터 디테일하게 구현
오른쪽은 팝업 코드를 제출 액션과 성공 액션이라는 중요한 개념만 남기고 나머지를 추상화
![](https://velog.velcdn.com/images/hansoom3315/post/2216a7db-04fd-4722-bbfc-a57520bd0e63/image.png)

##### 예제2 - 함수로 추상화

왼쪽은 전문가 정보를 받아와서 응답 값에 따라 다른 라벨을 보여주는 코드
오른쪽은 함수명 안에 모두 추상화 시킨 코드
![](https://velog.velcdn.com/images/hansoom3315/post/b8914d8a-7de1-428d-acd5-235c3c4403b6/image.png)

##### 얼마나 추상화

구체적인 코드를 조금 추상적이게 혹은 더욱 추상적이게 리팩토링 할 수 있다.

- level0
  버튼을 클릭하면 컨펌 창을 띄우고 컨펌 버튼을 클릭하면 특정 메시지를 띄우는 구체적인 코드이다.

```javascript
<Button onClick={showConfirm}>
  전송
</Button>
{isShowConfirm && (
  <Confirm onClick={() => showMessage("성공")}>
)}
```

- level1
  버튼을 눌렀을 때 컨펌창을 띄우는 기능을 컨펌 버튼이라는 컴포넌트로 추상화 => onConfirm 을 통해 원하는 액션을 넘겨줄 수 있다.

```javascript
<ConfirmButton onConfirm={() => showMessage("성공")}>전송</ConfirmButton>
```

- level2
  message 라는 prop만 넘겨서 컨펌창에 원하는 메시지를 보여줘 더 간단하게 추상화시킬 수 있다.

```javascript
<ConfirmButton message="성공">전송</ConfirmButton>
```

-level3
모든 기능을 컴포넌트 이름 아래에 추상화시킬 수도 있다.

```javascript
<ConfirmButton />
```

> 정답은 없다! 상황에 따라 필요한 만큼 추상화하면 된다.

추상화 수준이 섞여 있으면 코드 파악이 어렵다. 추상화 단계 높은 것끼리, 낮은 것끼리 모아서 추상화 단계를 비슷하게 정리해준다.
![](https://velog.velcdn.com/images/hansoom3315/post/714e6e69-db35-40a2-ac8b-172bc2fa8ce8/image.png)

### 4. 액션 아이템

1. 담대 하게 기존 코드 수정하기
   두려워 하지 말고 기존 코드를 씹고 뜯고 맛보고 즐기자
2. 큰 그림 보는 연습하기
   그 때는 맞고 지금은 틀리다.
   기능 추가 자체는 클린해도, 전체적으로 어지러울 수 있다.
3. 팀과 함께 공감대 형성하기
   코드에 정답은 없다! 명시적으로 이야기를 하는 시간이 필요하다.
4. 문서로 적어보기
   향후 어떤 점에서 위험할 수 있는 지 어떻게 개선할 수 있을 지를 글러 적어야 명확해 진다.

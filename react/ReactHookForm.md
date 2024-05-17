## React Hook Form

React Hook Form 은 **비제어 컴포넌트로 렌더링을 최적화할 수 있는 라이브러리** 이다.

단순히 form을 처리하기 위해 state 로 모든 값을 검사하여 리랜더링 하는 것 보다 입력이 끝난 후 유효성 검사를 보여주어도 되고 더 빠른 검사를 할 수 있어 비제어 컴포넌트 방식인 React Hook Form을 많이 사용한다.

### ref 특징

ref 는 값을 업데이트하여도 리랜더링 되지 않는 특성으로, 입력이 모두 되고 난 후 ref 를 통해 값을 한번에 가져와서 활용한다.

state 로 값을 관리하지 않기 때문에 **값이 바뀔 때마다 리렌더링을 하지 않고** 값을 한 번에 가져올 수 있는 성능상에 이점이 있으나, 데이터를 완벽하게 가져올 수 없는 단점이 있다.

> 🔍 useRef() => heap 영역에 저장되는 자바스크립트 객체
>
> - 렌더링 할 때마다 동일한 객체를 제공한다. heap 에 저장을 하므로
>   어플리케이션이 종류되거나 가비지 컬렉팅이 되기 전까지 참조시에는 같은 메모리 값을 가진다.
>
> - 값이 변경이 되어도 리렌더링 되지 않는다. 같은 메모리 값을 항상 반환하므로 변경사항을 감지할 수 없어서 리렌더링을 하지 않는다.

#### React Hook Form 의 장점

**1. 간결한 API**
React Hook Form 은 사용하기 쉽고 직관적인 API를 제공하여 복잡한 폼 로직을 단순화 한다.
기본적으로 제공하는 Hook 함수들과 컴포넌트들을 사용하여 폼을 쉽게 생성하고 관리할 수 있다.

**2. 높은 성능**
React Hook Form 은 성능에 중점을 두어 최적화되어 있습니다.
입력 필드의 값 변화를 **추적하는 상태 대신 각 입력 필드의 참조를 사용**하여 불필요한 리렌더링을 방지하고, 가상 DOM의 업데이트를 최소화한다.

**3. 유효성 검사**
React Hook Form 은 내장된 유효성 검사를 지원하며, Yup, Joi 외부 유효성 검사 라이브러리와 통합할 수 있다.
입력 필드의 값에 대한 유효성 검사를 수행하고, 에러 메시지를 표시할 수 있다.

**4. 커스텀 훅**
React Hook Form 은 커스텀 훅을 사용하여 개발자가 필요한 로직을 쉽게 작성하고 재사용할 수 있도록 지원한다.
커스텀 훅을 사용하면 폼 상태, 에러 처리, 폼 제출 등의 로직을 캡슐화할 수 있다.

=> 개발하고 있는 서비스에는 많은 항목에 대한 입력을 받고 있기에 렌더링을 고려해 react hook form 을 활용해보고자 한다.

### React Hook Form 시작하기

```
yarn add react-hook-form
```

### React Hook Form 함수 살펴보기

```typescript
const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<IAuthForm>({mode: 'onBlur'});

const onSubmit = (data) => {
  console.log(data)
}

return (
  <form onSubmit={handleSubmit(onSubmit)>
  ...
```

#### register

input 요소를 React Hook Form 과 연결시켜 검증 규칙을 적용할 수 있게 하는 메소드

```typescript
const { register } = useForm();
const { name, ref, onChange, onBlur } = register("username");

<input
	name={name}
	ref={ref}
	onChange={onChange}
	onBlur={onBlur}
/>

// 객체 안에 value 를 일일이 하기 너무 많다
<input {...register("username")} />

```

register 가 리턴하는 객체 항목을 input 항목에 연결시키면 된다.

#### formState

form state 에 관한 정보를 담고 있는 객체

#### handleSubmit

form 을 submit 했을 때 실행할 함수
Validation을 통과했을 때 실행할 콜백함수가 반드시 필요하다. 실패했을 때의 콜백함수(submitErrorHandler)는 optional

#### setError

error 관련 설정에 사용되는 함수

#### mode

사용자가 submit 버튼을 누르기 전에 form 에 입력한 값이 유효한 값이 안라는 것을 미리 표시해주고 싶을 때 사용하는 것이 mode!

`mode` 는 useForm() 에 넘겨줄 수 있는 다양한 optional arguments 중 하나로 사용자가 form 을 submit 하기 전에 validation이 실행될 수 있게 해준다.

```typescript
// mode에 사용 가능한 값
mode: onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'
```

### Devtool 설치하기

React Hook Form 은 Devtool 을 제공한다.
Form 관리를 일일이 콘솔 창에 출력하지 않고 현재 일어 나고 있는 상태를 쉽게 파악할 수 있다.

```
yarn add -D @hookform/devtools
```

### React Hook Form - FormProvider 생성하기

FormProvider 은 React Hook Form 에서 제공하는 컴포넌트로, React의 Context API를 기반으로 구현되었다.
FormProvider 은 상위 컴포넌트에서 하위 컴포넌트로 **폼 데이터와 관련된 상태와 로직을 전달**하기 위해 사용한다.

useFormContext 를 사용하면 컨텍스트를 prop으로 전달하는 것이 불편한 깊은 중첩 구조에서도 컨텍스트에 접근할 수 있다.

이 훅을 사용하면 useForm 에서 반환하는 모든 메서드와 속성을 가져올 수 있다. 즉, useForm 의 반환값을 그대로 사용할 수 있다.

![](https://velog.velcdn.com/images/hansoom3315/post/f2e1eb02-f07e-4e40-b1f3-ecc8b23bf076/image.png)

useFormContext 를 사용하기 위해서는 폼을 FormProvider 컴포넌트로 감싸줘야 한다.
FormProvider 컴포넌트에 useForm에서 반환한 메서드와 속성을 전달하면 된다.
그런 다음 useFormContext를 호출하면 해당 메서드와 속성을 가져올 수 있다.

### FormProvider 사용 방법

1. useForm() 훅을 사용하여 폼 메서드를 가져온다.

```typescript
import { useForm, FormProvider } from 'react-hook-form';
...
const methods = useForm();
...
```

2. FormProvider 의 props 로 1 에서 가져온 폼 메서드를 넘겨준다.

```typescript
<FormProvider {...methods}>
```

3. 폼 컨포넌트들을 FormProvider 내부에서 작성한다.
   폼 컴포넌트를 포함한 컴포넌트를 childComponent 로 사용하게 되면, 원래는 props를 넘겨줘야 하지만 FormProvider 로 감싼다면 따로 Props 를 넘기지 않아도 된다.

```typescript
<FormProvider {...methods}>
  //폼 컴포넌트가 들어있는 childComponent로
  <ChildComponent />
</FormProvider>
```

4. childComponent 내부에서 useFormContext 를 통해 useForm 의 반환값을 그대로 사용할 수 있다.
   여기서 props drilling 없이 사용이 가능하다.

```typescript
const ChildComponent = () => {
  const { register, handleSubmit } = useFormContext();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("test")} />
      <input type="submit" />
    </form>
  );
};
```

#### 전체 코드

```typescript
import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const ParentForm = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <ChildForm />
    </FormProvider>
  );
};

const ChildForm = () => {
  const { register, handleSubmit } = useFormContext();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <input type="text" name="firstName" {...methods.register("firstName")} />
      <input type="text" name="lastName" {...methods.register("lastName")} />
      <button type="submit">Submit</button>
    </form>
  );
};

const App = () => {
  return (
    <div>
      <h1>My Form</h1>
      <ParentForm />
    </div>
  );
};

export default App;
```

### FormProvider 의 렌더링

useFormContext 를 사용한다고 가정했을 때, FormProvider 의 자식 컴포넌트의 내부의 컴포넌트들의 예를 들어 input 이 수정하면 부모 컴포넌트들도 재렌더링이 될까? 아니다!

그 이유는 FormProvider 과 useFormContext 를 사용하는 핵심 개념인 로컬 폼 상태를 활용하여 최적화하였기 때문이다.

로컬 폼 상태는 해당 컴포넌트가 직접적으로 의존하는 폼 필드에 대해서만 관리하고 업데이트하므로, 다른 컴포넌트의 리렌더링에 영향을 받지 않는다.
=> 자식의 자식 컴포넌트들의 성능 이슈는 해당 필드의 변경에 따라 발생하며, 다른 부모나 형제 컴포넌트 들의 리렌더링 과는 독립적이다.

#### 주의해야 할 점

만약 부모 컴포넌트가 FormProvider 로 감싸져 있고, 그 하위에 여러개의 자식 컴포넌트가 있고, 그 자식 컴포넌트 중에서 useFormContext 를 사용하는 컴포넌트가 있다면, 해당 useFormContext 를 사용하는 컴포넌트의 로컬 폼 상태 변경이 발생하면 그 컴포넌트와 그의 하위 컴포넌트 들이 리렌더링 될 수 있다.
=> React 의 컴포넌트 트리에서 상위로의 리렌더링 전파로 인해 발생한다.

따라서, 깊은 계층 구조를 가지는 컴포넌트에서는 useFormContext 를 사용하는 컴포넌트의 성능에 영향을 주는 요소들을 최적화하는 것이 중요하다.

### React Hook Form 직접 적용하기

### FormProvider 적용

뽁에서는 많은 페이지에서 form data 를 다루기 때문에 FormProvider 을 활용해 context 로 데이터를 다른 컴포넌트에서도 prop전달없이 접근할 수 있도록 할 것이다.

```typescript
import { FormProvider, useForm } from "react-hook-form";

const WritingDiaryFormProvier = ({ children }: PropsWithChildren) => {
  const methods = useForm<IDiaryContextBody>();
  const onSubmit = (data: IDiaryContextBody) => {
    console.log(data);
  };
  const isMounted = useIsMounted();
  return (
    <FormProvider {...methods}>
      {isMounted && <DevTool control={methods.control} />}
      <form
        className="flex size-full flex-col"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};
export default WritingDiaryFormProvier;
```

사용자로 부터 입력을 받는 받는 페이지의 layout 으로 다음과 같이 컴포넌트로 감싸준다.

```typescript
"use client";

import { WritingDiaryFormProvider } from "@features/diary/contexts";
import usePreventLeave from "@hooks/usePreventLeave";
import { type PropsWithChildren } from "react";

const WritingLayout = ({ children }: PropsWithChildren) => {
  usePreventLeave();
  return <WritingDiaryFormProvider>{children}</WritingDiaryFormProvider>;
};
export default WritingLayout;
```

### usePreventLeave() 훅

여기서 페이지를 이탈하거나 혹은 새로고침을 할 경우 폼 데이터가 초기화하기에 사용자에게 이탈 전 아래와 같이 alert 창을 띄워주는 hook인 usePreventLeaver 를 추가해주었다.

훅은 weindow.onbeforeunload 에 beforeUnloadHandler 를 할당하여 페이지를 떠날 때마다 사용자에게 경고를 표시해준다.

```typescript
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const usePreventLeave = () => {
  const router = useRouter();

  useEffect(() => {
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.onbeforeunload = beforeUnloadHandler;
    return () => {
      window.onbeforeunload = null;
    };
  }, [router]);
};

export default usePreventLeave;
```

### 다른 페이지에서 상태 업데이트

#### form element 가 아닌 경우

```typescript
const WritingEmojiForm = () => {
  const [selectEmoji, setSelectEmoji] = useState<TEmoji | null>(null);
  const { register, getValues, setValue, control } = useFormContext<IDiaryContextBody>();
  const { field } = useController({
    name: 'isChecked',
    control,
    defaultValue: true,
  });

  useEffect(() => {
    setSelectEmoji(getValues('emoji'));
  }, [getValues]);

  const handleSelectEmoji = (emoji: TEmoji) => {
    setSelectEmoji(emoji);
    setValue('emoji', emoji);
  };
  return (
    <>
      <h2 className="mb-3 text-base font-medium text-gray-65">감정</h2>
      <div className="flex justify-center gap-3" {...register('emoji')}>
        {DIARY_EMOJI_ARRAY.map((emoji) => (
          <Image
            className="cursor-pointer"
            loader={ImageLoader}
            width={40}
            height={40}
            key={emoji}
            src={emoji === selectEmoji ? DIARY_EMOJI[emoji].smallSelect : DIARY_EMOJI[emoji].smallNotSelect}
            onClick={() => handleSelectEmoji(emoji)}
            alt=""
          />
        ))}
      </div>
```

#### form element 인 경우

```typescript
const WritingDateForm = ({ defaultValue }: IWritingDateFormProp) => {
  const today = moment().format("YYYY-MM-DD");
  const { register, control } = useFormContext<IDiaryContextBody>();
  const { field } = useController({
    name: "date",
    control,
    defaultValue: defaultValue || today,
  });

  return (
    <>
      <h2 className="mb-3 mt-8 text-base font-medium text-gray-65">날짜</h2>
      <DatePicker
        {...register("date")}
        date={field.value}
        setDate={field.onChange}
      />
    </>
  );
};
```

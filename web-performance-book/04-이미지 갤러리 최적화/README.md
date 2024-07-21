# 4장 이미지 갤러리 최적화

## 실습 내용 소개

분석할 서비스는 이미지 갤러리 서비스이다

![image](https://github.com/user-attachments/assets/746ea324-a486-4da1-9067-d0fbf2ac3a84)

다양한 주제의 이미지를 격차 형태로 보여줄 뿐 아니라 필터링 기능도 포함

![image](https://github.com/user-attachments/assets/2019edfc-c4a3-4369-a523-ef52a32f9b16)

이 중 이미지를 클릭하면 이미지가 큰 화면으로 나타나며 배경 색은 이미지 색상과 비슷한 색으로 맞춰진다

## 학습할 최적화 기법

- 이미지 지연 로딩
- 레이아웃 이동 피하기
- 리덕스 렌더링 최적화
- 병목 코드 최적화

### 이미지 지연 로딩

앞서 Intersection Observer API를 이용해 이미지가 화면에 표시되는 시점에 이미지를 로드하는 것을 구현했다면 npm 에 등록되어 있는 이미지 지연 로딩 라이브러리를 이용하여 적용

### 레이아웃 이동 피하기

레이아웃 이동(Layout Shift)란 **화면상의 요소 변화로 레이아웃이 갑자기 밀리는 현상**

이미지의 로딩 과정에서 레이아웃 이동이 발생 => 좋지 않은 사용자 경험 제공

### 리덕스 렌더링 최적화

리덕스에는 useSelector 라는 훅이 있어 손쉽게 리덕스에 저장된 데이터를 가져올 수 있다

이 과정에서 다양한 성능 문제가 발생

### 병목 코드 최적화

로직을 개선하여 병목 코드를 최적화하며 메모이제이션 방법을 적용

## 분석 툴 소개

**React Developer Tools(Profiler)**

![image](https://github.com/user-attachments/assets/208e9e9b-c8da-404e-a720-b0350829845e)

React Developer Tools 는 Profiler 패널과 Components 패널로 나뉜다

이 중에서 **Profiler 패널**을 사용할 것이다

이 툴은 리액트 프로젝트를 분석하여 **얼마만큼의 렌더링이 발생했고 어떤 컴포넌트가 렌더링되고 있지 어느 정도의 시간이 소요**됐는지 차트로 보여준다

## 서비스 탐색 및 코드 분석

리덕스를 사용하여 redux 폴더가 존재

```
src
├── redux
    ├── category.js // 카테고리의 선택 정보를 저장한 스토어
    ├── imageModal.js // 이미지 모달의 정보를 저장한 스토어
    ├── index.js
    └── photos.js // 이미지 리스트의 정보를 저장한 스토어
```

**모달이 뜨는 절차**

사용자는 이미지를 클릭함

=> 이미지가 클릭되면 리덕스에 showModal 액션을 보내 reducer 가 modalVisible 을 true 로 만들고 이미지 주소를 변경

```javascript
const dispath = useDispatch();

const openModal = () => {
  dispatch(showModal({ src: urls.full, alt }));
};
```

- src/redux/imageModal.js

```javascript
const { reducer: imageModalReducer } = createSlice({
  name: "imageModal",
  initialState: {
    modalVisible: false,
    bgColor: { r: 0, g: 0, b: 0 },
    src: "",
    alt: "",
  },
  reducers: {},
  extraReducers: {
    SHOW_MODAL: (state, action) => {
      state.modalVisible = true;
      state.src = action.src;
      state.alt = action.alt;
      state.bgColor = { r: 0, g: 0, b: 0 };
    },
    HIDE_MODAL: (state) => {
      state.modalVisible = false;
    },
    SET_BG_COLOR: (state, action) => {
      state.bgColor = action.bgColor;
    },
  },
});
```

=> imageModal 스토어의 상태 값을 바꾸면 이 상태를 구독하고 있는 ImageModalContainer 는 해당 상태를 반영해 ImageModal 컴포넌트를 화면에 띄움

이미지가 완전히 로드되면(onLoad) getAverageColorOfImage를 통해 이미지의 평균 색상을 구하고 해당 값을 리덕스에 저장함
다시 리덕스 스토어의 상태가 변하고, 최종적으로 변경된 bgColor를 ImageModal에 전달 (렌더링)

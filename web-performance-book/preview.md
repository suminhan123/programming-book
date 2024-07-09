## 웹 성능 최적화

### 웹 성능 최적화가 왜 필요하지?

1. 사용자가 떠나지 않도록 하기 위해 => 수익 증대를 위해
2. 프론트 엔드 개발자로서, 경쟁력을 갖추기 위해

### 웹 성능 최적화의 주요 포인트

웹 성능 결정 요소에는 2가지가 존재한다.

#### 1. 로딩 성능

![image](https://github.com/suminhan123/programming-book/assets/98216274/86afcef5-1185-4838-a21d-ea0a689ccb2c)

리소스들을 불러오는 것을 말함 => 어떻게 빠르게 리소스들을 로드할 것인지

#### 2. 렌더링 성능

![image](https://github.com/suminhan123/programming-book/assets/98216274/128f796f-c151-4c4e-b307-0deadb33da55)

리소스들을 화면에 보여주는 것을 말함 => 어떻게 빠르게 렌더링할 것인지

> 이를 위해서는 브라우저가 서버와 어떻게 통신을 하는지, 브라우저가 화면을 그릴 때 어떻게 그리는 지를 알 필요가 있음

### 성능 분석 툴

#### 1. 크롬 network 탭

![image](https://github.com/suminhan123/programming-book/assets/98216274/b16901f1-e657-40e7-8514-1b1fa0a66932)
네트워크 리소스에 대한 상세 정보를 알려줌

#### 2. 크롬 performance 탭

![image](https://github.com/suminhan123/programming-book/assets/98216274/fc87449d-cb17-4508-a725-a480ef903f1e)
웹 페이지가 동작할 때 실행되는 모든 작업들을 이렇게 그래프로 보여주는 탭

#### 3. 크롬 Lighthouse

![image](https://github.com/suminhan123/programming-book/assets/98216274/a7b22252-3c58-46c2-8627-940b1bf50504)
웹 서비스가 성능적으로 어느 정도인지를 파악이 가능
이 탭이 여러가지 기준으로 서비스의 점수를 매겨주고 가이드 라인 또한 제공

#### 4. webpack-bundle-analyzer

![image](https://github.com/suminhan123/programming-book/assets/98216274/ec7dda86-268c-4119-ad5f-6b93c31ab7fd)
webpack 라이브러리로 webpack 을 통해 번들링 된 파일들이 어떤 코드를 담고 있는 지를 한 눈에 보여주는 툴

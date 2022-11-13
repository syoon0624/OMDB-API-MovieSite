# 🎥 영화 검색 사이트 프로젝트

## 🔗 API 및 배포 사이트

- API 사이트: [The Open Movie Database](http://www.omdbapi.com/)
- 배포 주소: `https://jolly-malasada-e12b2c.netlify.app`

## 🔧 사용 기술/스택
<br />
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/scss-CC6699?style=for-the-badge&logo=sass&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/webpack-skyblue?style=for-the-badge&logo=webpack&logoColor=white">
<img src="https://img.shields.io/badge/babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=black"> <img src="https://img.shields.io/badge/postcss-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white">
<img src="https://img.shields.io/badge/dotenv-gray?style=for-the-badge&logo=dotenv&logoColor=white">

<br/>

## 💡 주요 구현 사항

### 1. Vanilla JS로 최대한 SPA(Single Page Application)과 유사한 형태로 구현하였다.
> React 프로젝트를 하기 전, 모던 JS에 대한 이해를 높이고 숙련도를 최대한 높이기 위한 마음에 바닐라 JS로 구현하는 것을 선택하였다. 이를 통해 길게 늘어져서 쓸수 있는 코드를 최대한 보기 쉽고 간결한 로직으로, 문법으로 작성 할 수 있는 방법에 대해 깊이 고민해 볼 수 있었던 것 같다. 
- `history.pushState` API를 활용하여 페이지를 다시 로드하지 않고 URL을 탐색할 수 있도록 하였으며, `window.location` API를 통해 url 파라미터의 정보를 JS로 가져오도록 하여 쿼리스트링의 형태로 데이터의 정보를 전달할 수 있도록 하였다.
- 이를 통해 url 파라미터 주소상에서 쿼리스트링의 형태를 준수하면서 파라미터를 수정하여 렌더링하여도 원활하게 검색 및 데이터처리가 가능하다. 예를들어 'https://주소/?s=검색어'의 검색어만 조정하여 접속하여도 검색결과가 그려진 화면을 볼 수 있게 된다.
- 또한 쿼리스트링을 활용하여 정보를 주고받기 때문에 API의 데이터를 통신하는 모듈부분에 필요한 매개변수의 수가 줄어드는 것을 확인할 수 있었다.(편리했다)
### 2. .env(Dotenv)를 통해 API Key를 외부에서 접근할 수 없도록 처리하였다.
### 3. Babel을 통해 JS 트랜스파일링을 적용하였으며, WebPack을 통해 파일 번들링을 사용하였다.
> 브라우저 호환성을 높여주기 위해 Babel을 사용, 파일 번들링 뿐만 아니라 환경 세팅면에서도 다양한 도움을 줄 수 있다고 생각하여 WebPack을 사용하게 되었다.
- 웹팩을 통해 이미지를 로드하고, 기본 path를 지정하며, 기본 경로 및 생략할 확장자명 또한 설정하였다.
- 웹팩을 활용하여 혹여나 발생할 네트워크의 부하를 다소 완화시켜주었다.
- 바벨을 통해 최신버전의 문법을 구버전으로 변환(트랜스파일링)하여 조금 더 브라우저 호환성이 높을 수 있도록 하였다.
### 4. SCSS, PostCSS를 사용하여 스타일 작업을 하였다.
> SCSS의 경우, 기존 CSS를 작성하였을 때의 코드 재사용성, 복잡한 요소 추격 및 가시성등의 문제를 다소 해결할 수 있어 채용하게 되었다.
- SCSS를 활용하여 비슷한 스타일링에 대한 재사용,
- mixin, include를 통해 간편한 모듈화를 경험하였다.(반응형 작업 시에 이를 활용하였다.)
- 태그의 자식요소(혹은 부모요소)를 지정할 때, 블록 in 블록의 형태를 띄기 때문에 코드 간결성 면에서도, 가시성 면에서도 매우 편리한 모습을 보여주었다.
### 5. 최대한 API에서 나올 수 있는 기능을 활용하여 다양한 기능을 구현하도록 하였다.
- 영화 검색 기능을 메인으로 어떤 영화를 검색할지, 한 번에 몇개를 볼 수 있을지, 상세 정보는 어떻게 띄워야 할지, 상세 정보 안에는 어떤 컨텐츠를 포함시켜야 할지 등 버튼이나 아이템, 컨텐츠들의 배치나 기능들을 어떻게 사용하고 보여줘야 사용자가 보다 편하게 이용할 수 있을지에 대해 깊이 고민하고 많은 시간을 들여 구현했었던 것 같다.
- 이를 통해 나온 기능들은 다음과 같다.
- 검색 시, 엔터 or 화면상에 있는 버튼을 클릭하여 검색
- 처음 초기 메인 화면과 검색 화면을 나누어 페이지 처리
- 새로고침을 하더라도 원래 검색하려던 정보는 그대로 남을 수 있도록 한다.(쿼리스트링 활용)
- 최대한 태그나 아이템들을 재배치하거나 렌더링 하는 요소는 없애도록 한다.(로딩 시간을 낮춘다.) -> 영화에 대한 상세 정보는 modal 창을 활용했다.
- 옵션은 꼭 필요할 것 같은 옵션만 넣어두며, 해당 옵션을 건드리지 않아도 검색은 원활하게 할 수 있도록 한다.
- 페이징 처리는 무한스크롤을 사용하였다.
- 입력하는 값은 항상 버튼 하나로 초기화 할 수 있도록 한다.(input/form clear 버튼)
- 현재 나와있는 영화 정보들 내에서 최신순, 오래된 년도 순으로 정렬 할 수 있도록 한다.(전체 기준으로 정렬하면 좋을 것 같지만, 주어진 API의 한계로 인해 구현할 수 없었다.)

## 📕 애로사항, 개선점

1. OS간(window, mac) 보이는 화면이 조금씩 달라 스타일링이나 레이아웃을 맞추기 어려웠다. 그 결과 window 화면은 조금씩 픽셀단위로 그림이 짤리거나 부족한 화면을 찾아 볼 수 있다.
2. 전체적으로 참조해서 사용하는 react/redux의 store에 올라갈 변수들을 한 모듈에 전역변수로 몰아서 넣어놓았다. 그렇기 때문에 모듈화에 대한 애로사항이 조금 있었다.(전역변수로 인해 모듈화할수 있는 함수/코드를 한 곳에 넣을 수 밖에 없었다. 이를 통해 store의 편리함을 다시 한 번 깨달았다.)
3. 페이지를 초기에 렌더링할 경우, css를 적용하지 않은 html태그의 모습이 화면에 잠깐 나온다. 해당 부분에 대한 이유는 찾을 수 없었다.(scss의 영향? webpack?)
4. 특정 기능(태그가 보이고 안보이고, 태그를 클릭 시 반응하는 액션)을 구현하기 위해 사용되는 중복되는 `queryselector`, `addeventlistener`가 너무 많았다. 대표적인 예로 한 html파일 안에 검색페이지용 검색 form, 메인페이지용 검색 form 이 두개를 모두 작성하고 사용하려고 하기 때문에 이를 조작하는것 또한 평소 조작의 2배정도 리소스가 들었던 것 같다. 즉,
form 상의 input value를 받아 api를 호출하려 하면, 우선 해당 input이 메인화면상의 input인지, 검색 페이지 상의 input인지를 먼저 판별부터 해야 한다. 이를 확인하기 위한 코드가 생각보다 길게 작성되었다. 차라리 한 form 태그를 사용하여 화면상의 위치만 변경하도록 했다면 더 낫지 않았을까 하는 생각이 든다.

## ⚙️ 앞으로의 TODO

1. 페이지 유지보수
2. 코드 리펙토링

## 📄 Usage


### 설치
- git clone 후, `root path` 에 터미널에 해당 명령어 입력
```
npm install
```
### 실행
```
npm run dev
```
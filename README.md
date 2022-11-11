# 🎥 영화 검색 사이트 프로젝트

## API 사용법

- 참고 사이트: [The Open Movie Database](http://www.omdbapi.com/)
- 요청 주소: `https://www.omdbapi.com`
- Method: `GET`

### 영화 목록 검색

파라미터 | 필수 | 설명 | 기본값 | 유효 값
--|--|--|--|--
`s` | 예 | 검색할 영화 제목 | |
`y` | | 영화 출시 년도 | |
`page` | | 검색 결과 페이지 | `1` | `1`~`100`

요청 예시:

```url
https://www.omdbapi.com?apikey=APIKEY&s=frozen&page=3
```

응답 예시:

- `Search`: 영화 목록, 1페이지(`page`) 당 최대 10개
- `totalResults`: 검색 가능한 모든 영화 개수

```json
{
  "Search": [
    {
      "Title": "Frozen",
      "Year": "2013",
      "imdbID": "tt2294629",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjA0YjYy...eQXVyNDg4NjY5OTQ@._V1_SX300.jpg"
    },
    "...최대10개"
  ],
  "totalResults": "263",
  "Response": "True"
}
```

### 새로이 알게된 지식들
- [https://kdydesign.github.io/2020/10/06/spa-route-tutorial/](Vanilla JS에서 SPA 라우팅 시스템 구현하기)
=> js에서 SPA 라우팅 시스템을 구현하는 방법은 크게 두가지 방법이 있다.
1. history (Browser History) - `history.pushState` API를 활용하여 페이지를 다시 로드하지 않고 URL을 탐색할 수 있다.
해당 URL 형태는 site/some-path와 같이 표현되나, site/another-path와 같이 지정하지 않은 경로를 접속하려 할 경우, 오류를 출력하기 때문에 이를 대체할 URL에 대해 서버측에서 관리해줘야한다는 점이 있다.
2. hash (Hash History) - url 해쉬를 사용하여 전체 url을 시뮬레이트하며, url이 변경될 때 페이지가 다시 로드되지 않는다. 보통 URL에 #이 붙는다. 해당 방식은 웹페이지 내부에서 이동하는 방식이기 때문에 history관리가 되지 않으며, 동적이지 않는다. 때문에 정적인 페이지에서 효과적이다.

- Webpack-dotenv 적용


### 구현해야 할 리스트
1. 초기 메인 화면
2. 검색 화면(초기 메인화면은 animation을 통해 검색 화면으로 전환)
3. 아이템 로딩 
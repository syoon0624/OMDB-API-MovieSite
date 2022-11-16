import dataInHTML from './makeSearchList.js';
import fetchMovie from './fetchMovie.js';
import openModal from './modalDetail.js';
import loaders from './loader.js';
import inputToggle from './searchBarToggle.js';

// 전역 변수(store)
let page = 1;
let toggle = false;
let input = '';
let years = '';
let type = '';
let pageCount = 1;

// 로딩 아이콘 생성자
const loader = new loaders({
  el: '.movie-loading',
});

// 정렬용 데이터
let allData = [];

// 데이터 불러오기 후 태그에 넣기
export const setDataList = async () => {
  if (input !== '') {
    loader.start();

    let err = '';
    const data = [];

    for (let i = 1; i <= pageCount; i++) {
      const movie = await fetchMovie(page);
      const total = movie.totalResults ?? 0;

      if (page === 1) {
        const infoEl = document.querySelector('.search-info');
        infoEl.innerHTML = ` 
                    <div class="search-total">
                        ${
                          years !== ''
                            ? '<strong>' + '"' + years + '" year </strong>'
                            : ''
                        }
                        <strong> "${input}" ${type} Search Results : ${total}</strong>
                    </div>
                `;
      }
      if (movie.Search === undefined) {
        err = 'No Found Page';
      } else {
        data.push(movie.Search);
        // 정렬을 위한 기존 검색 데이터 쌓기
        allData.push(...movie.Search);
        Math.floor(total / 10) + 1 === page ? (page = -1) : page++;
      }
    }
    data.forEach((ele) => dataInHTML(ele));
    if (err !== '' && page !== -1) {
      alert(err);
    }
    loader.stop();
  }
};

// 무한 스크롤 핸들러
const scroll = () => {
  const endEl = document.querySelector('.end_scroll');
  // 스크롤 내릴 시, 정보 더 보여주기 기능
  const io = new IntersectionObserver(
    async (entry, observer) => {
      /* entries
        boundingClientRect: 관찰 대상의 사각형 정보(DOMRectReadOnly)
        intersectionRect: 관찰 대상의 교차한 영역 정보(DOMRectReadOnly)
        intersectionRatio: 관찰 대상의 교차한 영역 백분율(intersectionRect ~ boundingClientRect 까지의 비율, Number)
        isIntersecting: 관찰 대상의 교차 상태(Boolean)
        rootBounds: 지정한 루트 요소의 사각형 정보(DOMRectReadOnly)
        target: 관찰 대상 요소(Element)
        time: 변경이 발생한 시간 정보(DOMHighResTimeStamp)
        */
      if (entry[0].isIntersecting) {
        if (page <= 1) {
          observer.disconnect();
        } else {
          await setDataList(input, years);
          await inDataIdList();
        }
      }
    },
    {
      threshold: 0.5,
    }
  );
  io.observe(endEl);
};

// 영화 modal 창 띄우기
const showData = async (ele) => {
  const loader = new loaders({
    el: '.movie-loading',
  });
  loader.start();
  const detail = await fetchMovie(undefined, ele.id);
  console.log(detail.Runtime);
  if (!document.querySelector('.modal')) {
    openModal(detail);
  }
  loader.stop();
};

// 검색되어 출력된 movie list에서 id만 추출, 해당 영화의 상세정보를 불러오는 함수 호출
const inDataIdList = () => {
  const dataId = document.querySelectorAll('.movie-box');
  // console.log(dataId);
  dataId.forEach((element) => {
    element.addEventListener('click', () => {
      showData(element);
    });
  });
};

// 정렬하기
export const sortData = async (types) => {
  let count = 0;
  let movies = [];
  let dummy = [];

  window.scrollTo(0, 0);
  console.log(allData);

  loader.start();

  while (document.querySelector('.movie_list > ul') !== null) {
    const child = document.querySelector('.movie_list > ul');
    child.parentNode.removeChild(child);
  }

  types === 'down'
    ? (allData = allData.sort((a, b) => parseInt(b.Year) - parseInt(a.Year)))
    : (allData = allData.sort((a, b) => parseInt(a.Year) - parseInt(b.Year)));

  allData.forEach((ele) => {
    dummy.push(ele);
    count++;
    if (count === 10) {
      count = 0;
      movies.push(dummy);
      dummy = [];
    }
  });
  await movies.forEach((ele) => dataInHTML(ele));
  await inDataIdList();
  await loader.stop();
};

// 영화 정보 데이터 전달
export default async (event) => {
  let values = {
    input: input,
    years: years,
    type: type,
    pageCount: pageCount,
    toggle: toggle,
  };

  event === undefined ? null : event.preventDefault();

  // 화면 전환
  /* 
    해당 form값은 첫 홈페이지/ 검색 페이지의 총 두개의 form을 동시에 생성하였기 때문에 
    화면 전환 시, 맞춰야 할 focus를 조정하기 위함
    */
  values = inputToggle(values);

  // 중복 클릭 처리(예외처리)
  if (
    toggle === true &&
    input === values.input &&
    years === values.years &&
    type === values.type
  )
    return;

  // 검색 form에서 나온 값 갱신
  input = values.input;
  years = values.years;
  type = values.type;
  pageCount = values.pageCount;
  toggle = values.toggle;

  try {
    // 검색창에 value값이 없을 경우, 없지만 url 파라미터 상에는 있는 경우로 나누어 처리
    if (input !== '') {
      while (document.querySelector('.movie_list > ul') !== null) {
        page = 1;
        allData = [];
        const child = document.querySelector('.movie_list > ul');
        child.parentNode.removeChild(child);
      }

      const text = input ? 's=' + input : undefined;

      window.history.pushState(
        undefined,
        'search',
        `/?${text}&type=${type}${years !== '' ? '&y=' + years : ''}`
      );
      await setDataList();
      await inDataIdList();
      await scroll();
    } else if (window.location.search !== '') {
      while (document.querySelector('.movie_list > ul') !== null) {
        page = 1;
        allData = [];
        const child = document.querySelector('.movie_list > ul');
        child.parentNode.removeChild(child);
      }
      const url = new URL(window.location.href);
      input = url.searchParams.get('s');
      years =
        url.searchParams.get('y') !== null ? url.searchParams.get('y') : '';
      type = url.searchParams.get('type');
      document.querySelector('header > div > form > input').value = input;
      await setDataList();
      await inDataIdList();
      await scroll();
    } else {
      alert('Please enter the KeyWord!');
    }
  } catch (err) {
    console.log(err);
  }
};

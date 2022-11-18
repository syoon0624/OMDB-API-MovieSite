import './scss/main.scss';
import { fetchData, formHandler } from './utils';
import logoimg from './images/logo.png';
import { sortData } from './utils/fetchData';

const imgEl = document.querySelector('.main-logo > img');
imgEl.src = logoimg;
const headerImgEl = document.querySelector('.logo-wrapper');
headerImgEl.style.backgroundImage = `url(${logoimg})`;

(async () => {
  try {
    // 영화 리스트 정렬
    const sortDownEl = document.querySelector('.sort-down');
    const sortUpEl = document.querySelector('.sort-up');

    sortDownEl.addEventListener('click', () => sortData('down'));
    sortUpEl.addEventListener('click', () => sortData('up'));

    // 검색 렌더링
    const form = document.querySelectorAll('.search_form');

    formHandler();
    await form.forEach((ele) => {
      ele.addEventListener('submit', fetchData);
      return;
    });

    // 뒤로가기, 앞으로가기를 했을 때 페이지 새로고침
    window.addEventListener('popstate', () => {
      console.log('location changed!');
      location.reload();
    });

    if (window.location.search !== '') {
      fetchData();
    }
  } catch (err) {
    console.log(err);
  }
})();

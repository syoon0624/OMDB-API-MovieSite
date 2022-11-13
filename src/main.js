import './scss/main.scss';
import { fetchData } from './utils';
import logoimg from './images/logo.png';
import formHandler from './utils/formHandler';
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
        await form.forEach(ele => {
            ele.addEventListener('submit', fetchData);
            return;
        });

        if(window.location.search !== ''){
            fetchData();
        }
        
    } catch (err) {
        console.log(err);
    }
})();

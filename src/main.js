import './scss/main.scss';
import { fetchData } from './utils';
import logoimg from './images/logo.png';

const imgEl = document.querySelector('.main-logo > img');
imgEl.src = logoimg;
const headerImgEl = document.querySelector('.logo-wrapper');
headerImgEl.style.backgroundImage = `url(${logoimg})`;

(async () => {
    try {
        // 태그가 2개(메인화면, 검색화면)이므로 queryselectorAll
        const form = document.querySelectorAll('.search_form');
        const inputEl = document.querySelectorAll('input');
        const clearEl = document.querySelectorAll('#clear');
    
        inputEl.forEach(ele => {
            ele.addEventListener('focus', function () {
                clearEl.forEach(el => {
                    el.classList.remove('hidden');
                    el.classList.add('clear');
                    el.addEventListener('mousedown', function() {
                        ele.value = '';
                    });
                }) 
            });
            ele.addEventListener('blur', function() {
                clearEl.forEach(el => {
                    el.classList.remove('clear');
                    el.classList.add('hidden');
                }) 
            });
        });

        await form.forEach(ele => {
            ele.addEventListener('submit', fetchData);
        });
        
    } catch (err) {
        console.log(err);
    }
})();

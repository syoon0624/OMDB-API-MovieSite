import './scss/main.scss';
import { fetchData } from './utils';
import logoimg from './images/logo.png';
import formHandler from './utils/formHandler';

const imgEl = document.querySelector('.main-logo > img');
imgEl.src = logoimg;
const headerImgEl = document.querySelector('.logo-wrapper');
headerImgEl.style.backgroundImage = `url(${logoimg})`;

(async () => {
    try {
        const form = document.querySelectorAll('.search_form');
        
        formHandler();

        await form.forEach(ele => {
            ele.addEventListener('submit', fetchData);
        });
        
    } catch (err) {
        console.log(err);
    }
})();

import './scss/main.scss';
import { fetchData } from './utils';
import logoimg from './images/logo.png';

const imgEl = document.querySelector('.main-logo > img');
imgEl.src = logoimg;

(async function () {
    try {
        const form = document.querySelector('.search_form');
        await form.addEventListener('submit', fetchData);
    } catch (err) {
        console.log(err);
    }
})();
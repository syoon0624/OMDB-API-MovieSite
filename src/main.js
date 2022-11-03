import './scss/main.scss';
import { fetchData } from './utils';
import logoimg from './images/logo.png';

const imgEl = document.querySelector('.main-logo > img');
imgEl.src = logoimg;

(async function () {
    try {
        const form = document.querySelector('.search-container > .search_form');
        const form2 = document.querySelector('.header-container > .search_form');
        await form.addEventListener('submit', fetchData);
        await form2.addEventListener('submit', fetchData);
    } catch (err) {
        console.log(err);
    }
})();


const a = () => {
    
}
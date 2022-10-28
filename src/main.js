import './scss/main.scss';
import { fetchData } from './utils';

(async function () {
    try {
        const form = document.querySelector('.search_form');
        await form.addEventListener('submit', fetchData);
    } catch (err) {
        console.log(err);
    }
})();



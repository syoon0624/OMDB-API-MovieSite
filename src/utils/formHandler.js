export default () => {
    // 태그 숨김, 드러냄 작동 관리
    let toggle = true;
    const optionEl = document.querySelectorAll('.option');
    const optionUl = document.querySelectorAll('.option-ul');

    const inputEl = document.querySelectorAll('input');
    const clearEl = document.querySelectorAll('#clear');

    const clearBtnEl = document.querySelectorAll('.option-clear');
    const yearsOptionEl = document.querySelectorAll('.year_input');
    const lengthOptionEl = document.querySelectorAll('.length');
    const typeOptionEl = document.querySelectorAll('.type');

    for(let i = 0; i < 2; i++) {
        optionEl[i].addEventListener('click', () => {
            toggle ? (optionUl[i].classList.remove('hidden'), toggle = false) : 
            (optionUl[i].classList.add('hidden'), toggle = true);
        })
    }

    // for(let i = 0; i < 2; i++) {
    //     clearBtnEl[i].addEventListener('click', (e) => {
    //         e.preventDefault();
    //         yearsOptionEl[i].value = '';
    //         lengthOptionEl[i].value = '10';
    //         typeOptionEl[i].value = 'movie';
    //     })
    // }

    inputEl.forEach(ele => {
        ele.addEventListener('focus', () => {
            clearEl.forEach(el => {
                el.classList.remove('hidden');
                el.classList.add('clear');
                el.addEventListener('mousedown', function() {
                    ele.value = '';
                });
            }) 
        });
        ele.addEventListener('blur', () => {
            clearEl.forEach(el => {
                el.classList.remove('clear');
                el.classList.add('hidden');
            }) 
        });
    });
}
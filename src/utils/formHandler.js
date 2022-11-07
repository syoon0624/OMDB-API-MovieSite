export default () => {
    // 태그 숨김, 드러냄 작동 관리
    const yearEl = document.querySelectorAll('.year-info');
    const yearInputEl = document.querySelectorAll('.year_input');
    const closeYearEl = document.querySelectorAll('.close-year');

    for(let i = 0; i < 2; i++) {
        yearEl[i].addEventListener('click', e => {
            e.target.classList.add('hidden');
            yearInputEl[i].classList.remove('hidden');
            closeYearEl[i].classList.remove('hidden');
        })
        closeYearEl[i].addEventListener('click', e => {
            e.target.classList.add('hidden');
            yearInputEl[i].classList.add('hidden');
            yearEl[i].classList.remove('hidden');
        })
    }
    
    

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
}
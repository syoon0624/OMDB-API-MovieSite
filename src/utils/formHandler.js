export default () => {
    // 태그 숨김, 드러냄 작동 관리
    const yearEl = document.querySelectorAll('.option-ul');
    

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
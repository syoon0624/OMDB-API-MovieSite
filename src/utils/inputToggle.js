// 첫 메인화면에서 검색 후, 검색 화면으로 전환하기 위한 태그 스위칭, 토글링
export default (toggle, input) => {
        if(toggle === false ) {
            const mainSearchCon = document.querySelector('.main-container');
            const headerCon = document.querySelector('header');
            const headerDivCon = document.querySelector('header > div');

            mainSearchCon.remove();
            headerCon.classList.remove('hidden');
            headerDivCon.classList.add('header-container');
            toggle = true;

            document.querySelector('header > div > form > input').value = input;
    }
    return toggle;
}
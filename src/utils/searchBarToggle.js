// 첫 메인화면에서 검색 후, 검색 화면으로 전환하기 위한 태그 스위칭, 토글링
export default (values) => {
    if(values.toggle) {
        values.input = document.querySelector('header > div > form > input').value;
        values.years = document.querySelector('#year-header').value;
        values.type = document.querySelector('header > div > form > ul > div > #type > .type').value;
        values.pageCount = parseInt(document.querySelector('header > div > form > ul > div > #length > .length').value) / 10;
    } else {
        values.input = document.querySelector('.search-container > form > input').value;
        values.years = document.querySelector('.search-container > form > ul > div > li > .year_input').value;
        values.type = document.querySelector('.search-container > form > ul > div > #type > .type').value;
        values.pageCount = parseInt(document.querySelector('.search-container > form > ul > div > #length > .length').value) / 10;

        const mainSearchCon = document.querySelector('.main-container');
        const headerCon = document.querySelector('header');
        const headerDivCon = document.querySelector('header > div');

        mainSearchCon.remove();
        headerCon.classList.remove('hidden');
        headerDivCon.classList.add('header-container');
        values.toggle = true;

        document.querySelector('header > div > form > input').value = values.input;
    }

    return values;
}

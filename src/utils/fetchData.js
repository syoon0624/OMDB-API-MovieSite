import dataInHTML from "./makeSearchList.js";
import fetchMovie from "./fetchMovie.js";
import openModal from "./modalDetail.js";
import loaders from "./loader.js";
import inputToggle from "./inputToggle.js";

// 전역 변수
let page = 1;
let toggle = false;
let input = '';
let years = '';
let type = '';
let pageCount = 1;
const loader = new loaders({
    el: '.movie-loading',
});
// 정렬용 데이터
let allData = [];

// 정렬하기
export const sortData = async(types) => {
    let count = 0;
    let movies = [];
    let dummy = [];
    
    window.scrollTo(0, 0);
    console.log(allData);

    loader.start();

    while(document.querySelector('.movie_list > ul') !== null) {
        const child = document.querySelector('.movie_list > ul');
        child.parentNode.removeChild(child);
    }

    types === 'down' ?
    allData = allData.sort((a, b) => parseInt(b.Year) - parseInt(a.Year)) :
    allData = allData.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));

    allData.forEach(ele => {
        dummy.push(ele);
        count++;
        if(count === 10) {
            count = 0;
            movies.push(dummy);
            dummy = [];
        };
    })
    await movies.forEach(ele => dataInHTML(ele));
    await inDataIdList();
    await loader.stop();
}

// 데이터 불러오기 후 태그에 넣기
export const setDataList = async() => {
    if(input !== '') {
        loader.start();

        let err = '';
        const data = [];

        for(let i = 1; i <= pageCount; i++) {
            const movie = await fetchMovie(page);
            const total = movie.totalResults ?? 0;

            if(page === 1) {
                const infoEl = document.querySelector('.search-info');
                infoEl.innerHTML = ` 
                    <div class="search-total">
                        ${years !== '' ? '<strong>' + '"' + years + '" year </strong>' : ''}
                        <strong> "${input}" ${type} Search Results : ${total}</strong>
                    </div>
                `;
            }
            if(movie.Search === undefined) {
                err = 'No Found Page';
            } else {
                data.push(movie.Search);
                allData.push(...movie.Search);
                Math.floor(total/10)+1 === page ?  page = -1 : page++;
            }
        }
        data.forEach(ele => dataInHTML(ele));
        if(err !== '' && page !== -1) {
            alert(err);
        }
        loader.stop();
    }
}

// 무한 스크롤 핸들러
const scroll = () => {
    const endEl = document.querySelector('.end_scroll');
    // 스크롤 내릴 시, 정보 더 보여주기 기능
    const io = new IntersectionObserver (async (entry, observer) => {
        /* entries
        boundingClientRect: 관찰 대상의 사각형 정보(DOMRectReadOnly)
        intersectionRect: 관찰 대상의 교차한 영역 정보(DOMRectReadOnly)
        intersectionRatio: 관찰 대상의 교차한 영역 백분율(intersectionRect ~ boundingClientRect 까지의 비율, Number)
        isIntersecting: 관찰 대상의 교차 상태(Boolean)
        rootBounds: 지정한 루트 요소의 사각형 정보(DOMRectReadOnly)
        target: 관찰 대상 요소(Element)
        time: 변경이 발생한 시간 정보(DOMHighResTimeStamp)
        */
    
        const ioTarget = entry[0].target;
        if (entry[0].isIntersecting) {
            io.unobserve(endEl);
            if(page <= 1) {
                observer.disconnect();
            } else {
                await setDataList(input, years)
                await inDataIdList();
                io.observe(endEl);
            }
        }
    }, {
        threshold: 0.5
    });
    io.observe(endEl);
}

// 영화 modal 창 띄우기
const showData = async (ele) => {
    const loader = new loaders({
        el: '.movie-loading',
    });
    loader.start();
    const detail = await fetchMovie(undefined,ele.id);
    console.log(detail.Runtime);
    if(!document.querySelector('.modal')) {
        openModal(detail);
    }
    loader.stop();
}

// movie-box에 영화 id 검색해서 modal 창 띄우기
const inDataIdList = () => {
    const dataId = document.querySelectorAll('.movie-box');
    // console.log(dataId);
    dataId.forEach(element => {
        element.addEventListener('click',() => {
            showData(element);
        });
    });
}

// 영화 정보 데이터 전달
export default async (event) => {
    
    // 중복 클릭 처리
    if(
        toggle === true && 
        input === document.querySelector('header > div > form > input').value && 
        years === document.querySelector('header > div > form > ul > li .year_input').value &&
        type ===  document.querySelector('header > div > form > ul > #type > .type').value
        ) {
        console.log(input);
        return;
    }

    // 화면 전환
    input = toggle ? 
    document.querySelector('header > div > form > input').value : 
    document.querySelector('.search-container > form > input').value;

    years = toggle ?
    document.querySelector('header > div > form > ul > li .year_input').value :
    document.querySelector('.search-container > form > ul > li > .year_input').value

    type = toggle ? 
    document.querySelector('header > div > form > ul > #type > .type').value :
    document.querySelector('.search-container > form > ul > #type > .type').value

    pageCount = toggle ?
    document.querySelector('header > div > form > ul > #length > .length').value :
    document.querySelector('.search-container > form > ul > #length > .length').value

    pageCount = parseInt(pageCount) / 10;

    toggle = inputToggle(toggle, input);

    try {
            if(input !== ''){
                event.preventDefault();
                while(document.querySelector('.movie_list > ul') !== null) {
                    page = 1;
                    allData = [];
                    const child = document.querySelector('.movie_list > ul');
                    child.parentNode.removeChild(child);
                }

                const text = input? 's='+input : undefined;

                window.history.pushState(undefined, "search", `/?${text}&type=${type}${years !== '' ? '&y=' + years : ''}`);
                await setDataList();
                await inDataIdList();
                await scroll();
            } else if(window.location.search !== '') {
                while(document.querySelector('.movie_list > ul') !== null) {
                    page = 1;
                    allData = [];
                    const child = document.querySelector('.movie_list > ul');
                    child.parentNode.removeChild(child);
                }
                const url = new URL(window.location.href);
                input = url.searchParams.get('s');
                document.querySelector('header > div > form > input').value = input;
                await setDataList();
                await inDataIdList();
                await scroll();
            } else {
                alert("Please enter the KeyWord!");
            }
    } catch (err) {
        console.log(err)
    } finally {
    }
};

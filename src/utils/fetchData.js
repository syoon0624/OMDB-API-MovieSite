import dataInHTML from "./makeSearchList.js";
import fetchMovie from "./fetchMovie.js";
import openModal from "./modalDetail.js";
import loaders from "./loader.js";

let page = 1;
let toggle = false;

// 데이터 불러오기 후 태그에 넣기
const setDataList = async() => {
    const input = toggle ? 
    document.querySelector('header > div > form > input').value : 
    document.querySelector('.search-container > form > input').value;

    // console.log(input);
    const loader = new loaders({
        el: '.movie-loading',
        color: 'pink',
    });
    loader.start();
    const text = input? 's='+input : undefined;
    if(text !== undefined) {
        const movie = await fetchMovie(text,page);

        const data = movie.Search;
        const total = movie.totalResults ?? 0;

        if(page === 1) {
            const infoEl = document.querySelector('.search-info');
            infoEl.innerHTML = `
                <div class="search-total">
                    <strong> '${input}': 총 ${total} 개의 검색결과</strong>
                </div>
            `;
        }

        if(data === undefined) {
            alert('찾으시는 정보가 없습니다!')
        } else {
            loader.stop();
            dataInHTML(data);
            data.length === 10 ? page++ : page = 1;
        }
    }

    // 첫 메인화면에서 검색 후, 검색 화면으로 전환하기 위한 태그 스위칭, 토글링
    if(toggle === false ) {
        const mainSearchCon = document.querySelector('.main-container');
        const headerCon = document.querySelector('.hidden');

        mainSearchCon.remove();
        headerCon.classList.remove('hidden');
        headerCon.classList.add('header-container');
        toggle = true;

        document.querySelector('header > div > form > input').value = input;
    }
}

// 영화 modal 창 띄우기
const showData = async (ele) => {
    const detail = await fetchMovie('',-1,ele.id);
    console.log(detail.Runtime);
    if(!document.querySelector('.modal')) {
        openModal(detail);
    }
}

// movie-box에 영화 id 검색해서 modal 창 띄우기
const inDataIdList = () => {
    const dataId = document.querySelectorAll('.movie-box');
    console.log(dataId);
    dataId.forEach(element => {
        element.addEventListener('click',() => {
            showData(element);
        });
    });
}

function scroll(){
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
    if ( entry[0].isIntersecting) {
            // console.log('현재 보이는 타겟:', ioTarget);
            io.unobserve(endEl);
            if(page === 1) {
                observer.disconnect();
            } else {
                await setDataList().then(inDataIdList);
                io.observe(endEl);
            }
        }
    }, {
        threshold: 0.5
    });
    io.observe(endEl);
}

export default function (event) {
    event.preventDefault();
    try {
            while(document.querySelector('.movie_list > ul') !== null) {
            page = 1;
            const child = document.querySelector('.movie_list > ul');
            child.parentNode.removeChild(child);
        }
        setDataList().then(inDataIdList).then(scroll);
    } catch (err) {
        console.log(err)
    } finally {
    }
};

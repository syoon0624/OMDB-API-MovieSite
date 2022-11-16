// 영화 상세 정보 태그 삽입(모달창)
import imdb from '../images/Internet Movie Database.png';
import metacritic from '../images/Metacritic.png';
import rotten from '../images/Rotten Tomatoes.png';

// ratings 이미지 불러온 후, 객체화
const ratingImgs = {
  'Internet Movie Database': imdb,
  Metacritic: metacritic,
  'Rotten Tomatoes': rotten,
};

export default async (movieInfo) => {
  const body = document.body;
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const closeButton = document.createElement('button');
  closeButton.textContent = 'X';

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal__content');

  console.log(movieInfo);

  // modal 태그 생성
  modal.append(modalContent);
  modalContent.innerHTML += `
            <div class="info-wrap">
                <div class="img">
                    <img alt="movie-img" src=${movieInfo.Poster.replace(
                      'SX300',
                      'SX450'
                    )}>
                </div>
                <ul class="info">
                    <h1>${movieInfo.Title}</h1>
                    <li class="summary">
                        <span>${movieInfo.Released} / </span>
                        <span>${movieInfo.Runtime} / </span>
                        <span>${movieInfo.Country} / </span>
                        <span>${movieInfo.Language} </span>
                    </li>
                    <li class="plot">
                        <p>${movieInfo.Plot}</p>
                    </li>
                    <li class="ratings">
                        <span class="title">Ratings</span>
                        <div class="ratings-wrap">
                        ${movieInfo.Ratings.map((ele) => {
                          return (
                            '<span>' +
                            `<img src="${
                              ratingImgs[ele.Source]
                            }" alt="rating-image"/>` +
                            ele.Value +
                            '</span>'
                          );
                        }).join('')}
                        </div>
                    </li>
                    <li class="actors">
                        <span class="title">Actors</span>
                        <span>${movieInfo.Actors}</span>
                    </li>
                    <li class="director">
                        <span class="title">Director</span>
                        <span>${movieInfo.Director}</span>
                    </li>
                    <li class="production">
                        <span class="title">Production</span>
                        <span>${movieInfo.Production}</span>
                    </li>
                    <li class="genre">
                        <span class="title">Genre</span>
                        <spna>${movieInfo.Genre}</span>
                    </li>
                </div>
            </div>
    `;

  modalContent.append(closeButton);
  document.body.append(modal);

  body.classList.add('fixed');

  // 창 닫기
  closeButton.addEventListener('click', () => {
    modal.remove();
    body.classList.remove('fixed');
  });

  modal.addEventListener('click', (e) => {
    if (e.target.className === e.currentTarget.className) {
      modal.remove();
      body.classList.remove('fixed');
    }
  });
};

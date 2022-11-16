// 영화 리스트 태그 삽입
export default async (data) => {
  const divEl = document.querySelector('.movie_list');
  if (data !== undefined) {
    data.forEach((element) => {
      const uList = document.createElement('ul');
      uList.classList.add('movie-box');
      divEl.appendChild(uList);

      uList.innerHTML = `
                <li>
                    <img src=${
                      element.Poster === 'N/A'
                        ? 'https://via.placeholder.com/300x450'
                        : element.Poster
                    } alt="poster" />
                </li>
                <li class="movie-info">
                    <p>${element.Title}</p>
                    <p>${element.Year}</p>
                </li>
            `;
      uList.id = element.imdbID;
    });
  }
};

// 영화 리스트 태그 삽입
export default async (data) => {
    const divEl = document.querySelector('.movie_list');
    if(data !== undefined) {
        data.forEach(element => {
            const uList = document.createElement('ul');
            uList.classList.add('movie-box');
            divEl.appendChild(uList);
            
            const val = Object.values(element);
            const key = Object.keys(element);
            
            //li에 들어갈 태그 객체 삽입
            const items = {
                Poster: '',
                imdbID: '',
                Title: '',
                Year: '',
            } 
            // api정보에 맞는 객체 삽입
            for(let i = 0; i< val.length;i++) {
                switch(key[i]) {
                    case 'Poster':
                        items.Poster = val[i];
                        break;
                    case 'imdbID':
                        items.imdbID = val[i];
                        break;
                    case 'Title':
                        items.Title = val[i];
                        break;
                    case 'Year':
                        items.Year = val[i];
                        break;
                    default:
                        continue;
                }
            };
            uList.innerHTML = `
                <li>
                    <img src=${items.Poster === 'N/A' ? 'https://via.placeholder.com/300x450' : items.Poster} alt="poster" />
                </li>
                <li class="movie-info">
                    <p>${items.Title}</p>
                    <p>${items.Year}</p>
                </li>
            `;
            uList.id = items.imdbID;
        });
    }
};

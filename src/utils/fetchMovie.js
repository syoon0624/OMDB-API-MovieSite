const url= 'https://www.omdbapi.com/';
const key = process.env.MOVIE_API_KEY;
const apiKey= `?apikey=${key}&`;

export default async (pageCount = 0, id = '') => {
    const urlParams 
        = window.location.search
    let search = urlParams.replace('?','');
    const page = `&page=${pageCount}`;
    try {
        if(id === '') {
            const response = await fetch(url + apiKey + search + page);
            //console.log(response);
            const data = await response.json();
            return data;
        } else if (id !== '') {
            const response = await fetch(url + apiKey + 'i=' + id + '&plot=full');
            const data = await response.json();
            return data;
        }
        
    } catch (err){
        alert('영화정보를 불러올 수 없습니다!', err);
    }  
};

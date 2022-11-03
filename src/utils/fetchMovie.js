const url= 'https://www.omdbapi.com/';
const key = process.env.MOVIE_API_KEY;
const apiKey= `?apikey=${key}&`;

export default async function (search = '', pageCount = 0, id = '') {
    const page = `&page=${pageCount}`;
    try {
        if(id === '') {
            const response = await fetch(url + apiKey + search + page);
            const data = await response.json();
            // console.log(data);
            return data;
        } else {
            const response = await fetch(url + apiKey + 'i=' + id);
            const data = await response.json();
            return data;
        }
    } catch (err){
        alert('영화정보를 불러올 수 없습니다!', err);
    }
    
};
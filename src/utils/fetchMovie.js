const url= 'https://www.omdbapi.com/';
const key = process.env.MOVIE_API_KEY;
const apiKey= `?apikey=${key}&`;

export default async (search = '', pageCount = 0, year = '', id = '') => {
    const page = `&page=${pageCount}`;
    try {
        if(id === '' && year === '') {
            const response = await fetch(url + apiKey + search + page);
            // console.log(response);
            const data = await response.json();
            // console.log(data);
            return data;
        } else if (year !== '') {
            const response = await fetch(url + apiKey + search + `&y=${year}` + page);
            // console.log(response);
            const data = await response.json();
            // console.log(data);
            return data;
        } else if (id !== '') {
            const response = await fetch(url + apiKey + 'i=' + id);
            const data = await response.json();
            return data;
        }
    } catch (err){
        alert('영화정보를 불러올 수 없습니다!', err);
    }  
};
export default async (data) => {
    const divEl = document.querySelector('.movie_list');
    if(data !== undefined) {
        data.forEach(element => {
            const uList = document.createElement('ul');
            divEl.appendChild(uList);
            const list = document.createElement('li');
            const val = Object.values(element);
            const key = Object.keys(element);
            //console.log(element);
            for(let i = 0; i< val.length;i++) {
                if(key[i] === 'Poster') {
                    const img = document.createElement('img');
                    val[i] === 'N/A' ? img.src = 'https://via.placeholder.com/300x450' : img.src = val[i];
                    list.appendChild(img); 
                } else if (key[i] === 'imdbID') {
                    uList.id = val[i];
                } else if (key[i] === 'Type'){
                    continue;
                } else {
                    const p = document.createElement('p');
                    list.appendChild(p).append(key[i] + ': '+ val[i]);
                }
            };
            uList.appendChild(list);
        });
    }
};
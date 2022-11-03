export default (movieInfo) => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';

    console.log(movieInfo);
    
    const modalBack = document.createElement('div');
    modalBack.classList.add('modal__background');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal__content');

    const title = document.createElement('h1');
    title.textContent = movieInfo.Title;

    const deImg = document.createElement('img');
    deImg.src = movieInfo.Poster.replace('SX300', 'SX250');

    const year = document.createElement('strong');
    year.textContent = `Year : ${movieInfo.Year}`;
    year.style = 'display: block';

    const plot = document.createElement('p');
    plot.style = 'display: block';
    const plotStrong = document.createElement('strong');
    plotStrong.style = 'display: block';
    plotStrong.textContent = 'Movie Plot';
    plot.textContent = movieInfo.Plot;

    const lan = document.createElement('strong');
    lan.textContent = `Language: ${movieInfo.Language}`;
    lan.style = 'display: block';

    const runtime = document.createElement('strong');
    runtime.textContent = `Runtime: ${movieInfo.Runtime}`
    runtime.style = 'display: block';

    modal.append(modalBack);
    modal.append(modalContent);

    modalContent.append(title);
    modalContent.append(deImg);
    modalContent.append(year);
    modalContent.append(plotStrong);
    modalContent.append(plot);
    modalContent.append(lan);
    modalContent.append(runtime);
    modalContent.append(closeButton);
    
    document.body.append(modal);
    closeButton.addEventListener("click", () => {
        modal.remove();
    });
    modalBack.addEventListener("click", () => {
        modal.remove();
    });
}

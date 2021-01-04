const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const addMovieHandler = () => {
    const title = document.getElementById('title').value;
    const extraName = document.getElementById('extra-name').value;
    const extraValue = document.getElementById('extra-value').value;

    if (isInputInvalid(title, extraName, extraValue)) {
        alert('Invalid data!');
        return;
    }

    const newMovie = {
        info: {
            set title(val) {
                if (isInputInvalid(val)) {
                    alert('Invalid data');
                    this._title = 'DEFAULT';

                    return;
                } else {
                    this._title = val;
                }
            },
            get title() {
                return this._title;
            },
            [extraName]: extraValue,
        },
        id: Math.random()
    };

    movies.push(newMovie);
    console.log(newMovie);

    renderMovies(movies);
};

const isInputInvalid = (title, extraName, extraValue) => {
    return title.trim() === '' ||
        extraName.trim() === '' ||
        extraValue.trim() === ''
};

const renderMovies = (moviesToRender) => {
    const movieList = document.getElementById('movie-list');

    if (moviesToRender.length === 0) {
        movieList.classList.remove('visible');
    } else {
        movieList.classList.add('visible');
    }

    movieList.innerHTML = '';

    moviesToRender.forEach(movie => {
        const movieEl = document.createElement('li');
        movieEl.textContent = prepareText(movie);
        movieList.append(movieEl);
    });
};

const prepareText = (movie) => {
    const {info: movieInfo} = movie;
    const {title: movieTitle, ...otherProps} = movieInfo;

    let text = `${movieTitle}\n`;

    for (const key in otherProps) {
        text += `${key}: ${otherProps[key]}\n`
    }

    return text;
}

const filterMovieHandler = () => {
    const filterText = document.getElementById('filter-title').value;
    const results = movies.filter(movie => movie.info.title.includes(filterText));

    renderMovies(results);
}

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', filterMovieHandler);
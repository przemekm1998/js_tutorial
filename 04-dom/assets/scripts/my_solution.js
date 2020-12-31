const addMovieModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const startAddMovieButton = document.getElementById('start-add-movie-button');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const addMovieModalInput = addMovieModal.querySelectorAll('input');
const confirmAddMovieButton = document.querySelector('.btn--success');

const deleteMovieModal = document.getElementById('delete-modal');
const cancelDeleteMovieModal = deleteMovieModal.querySelector('.btn--passive');

const moviesList = document.getElementById('movie-list');
const movies = [];

/**
 * Show backdrop
 */
const showBackdrop = () => {
    backdrop.classList.add('visible');
};

/**
 * Hide backdrop
 */
const hideBackdrop = () => {
    backdrop.classList.remove('visible');
};

/**
 * Show adding movie popup
 */
const showAddMovieModal = () => {
    showBackdrop();
    addMovieModal.classList.add('visible');
};

/**
 * Hide adding movie popup
 */
const hideAddMovieModal = () => {
    hideBackdrop();
    addMovieModal.classList.remove('visible');
    clearInputs(addMovieModalInput);
};

const backdropHandler = () => {
    hideBackdrop();
    hideAddMovieModal();
    hideDeleteMovieModal();
};

/**
 * Clear inputs
 * @param inputList - list of input fields to clear
 */
const clearInputs = (inputList) => {
    for (const input of inputList) {
        input.value = '';
    }
};

/**
 * Adding movie process
 */
const confirmAddMovie = () => {
    const title = addMovieModalInput[0].value;
    const image = addMovieModalInput[1].value;
    const rating = addMovieModalInput[2].value;

    if (isDataInvalid(title, image, rating)) {
        alert('Invalid data!');
        return;
    } else {
        const movie = addMovieToList(title, image, rating);
        renderNewMovie(movie);
        hideAddMovieModal();
    }
};

/**
 * Check if data from inputs is invalid
 * @param title - title of movie
 * @param image - movie image
 * @param rating - movie rating
 * @returns {boolean} - is data invalid?
 */
const isDataInvalid = (title, image, rating) => {
    return title.trim() === '' ||
        image.trim() === '' ||
        rating.trim() === '' ||
        parseInt(rating) < 1 ||
        parseInt(rating) > 5
};


/**
 * Add new movie to movies list
 * @param title - movie title
 * @param image - movie image
 * @param rating - movie rating
 */
const addMovieToList = (title, image, rating) => {
    const movie = createMovie(title, image, rating);
    movies.push(movie);

    return movie;
};

/**
 * Create movie dict instance to be added to movies array
 * @param title - movie title
 * @param image - movie image
 * @param rating - movie rating
 * @returns {{image: *, rating: *, title: *}} - movie dict
 */
const createMovie = (title, image, rating) => {
    const movie = {
        title: title,
        image: image,
        rating: rating
    }

    return movie;
};

/**
 * Add newly added movie to movies ul
 * @param movie - new movie to be rendered
 */
const renderNewMovie = (movie) => {
    const movieListElement = createNewMovieListElement(movie);
    moviesList.append(movieListElement);
};

/**
 * Create new movies list element
 * @param movie - new movie to be created as list element
 */
const createNewMovieListElement = (movie) => {
    const newListElement = document.createElement('li');

    newListElement.className = 'movie-element';
    newListElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${movie.image}" alt="${movie.title}">
    </div>
    <div class="movie-element__info">
      <h2>${movie.title}</h2>
      <p>${movie.rating}/5 stars</p>
    </div>
  `;

    newListElement.addEventListener('click', showDeleteMovieModal.bind(null, movie.title));

    return newListElement;
};

/**
 * Show deleting movie popup
 */
const showDeleteMovieModal = (title) => {
    showBackdrop();
    deleteMovieModal.classList.add('visible');

    const confirmDeleteMovieButton = deleteMovieModal.querySelector('.btn--danger');

    confirmDeleteMovieButton.addEventListener('click', deleteMovieHandler.bind(null, title));
};

const deleteMovieHandler = (title) => {
    const movieId = deleteMovie(title);
    const moviesElements = moviesList.querySelectorAll('li');

    const movieToBeDeleted = moviesElements[movieId];
    movieToBeDeleted.parentNode.removeChild(movieToBeDeleted);

    hideDeleteMovieModal();
}

const deleteMovie = (title) => {
    for (const movie of movies) {
        if (movie.title === title) {
            const movieId = movies.indexOf(movie);
            movies.splice(movieId, 1);

            return movieId;
        }
    }
}

/**
 * Hide deleting movie popup
 */
const hideDeleteMovieModal = () => {
    hideBackdrop();
    deleteMovieModal.classList.remove('visible');
};

startAddMovieButton.addEventListener('click', showAddMovieModal);
cancelAddMovieButton.addEventListener('click', hideAddMovieModal);
confirmAddMovieButton.addEventListener('click', confirmAddMovie);
backdrop.addEventListener('click', backdropHandler);

cancelDeleteMovieModal.addEventListener('click', hideDeleteMovieModal);
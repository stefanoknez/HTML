document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loadMovies').addEventListener('click', loadMovies);
    document.getElementById('genreFilter').addEventListener('change', filterMovies);
    document.getElementById('insert').addEventListener('click', insertMovie);
    document.getElementById('sortMovies').addEventListener('click', sortMovies);
});

let movies = [];
let genres = new Set(); 
let sortAscending = true; 

function loadMovies() {
    fetch('movies.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Mreža nije okej ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            movies = data;
            genres = new Set(movies.map(movie => movie.genre));
            populateGenreFilter(); //popunimo filter za žanrove
            displayMovies(movies); //prikažemo filmove
        })
        .catch(error => console.error('Greška pri učitavanju filmova:', error));
}

function populateGenreFilter() {
    const genreFilter = document.getElementById('genreFilter');
    //uzmemo dio gdje treba da se prikažu žanrovi
    genreFilter.innerHTML = '<option value="all">All</option>'; //resetujemo filtere
    genres.forEach(genre => {
        const option = document.createElement('option'); //dodajemo opciju
        option.value = genre; //stavimo joj vrijednost
        option.textContent = genre;
        genreFilter.appendChild(option); //dodamo je direktno u filter
    });
}

function displayMovies(moviesToShow) {
    const movieCards = document.getElementById('movieCards');
    movieCards.innerHTML = ''; //na početku prazno, dok ne učitamo
    moviesToShow.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card'; //uzmemo karticu i u nju postavimo vrijednosti
        card.innerHTML = `
            <h2>${movie.title}</h3>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p><strong>Release Date:</strong> ${movie.release_date}</p>
            <p><strong>Rating:</strong> ${movie.rating}</p>
            <p><strong>Genre:</strong> ${movie.genre}</p>
            <button class="delete-button" onclick="deleteMovie('${movie.title}')">Delete</button>
        `;
        movieCards.appendChild(card); //dodamo je
    });
}

function filterMovies() {
    //filtriramo
    const genre = document.getElementById('genreFilter').value;
    const filteredMovies = genre === 'all' ? movies : movies.filter(movie => movie.genre === genre);
    displayMovies(filteredMovies);
}

function insertMovie() {
    //uzmemo stvari unijete u input
    const title = document.getElementById('newTitle').value;
    const director = document.getElementById('newSurname').value;
    const releaseDate = document.getElementById('newBirthdate').value;
    const rating = document.getElementById('newEmail').value;
    const genre = document.getElementById('newGrade').value;

    //napravimo film i dodamo ga, i ako ima novi žanr ažuriramo i žanrove
    const newMovie = { title, director, releaseDate, rating, genre };
    movies.push(newMovie);
    if (!genres.has(genre)) {
        genres.add(genre);
        populateGenreFilter();
    }
    displayMovies(movies);

    //očistimo input
    document.getElementById('newTitle').value = '';
    document.getElementById('newSurname').value = '';
    document.getElementById('newBirthdate').value = '';
    document.getElementById('newEmail').value = '';
    document.getElementById('newGrade').value = '';
}

function deleteMovie(title) {
    //filtriramo filmove, ostavimo samo one koji nemaju taj titl što brišemo
    movies = movies.filter(movie => movie.title !== title);
    displayMovies(movies);
}

function sortMovies() {
    //sortiramo identično kao prije
    movies.sort((a, b) => sortAscending ? b.rating - a.rating : a.rating - b.rating);
    displayMovies(movies);
    sortAscending = !sortAscending;
}
const Movie = require('./Movie');
const Genre = require('./Genre');
const Actor = require('./Actor');
const Director = require('./Director');

Movie.belongsToMany(Genre, {through: "genres_movies"});
Genre.belongsToMany(Movie, {through: "genres_movies"});

Movie.belongsToMany(Actor, {through: "actors_movies"});
Actor.belongsToMany(Movie, {through: "actors_movies"});

Movie.belongsToMany(Director, {through: "directors_movies"});
Director.belongsToMany(Movie, {through: "directors_movies"});
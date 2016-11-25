/**
 * Created by litvin on 13.11.16.
 */
var fs = require('../services/filmService');
var up = require('../model/UserPreference');

var GENRES_COUNT = 2;

var adviceService = {

    recommendFilms: function () {
        return new Promise(function (resolve, reject) {

            if (!up.year && !up.genres && !up.rating) {
                fs.getMostPopularFilms()
                    .then(function (films) {
                        resolve(films);
                    })
                    .catch(function (error) {
                        reject(error);
                    })
            } else {
                fs.getFilmsByPreference(up.year, findFavoriteGenres(), up.rating)
                    .then(function (films) {
                        console.log(films.length);
                        var bigRatingFilms = films.filter(function (film) {
                            return film.rating == 'big';
                        });
                        var filmsCount = bigRatingFilms.length;
                        var startAt = Math.random() * (filmsCount - 5) + 5;
                        resolve(bigRatingFilms.slice(startAt-5, startAt));
                    })
                    .catch(function (error) {
                        reject(error);
                    })
            }


        });

        function findFavoriteGenres() {
            return Object.keys(up.genres)
                .sort(function(a,b){return up.genres[b]-up.genres[a]})
                .slice(0, GENRES_COUNT);
                // .join();
        }

    },

    updatePreferences: function (year, genres, rating) {
        genres.split(',').forEach(function (genre, i) {
            var upGenre = up.genres[genre];
            if (upGenre) {
                ++up.genres[genre];
            } else {
                up.genres[genre] = 1;
            }
        });
        up.year = parseInt(((up.year*10 + parseInt(year))/11).toFixed(0));
        up.rating = parseFloat(((up.rating*10 + parseFloat(rating))/11).toFixed(1));
    }

};

module.exports = adviceService;

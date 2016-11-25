/**
 * Created by litvin on 9.11.16.
 */
var rp = require('request-promise');
var config = require('../config/config');
var analyseService = require('../services/analyseService');

var YEAR_RANGE = 10;
var VOTE_RANGE = 2;

var filmService = {

    getMostPopularFilms: function () {

        return new Promise(function (resolve, reject) {

            var options = {
                uri: config.hostname + 'discover/movie?' + config.apiKeyAsParam + '&sort_by=popularity.desc',
                method: 'GET'
            };

            rp(options)
                .then(function (body) {
                    var array = JSON.parse(body);
                    resolve(array);
                })
                .catch(function (error) {
                    reject(error);
                })
        });
    },

    getFilmsByPreference: function (year, genre, rating) {
        return new Promise(function (resolve, reject) {

            var options = {
                uri: config.hostname + 'discover/movie?' + config.apiKeyAsParam +
                    '&with_genres=' + genre +
                    '&primary_release_year.gte=' + (year-YEAR_RANGE),
                    // '&page=' + (Math.floor(Math.random() * (3 - 1)) + 1),
                    // '&vote_average.gte=' + (rating-VOTE_RANGE),
                method: 'GET'
            };

            rp(options)
                .then(function (body) {
                    var films = JSON.parse(body);
                    resolve(analyseService.setRating(films.results));
                })
                .catch(function (error) {
                    reject(error);
                })
        });
    }

};

module.exports = filmService;
/**
 * Created by litvin on 8.11.16.
 */
var express = require('express');
var router = express.Router();
var filmService = require('../services/filmService');
var adviceService = require('../services/adviceService');
var imdb = require('imdb-api');

router.get('/', function (req, res) {

    filmService.getMostPopularFilms()
        .then(function (data) {
            res.send(data);
            res.statusCode(200);
        })
        .catch(function (data) {
            res.send(data)
        });
});

router.get('/recommend', function (req, res) {

    adviceService.recommendFilms()
        .then(function (films) {
            res.json(films);
        })
        .catch(function (data) {
            res.json(data)
        });
});

router.post('/chosenFilm', function (req, resp) {
   adviceService.updatePreferences(req.body.release_date, req.body.genre_ids)
});

module.exports = router;
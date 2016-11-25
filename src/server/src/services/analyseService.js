/**
 * Created by litvin on 24.11.16.
 */
var analyseService = {

    setRating: function (films) {
        var sizeArray = films.map(function (film) {
            return film.vote_average;
        });
        var clusters = kMeans1d(sizeArray);
        films.forEach(function (film) {
            if (clusters[0].indexOf(film.vote_average) > -1) film.rating = "big";
            else film.rating = "small";
            // else if (clusters[2].indexOf(film.vote_average) > -1) film.rating = "small";
            // else film.rating = "";
        });
        return films;

        function kMeans1d(points) {
            var max = Math.max.apply(null, points);
            var min = Math.min.apply(null, points);
            var middle = (max - min) / 2;
            var centroids = [max, middle, min];

            function balanceCentroids(points, centroids, stepsLimit) {
                stepsLimit = stepsLimit || 1000;
                var step = 0;
                var balanced = false;
                var clusters = [];
                while (step++ < stepsLimit && !balanced) {
                    clusters = fillClusters(centroids, points);
                    var newCentroids = moveCentroids(clusters);
                    balanced = newCentroids.every(function (centroid, i) {
                        return centroid == centroids[i]
                    })
                }
                return clusters
            }

            function fillClusters(centroids, points) {
                var clusters = centroids.map(function () {
                    return []
                });
                points.forEach(function (point) {
                    var min = null;
                    var minIndex = 0;
                    centroids.forEach(function (centroid, i) {
                        var distance = Math.abs(centroid - point);
                        if (min === null || distance < min) {
                            min = distance;
                            minIndex = i;
                        }
                    });
                    clusters[minIndex].push(point);
                });
                return clusters
            }

            function moveCentroids(clusters) {
                var centroids = [];
                clusters.forEach(function (cluster) {
                    var sum = cluster.reduce(function (s, c) {
                        return s + c;
                    }, 0);
                    centroids.push(sum / (cluster.length + 1));
                });
                return centroids;
            }

            return balanceCentroids(points, centroids);
        }

    }
};

module.exports = analyseService;
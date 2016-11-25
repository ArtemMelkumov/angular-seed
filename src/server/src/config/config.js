/**
 * Created by litvin on 13.11.16.
 */
var config = {

    hostname: 'https://api.themoviedb.org/3/',
    apiKeyAsParam: 'api_key=c5a73c61e5d2eacf762d0a1a64fe3a10'


};

// var genresMap= {
//         action: 28,
//         adventure: 12,
//         animation: 16,
//         comedy: 35,
//         crime: 80,
//         documentary: 99,
//         drama: 18,
//         family: ​10751,
//         fantasy: 14,
//         history: 36,
//         horror: 27,
//         music: ​10402,
//         mystery: 9648,
//         romance: ​10749,
//         scienceFiction: 878,
//         tvMovie: 10770,
//         thriller: 53,
//         war: 10752,
//         western: 37
// };


/** @ngInject */
function analyseService() {

    return {

        setRating: function (cells) {
            var sizeArray = cells.map(function (cell) {
                return cell.item_count
            });
            var clusters = kMeans1d(sizeArray);
            cells.forEach(function(cell){
                if(clusters[0].indexOf(cell.item_count) > -1) cell.rating = "big";
                else if(clusters[2].indexOf(cell.item_count) > -1) cell.rating = "small";
                else cell.rating = "";
            });
            return cells;
        }

    };
}

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




module.exports = config;
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/index';
import { SliderDirective } from '../shared/index';
import { SliderAddDirective } from '../shared/index';
import { TestComponent } from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [SliderDirective,SliderAddDirective, TestComponent]
})
export class HomeComponent implements OnInit {

  optionsList: Array<Object> =[];
  answerArray: Array<Object> =[];
  filmsList: Array<Object> =[];

  public SliderProperties: Object = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: true,
    dots: false,
    draggable: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    swipe: true,
    touchMove: true
  };

  public genresMap: Object = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance:​ 10749,
  scienceFiction: 878,
  tvMovie: 10770,
  thriller: 53,
  war: 10752,
  western: 37
};



  isTestAreaOpen: boolean = false;

  constructor(public movieService: MovieService) {}

  ngOnInit() {
    this.getMovies()
  }

  getMovies(){
    this.movieService.get()
      .subscribe(
        data => {
          this.filmsList = data.results;
          console.log(this.filmsList);
        },
        err => console.error('some error ' + err)
      );
  }

  getRecommendedFilms(){
    this.movieService.getRecommendedFilms()
      .subscribe(
        data => {
          this.filmsList = [];
          this.filmsList = data;
          console.log(this.filmsList);
        },
        err => console.error('some error ' + err)
      );
  }


  likeMovie(genresArray, releaseDate){
    this.movieService.likeMovie(genresArray, releaseDate)
      .subscribe((data) => {
        console.log(data);
        console.log(`that;s good`);
      })
  }

  openTestAreaForFilm(id) {
    this.answerArray = this.buildQuestionObj(id);
    this.isTestAreaOpen = !this.isTestAreaOpen;
    console.log(this.answerArray);
}

  buildQuestionObj(id) {
    var tempArray = [];
    var currentFilm = _.find(this.filmsList, elem => elem.id == id);
    var rightAnswer = {
      genre: currentFilm.genre_ids[Math.floor(Math.random() * currentFilm.genre_ids.length)],
      answer: true
    };
    this.answerArray.push(rightAnswer);
    var invertedGenresMap = _.invert(this.genresMap);
    var genresArray = _.keys(invertedGenresMap);
    _.remove(genresArray,(elem) => {
      return elem == this.answerArray[0].genre
    })
    while(tempArray.length != 3) {
      var randomGenreId = genresArray[Math.floor(Math.random() * genresArray.length)]
      if(!(_.includes(tempArray,randomGenreId))){
        tempArray.push(randomGenreId)
      }
    }
    _.forEach(tempArray,(elem) => {
      var element = {genre: elem, answer:false};
      this.answerArray.push(element);
    })
    _.forEach(this.answerArray, (elem) => {
      elem.genre = invertedGenresMap[elem.genre];
    })
    return this.answerArray;
  }
}

import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/index';
import { SliderDirective } from '../shared/index';
import { SliderAddDirective } from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [SliderDirective,SliderAddDirective]
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



  isTestAreaOpen: boolean = false;

  constructor(public movieService: MovieService) {}

  /*let genreMapper = {
    1: "action",
    2: "comdey",
    3: "porno",
    4: "black comedy"
  };*/

  ngOnInit() {
    this.getMovies()
  }

  getMovies(){
    this.movieService.get()
      .subscribe(
        data => {
          this.filmsList = data;
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
  }


  likeMovie(genresArray, releaseDate){
    this.movieService.likeMovie(genresArray, releaseDate)
      .subscribe((data) => {
        console.log(data);
        console.log(`that;s good`);
      })
  }

  openTestAreaForFilm(id) {
    this.isTestAreaOpen = !this.isTestAreaOpen;
    this.buildQuestionObj(id);

  }

  buildQuestionObj(id) {
    var currentFilm = _.find(this.filmsList, elem => elem.id == id);
    var rightAnswer = {
      genre: currentFilm.genre[Math.floor(Math.random() * currentFilm.genre.length)],
      answer: true
    };
    this.answerArray.push(rightAnswer);
  }
}

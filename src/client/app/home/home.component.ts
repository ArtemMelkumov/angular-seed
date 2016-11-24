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

  optionsList:Array<Object> =[];

  filmsList:Array<Object> =[
    {
      image: 'assets/expendables.jpg',
      title: 'Mexaник'
    },
    {
      image: 'assets/legend.jpg',
      title: 'Mexaник'
    },
    {
      image: 'assets/mechanic.jpg',
      title: 'Mexaник'
    },
    {
      image: 'assets/shvataka.jpg',
      title: 'Mexaник'
    },
  ];

  public SliderProperties: Object = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    dots: false,
    draggable: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    swipe: true,
    touchMove: true
  };

  constructor(public movieService: MovieService) {}


  ngOnInit() {
    this.getMovies()
  }

  getMovies(){
    this.movieService.get()
      .subscribe(
        data => {this.filmsList = data;
          console.log(this.filmsList);
        },
        err => console.error('some error ' + err)
      );
  }


  likeMovie(id){
    this.movieService.likeMovie(id)
      .subscribe((data) => {
        console.log(data);
        console.log(`that;s good`);
      })
  }

  openTestForFilm(id) {
    
  }


}

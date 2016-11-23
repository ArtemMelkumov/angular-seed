import { Component, OnInit } from '@angular/core';
import { NameListService } from '../shared/index';
import { OwlCarousel } from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [OwlCarousel]
})
export class HomeComponent implements OnInit {

  optionsList:Array<Object> =[];

  filmsList:Array<Object> =[];


  constructor(public nameListService: NameListService) {}


  ngOnInit() {
  }



}

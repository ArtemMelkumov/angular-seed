import {Directive, ElementRef, Input, OnInit} from '@angular/core';
@Directive({selector: '[ipSlider]'})

export class SliderDirective implements OnInit {
    @Input() sliderProperties:Object;
    private _el:ElementRef;

    constructor(el: ElementRef) { this._el = el.nativeElement; }

    ngOnInit() {
        this.initSlider();
    }
    initSlider() {
        $(this._el).slick(this.sliderProperties);
    }
}


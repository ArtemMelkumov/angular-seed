import {Directive, ElementRef, AfterViewInit} from '@angular/core';

@Directive({
    selector: '[ipSliderElement]'
})

export class SliderAddDirective implements AfterViewInit {
    private sliderElement:ElementRef;

    constructor(sliderElement:ElementRef) {
        this.sliderElement = sliderElement.nativeElement;
    }

    ngAfterViewInit() {
        this.addSlide();
    }

    addSlide() {
        $(this.sliderElement).closest('[ipSlider]').slick('slickAdd', this.sliderElement);
    }
}

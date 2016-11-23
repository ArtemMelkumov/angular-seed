import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'owl-carousel',
  template: `<ng-content></ng-content>`
})
export class OwlCarousel {
  @Input() options: Object;

  $owlElement: any;

  defaultOptions: any = {};

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    for (var key in this.options) {
      this.defaultOptions[key] = this.options[key];
    }
    this.$owlElement = $(this.el.nativeElement).owlCarousel(this.defaultOptions);
  }

  ngOnDestroy() {
    this.$owlElement.data('owlCarousel').destroy();
    this.$owlElement = null;
  }
}
